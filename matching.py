from participant import load_participants
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from api_users import caracteriasticas
import json
from flask import Flask, jsonify, request
import ast
import uuid
import sklearn.preprocessing as skpre

df = pd.read_excel('datathon_participants_processed.xlsx')
def info_group(user_profile):
    
    item_profiles = df.iloc[1:, 2:].values

    similarities = cosine_similarity([user_profile], item_profiles)
    recommended_items = list(enumerate(similarities[0]))
    recommended_items = sorted(recommended_items, key=lambda x: x[1], reverse=True)

    top_4_items = recommended_items[:16]

    top_4_items_ids = [df.iloc[recommended_items[i][0] + 1, 0] for i in range(16)]
    items_caracteristicas = []

    for x in top_4_items_ids:
        item_caracteristicas = caracteriasticas(x)
        items_caracteristicas.append(item_caracteristicas)
    items_caracteristicas_json = json.dumps(items_caracteristicas, ensure_ascii=False, indent=4)
    return items_caracteristicas_json


def matching(text):
    data_dict = ast.literal_eval(text)

    for key, value in data_dict.items():
        if isinstance(value, (list, dict)):
            data_dict[key] = json.dumps(value)

    # Flatten nested JSON fields
    data_dict['preferred_languages'] = ', '.join(ast.literal_eval(data_dict['preferred_languages']))
    data_dict['interests'] = ', '.join(ast.literal_eval(data_dict['interests']))
    data_dict['availability'] = ', '.join(ast.literal_eval(data_dict['availability']))
            
    df_user = pd.DataFrame([data_dict])

    # Generate un UUID
    random_uuid = str(uuid.uuid4())
    while random_uuid in df['id'].values:
        random_uuid = str(uuid.uuid4())
    df_user['id'] = random_uuid

    columns_to_drop = ['name', 'email','shirt_size','university','dietary_restrictions','introduction','future_excitement','fun_fact', 'objective', 'technical_project','friend_registration','interest_in_challenges']

    # Binarizar la columna de intereses
    #df_user = pd.get_dummies(df_user, columns=['preferred_languages', 'interests', 'availability'], dtype=int)

    print(df_user)
    df_user['preferred_team_size'] = df_user['preferred_team_size'].astype(int) / 4
    df_user['hackathons_done'] = df_user['hackathons_done'].astype(int) / 9
    df_user['age'] = df_user['age'].astype(int) / 8
    # Drop unnecessary columns
    df_user = df_user.drop(columns=columns_to_drop)
    year_order = ["1st year", "2nd year", "3rd year","4th year", "Masters", "PhD"]
    df_user['year_of_study'] = pd.Categorical(df_user['year_of_study'], categories=year_order, ordered=True)
    # Convert categorical 'year_of_study' to numerical codes
    df_user['year_of_study'] = df_user['year_of_study'].cat.codes / 5


    df_user['interests'] = df_user['interests'].apply(lambda x: [i.strip() for i in x.split(',')])
    df_user['preferred_languages'] = df_user['preferred_languages'].apply(lambda x: [i.strip() for i in x.split(',')])

    # Procesar programming_skills JSON
    df_user['programming_skills'] = df_user['programming_skills'].apply(lambda x: json.loads(x))

    # Estandarizar habilidades de programación
    skills_df = pd.json_normalize(df_user['programming_skills'])
    scaler = skpre.MinMaxScaler()
    skills_df[skills_df.columns] = scaler.fit_transform(skills_df)

    # Procesar interests y preferred_languages
    mlb = skpre.MultiLabelBinarizer()
    interests_binarized = mlb.fit_transform(df_user['interests'])
    interests_df = pd.DataFrame(interests_binarized, columns=mlb.classes_)

    languages_binarized = mlb.fit_transform(df_user['preferred_languages'])
    languages_df = pd.DataFrame(languages_binarized, columns=mlb.classes_)

    # Procesar disponibilidad
    availability_binarized = df_user['availability'].str.get_dummies(sep=', ')
    availability_df = pd.DataFrame(availability_binarized)



    # Combinar todo en un solo DataFrame
    df_user = pd.concat([df_user.drop(columns=['interests', 'preferred_languages', 'programming_skills', 'availability']),
                        skills_df, interests_df, languages_df, availability_df], axis=1)


    df_user = pd.get_dummies(df_user, columns=['preferred_role', 'experience_level'], dtype=int)


    # Guardar DataFrame procesado

    df_user.columns = df_user.columns.str.lower()
    # Add missing columns with default value 0
    for column in df.columns:
        if column not in df_user.columns:
            df_user[column] = 0

        
    df_user = df_user.drop(columns=['id'])
    item_profiles = df.iloc[1:, 2:].values
    user_profile = df_user.iloc[0, 1:].values

    return info_group(user_profile)
 

text = """{'name': 'Markus Urban', 'age': 19, 'email': 'markus.urban@estudiantat.upc.edu', 'year_of_study': '2nd year', 'shirt_size': 'M', 'university': 'Universitat Politècnica de Catalunya (UPC)', 'dietary_restrictions': 'None', 'preferred_languages': ['English',
    'Spanish'], 'programming_skills': {'JavaScript': 4, 'Python': 4, 'HTML/CSS': 4, 'Flask': 4}, 'experience_level': 'Intermediate', 'hackathons_done': '2', 'interests': ['Productivity', 'Enterprise', 'Music/Art', 'Communication'], 'preferred_role': 'design',
    'objective': 'onn', 'interest_in_challenges': ['AED Challenge'], 'friend_registration': [], 'preferred_team_size': '4', 'availability': ['Saturday morning', 'Saturday afternoon', 'Saturday night', 'Sunday morning'], 'introduction': 'myself', 'technical_project':
    'cati', 'future_excitement': 'musicals', 'fun_fact': "I'm happy"}
"""


#print(matching(text))

# Compare columns of df_user and df

