import pandas as pd 
df = pd.read_json("./data/datathon_participants.json")

def caracteriasticas(id_usu):
    
    columnas_seleccionadas = ["id", "name", "age", "year_of_study", "university", "interests", "preferred_role", "experience_level", "hackathons_done", "objective", "introduction", "technical_project", "fun_fact", "availability","interest_in_challenges" ]
    # Filtrar las columnas seleccionadas
    df_filtrado = df[columnas_seleccionadas]
    # Filtrar las filas basadas en los IDs seleccionados
    df_filtrado = df_filtrado[df_filtrado['id'] == id_usu]
    # Guardar el DataFrame filtrado en un nuevo archivo JSON
    #result = df_filtrado.to_json("output_file", orient='records', lines=True)
    result = df_filtrado.to_json(orient='records', lines=True)
    return result 

#caracteriasticas("2ebad15c-c0ef-4c04-ba98-c5d98403a90c")

def load_participants(id_usu):


    df_filtrado = df[["id", "friend_registration"]]
    # Filtrar las filas basadas en los IDs seleccionados
    df_filtrado = df_filtrado[df_filtrado['id'] == id_usu]

    return df_filtrado["friend_registration"].values[0]


#print(load_participants("2ebad15c-c0ef-4c04-ba98-c5d98403a90c"))