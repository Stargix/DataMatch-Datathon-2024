from participant import load_participants
from rich import print
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
df = pd.read_excel('datathon_participants_processed.xlsx')

user_profile = df.iloc[0, 2:].values  # El perfil del primer usuario (como ejemplo)
item_profiles = df.iloc[:, 2:].values  # Las características de todos los ítems


similarities = cosine_similarity([user_profile], item_profiles)

# Convertir la similitud en una lista de tuplas de (ítem, similitud)
recommended_items = list(enumerate(similarities[0]))

# Ordenar los ítems por la similitud
recommended_items = sorted(recommended_items, key=lambda x: x[1], reverse=True)


top_5_items = recommended_items[:5]
print(top_5_items)

# Obtener los IDs de los 5 ítems más similares
top_5_items_ids = [df.iloc[recommended_items[i][0], 0] for i in range(5)]

print(f"Los 5 IDs de los ítems más similares son: {top_5_items_ids}")



