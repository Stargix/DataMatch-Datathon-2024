#import imflow
#libreria shap_images testea los modelos, donde estaba mirando el modelo en la imagen para clasificarla



import pandas as pd 


def caracteriasticas(id_usu, archivo_json):
    
    columnas_seleccionadas = ["id", "name", "age", "year_of_study", "university", "interests", "preferred_role", "experience_level", "hackathons_done", "objective", "introduction", "technical_project", "fun_fact", "availability","interest_in_challenges" ]
    
    df = pd.read_json(archivo_json)

    # Filtrar las columnas seleccionadas

    df_filtrado = df[columnas_seleccionadas]


    # Filtrar las filas basadas en los IDs seleccionados

    df_filtrado = df_filtrado[df_filtrado['id'] == id_usu]


    # Guardar el DataFrame filtrado en un nuevo archivo JSON
    result = df_filtrado.to_json("output_file", orient='records', lines=True)
    return result 

caracteriasticas("2ebad15c-c0ef-4c04-ba98-c5d98403a90c", archivo_json="/home/taya/Desktop/IAA/iaavienv/Datathon-2024/data/datathon_participants.json")