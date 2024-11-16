from participant import load_participants
from rich import print
import pandas as pd
import sklearn.preprocessing as skpre
from ai_agent import objectives

data_path = "data/datathon_participants.json"
participants = load_participants(data_path)

df = pd.DataFrame(participants)
print(df.columns)
"""
dff = df.head(5)

dff['objective'] = dff['objective'].apply(objectives)
# Remove unimportant columns
print(dff['objective'])"""

columns_to_drop = ['name', 'email','shirt_size','university','dietary_restrictions','introduction','future_excitement','fun_fact', 'objective', 'technical_project','friend_registration','interest_in_challenges']  # Replace with the names of the columns you wish to remove
df.drop(columns=columns_to_drop, inplace=True)

# Inspect the DataFrame after removing columns
# Convert interests to binary format
mlb = skpre.MultiLabelBinarizer()
interests_binarized = mlb.fit_transform(df['interests'])

#languages_bin = mlb.fit_transform(df['preferred_languages'])
# Create a DataFrame for the binarized interests
interests_df = pd.DataFrame(interests_binarized, columns=mlb.classes_)

# Combine with the main DataFrame
df = pd.concat([df, interests_df], axis=1)
df = pd.get_dummies(df, columns=['preferred_role', 'experience_level'], dtype=int)

availability_df = pd.DataFrame(list(df['availability'])).astype(int)
df = pd.concat([df, availability_df], axis=1)

year_order = ["1st year", "2nd year", "3rd year","4th year", "Masters", "PhD"]
df['year_of_study'] = pd.Categorical(df['year_of_study'], categories=year_order, ordered=True)
df['year_of_study'] = df['year_of_study'].cat.codes

scaler = skpre.MinMaxScaler()
df[['year_of_study', 'hackathons_done', 'age', 'preferred_team_size']] = scaler.fit_transform(df[['year_of_study', 'hackathons_done', 'age', 'preferred_team_size']])

languages_encoded = mlb.fit_transform(df['preferred_languages'])
languages_df = pd.DataFrame(languages_encoded, columns=mlb.classes_)
df = pd.concat([df, languages_df], axis=1)

df.drop(columns=['interests','preferred_languages','availability'], inplace=True)

def standardize_skills_json(df, skills_column='programming_skills'):    
    # Create a copy of the original DataFrame
    df_processed = df.copy()
    
    # Convert JSON strings to dictionaries
    df_processed[skills_column] = df_processed[skills_column].apply(
        lambda x: eval(x) if isinstance(x, str) else x
    )
    
    # Fill null values with empty dictionaries
    df_processed[skills_column] = df_processed[skills_column].fillna({})
    
    # Expand JSON into individual columns
    skills_df = pd.json_normalize(df_processed[skills_column])
    
    # Process column names
    skills_df.columns = [col.lower().strip() for col in skills_df.columns]
    
    # Combine duplicate columns
    skills_df = skills_df.groupby(axis=1, level=0).sum()
    
    # Fill missing values with 0
    skills_df = skills_df.fillna(0)
    
    # Normalize values using MinMaxScaler
    scaler = skpre.MinMaxScaler()
    skills_columns = skills_df.columns
    skills_df[skills_columns] = scaler.fit_transform(skills_df[skills_columns])
    
    # Combine with the original DataFrame
    df_final = pd.concat([
        df_processed.drop(columns=[skills_column]),
        skills_df
    ], axis=1)
    
    return df_final, list(skills_columns)

df, skill_columns = standardize_skills_json(df)

# Save the DataFrame to an Excel file
output_path = "datathon_participants_processed.xlsx"
df.to_excel(output_path, index=False)
#print(df.head())
print(df.columns)
