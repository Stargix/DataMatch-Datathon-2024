from participant import load_participants
from rich import print
import pandas as pd
import sklearn.preprocessing as skpre

data_path = "data/datathon_participants.json"
participants = load_participants(data_path)

df = pd.DataFrame(participants)

# Eliminar columnes poc importants
columns_to_drop = ['name', 'email','shirt_size','university','dietary_restrictions','introduction','future_excitement','fun_fact', 'objective', 'technical_project','friend_registration','interest_in_challenges']  # Reemplaça amb els noms de les columnes que desitges eliminar
df.drop(columns=columns_to_drop, inplace=True)

# Inspeccionar el DataFrame després d'eliminar columnes
#print(df.head())

# Convertir interessos a format binari
mlb = skpre.MultiLabelBinarizer()
interests_binarized = mlb.fit_transform(df['interests'])

#languages_bin = mlb.fit_transform(df['preferred_languages'])

# Crear un DataFrame per als interessos binaritzats
interests_df = pd.DataFrame(interests_binarized, columns=mlb.classes_)

# Combinar amb el DataFrame principal
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


"""

df['programming_skills'] = df['programming_skills'].apply(lambda x: eval(x) if isinstance(x, str) else x)
df['programming_skills'] = df['programming_skills'].fillna({})

# Expandir los diccionarios en columnas
skills_df = pd.json_normalize(df['programming_skills'])

# Reemplazar NaN por 0 (si alguna habilidad no está presente para un participante)
skills_df = skills_df.fillna(0)

# Concatenar el DataFrame original con las columnas nuevas
df = pd.concat([df, skills_df], axis=1)

# Eliminar la columna original `programming_skills` si ya no es necesaria
df = df.drop(columns=['programming_skills'])


skills_columns = skills_df.columns
df[skills_columns] = scaler.fit_transform(df[skills_columns])

# Convertir nombres de habilidades a minúsculas para evitar duplicados
skills_df.columns = [col.lower() for col in skills_df.columns]
skills_df = skills_df.groupby(axis=1, level=0).sum()  # Combinar columnas duplicadas

"""
def standardize_skills_json(df, skills_column='programming_skills'):
    """
    Estandariza y procesa una columna JSON de habilidades para su uso en filtrado basado en contenido.
    
    Parameters:
    -----------
    df : pandas.DataFrame
        DataFrame que contiene la columna de habilidades
    skills_column : str
        Nombre de la columna que contiene el JSON de habilidades
        
    Returns:
    --------
    pandas.DataFrame
        DataFrame procesado con las habilidades normalizadas
    list
        Lista de las columnas de habilidades procesadas
    """
    # Crear una copia del DataFrame original
    df_processed = df.copy()
    
    # Convertir strings JSON a diccionarios
    df_processed[skills_column] = df_processed[skills_column].apply(
        lambda x: eval(x) if isinstance(x, str) else x
    )
    
    # Rellenar valores nulos con diccionarios vacíos
    df_processed[skills_column] = df_processed[skills_column].fillna({})
    
    # Expandir el JSON en columnas individuales
    skills_df = pd.json_normalize(df_processed[skills_column])
    
    # Procesar nombres de columnas
    skills_df.columns = [col.lower().strip() for col in skills_df.columns]
    
    # Combinar columnas duplicadas
    skills_df = skills_df.groupby(axis=1, level=0).sum()
    
    # Rellenar valores faltantes con 0
    skills_df = skills_df.fillna(0)
    
    # Normalizar valores usando MinMaxScaler
    scaler = skpre.MinMaxScaler()
    skills_columns = skills_df.columns
    skills_df[skills_columns] = scaler.fit_transform(skills_df[skills_columns])
    
    # Combinar con el DataFrame original
    df_final = pd.concat([
        df_processed.drop(columns=[skills_column]),
        skills_df
    ], axis=1)
    
    return df_final, list(skills_columns)

df, skill_columns = standardize_skills_json(df)

# Guardar el DataFrame en un fitxer Excel
output_path = "datathon_participants_processed.xlsx"
df.to_excel(output_path, index=False)
#print(df.head())
print(df.columns)



