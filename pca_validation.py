import pandas as pd
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA
from content_based_validation import *
import json 

# Cargar el DataFrame principal
df = pd.read_excel('datathon_participants_processed.xlsx')

df_friends = pd.read_json("./data/datathon_participants.json")

def visualizar_equipos(json_file, ids, filename='visualizacion_equipos.png'):
    
    # Separar características numéricas excluyendo la columna 'id'
    features = df.drop(columns=['id'])  # Asegúrate de excluir la columna 'id'

    # Reducción de dimensionalidad con PCA
    pca = PCA(n_components=2)
    reduced_features = pca.fit_transform(features)
    
    # Graficar todos los datos en un color neutro
    plt.figure(figsize=(12, 8))  # Aumentar el tamaño de la figura
    plt.scatter(reduced_features[:, 0], reduced_features[:, 1], color='lightgray', label='Otros Individuos')

    # Colores para amigos y sin amigos
    friend_color = 'blue'
    no_friend_color = 'red'

    # Graficar los IDs seleccionados
    for i, id_ in enumerate(df['id']):
        if id_ in ids:
            # Obtener la lista de amigos del DataFrame de amigos
            friends_row = df_friends[df_friends['id'] == id_]
            if not friends_row.empty:
                friends_ids = friends_row["friend_registration"].values[0]  # Obtener la lista de amigos

                # Comprobar si tiene amigos en la lista de IDs
                if any(friend in ids for friend in friends_ids):
                    plt.scatter(reduced_features[i, 0], reduced_features[i, 1], color=friend_color, label=f"ID {id_} (Amigo)")
                else:
                    plt.scatter(reduced_features[i, 0], reduced_features[i, 1], color=no_friend_color, label=f"ID {id_} (Sin Amigos)")

    # Ajustar los límites de los ejes
    plt.xlim(reduced_features[:, 0].min() - 1, reduced_features[:, 0].max() + 1)
    plt.ylim(reduced_features[:, 1].min() - 1, reduced_features[:, 1].max() + 1)

    plt.xlabel('Componente Principal 1')
    plt.ylabel('Componente Principal 2')
    plt.title('Visualización de Equipos en 2D')
    plt.legend(loc='upper right', bbox_to_anchor=(1.15, 1))  # Mover la leyenda fuera del gráfico
    plt.grid(True)
    plt.axis('equal')  # Asegurar que la escala de los ejes sea la misma
    
    # Guardar la figura
    plt.savefig(filename, bbox_inches='tight')  # Guardar la figura con un margen ajustado
    plt.show()

ids = get_recommendations() # IDs de los individuos a graficar
visualizar_equipos(df, ids, filename='visualizacion_equipos.png')  # Puedes cambiar el nombre y formato del archivo




"""

ESTE ES SIN DIFERENCIAR A LOS AMIGOS:




import pandas as pd
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA
from prueba import *
import json 

# Cargar el DataFrame principal
df = pd.read_excel('datathon_participants_processed.xlsx')

# Cargar el DataFrame de amigos
df_friends = pd.read_json("./data/datathon_participants.json")


def visualizar_equipos(json_file, ids, filename='visualizacion_equipos.png'):
    
    # Separar características numéricas excluyendo la columna 'id'
    features = df.drop(columns=['id'])  # Asegúrate de excluir la columna 'id'

    # Reducción de dimensionalidad con PCA
    pca = PCA(n_components=2)
    reduced_features = pca.fit_transform(features)
    
    # Graficar todos los datos en un color neutro
    plt.figure(figsize=(12, 8))  
    plt.scatter(reduced_features[:, 0], reduced_features[:, 1], color='lightgray', label='Otros Individuos')

    # Colores para amigos y sin amigos
    friend_color = 'blue'
    no_friend_color = 'red'

    # Graficar los IDs seleccionados
    for i, id_ in enumerate(df['id']):
        if id_ in ids:
            # Obtener la lista de amigos del DataFrame de amigos
            friends_row = df_friends[df_friends['id'] == id_]
            if not friends_row.empty:
                friends_list = friends_row["friend_registration"].values[0]
                friends_ids = json.loads(friends_list) if isinstance(friends_list, str) else []

                # Comprobar si tiene amigos en la lista de IDs
                if any(friend in ids for friend in friends_ids):
                    plt.scatter(reduced_features[i, 0], reduced_features[i, 1], color=friend_color, label=f"ID {id_} (Amigo)")
                else:
                    plt.scatter(reduced_features[i, 0], reduced_features[i, 1], color=no_friend_color, label=f"ID {id_} (Sin Amigos)")

    # Ajustar los límites de los ejes
    plt.xlim(reduced_features[:, 0].min() - 1, reduced_features[:, 0].max() + 1)
    plt.ylim(reduced_features[:, 1].min() - 1, reduced_features[:, 1].max() + 1)

    plt.xlabel('Componente Principal 1')
    plt.ylabel('Componente Principal 2')
    plt.title('Visualización de Equipos en 2D')
    plt.legend(loc='upper right', bbox_to_anchor=(1.15, 1))  # Mover la leyenda fuera del gráfico
    plt.grid(True)
    plt.axis('equal')  # Asegurar que la escala de los ejes sea la misma
    
    # Guardar la figura
    plt.savefig(filename, bbox_inches='tight')  # Guardar la figura con un margen ajustado
    plt.show()

#ids, j = get_recommendations() # IDs de los individuos a graficar
visualizar_equipos(df, ["97a555b7-99a5-4a5e-8f47-631d5507e25a","725b1704-4da0-423d-b51a-b465f2a41906","ae5a6bbe-8911-4195-9589-4ce25d6ddc8e","b8d50918-f0b5-4452-aae3-c097eafd99ab"], filename='visualizacion_equipos.png')  # Puedes cambiar el nombre y formato del archivo


"""



