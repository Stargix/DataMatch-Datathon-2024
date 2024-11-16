from participant import load_participants
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from api_users import caracteriasticas
import json

df = pd.read_excel('datathon_participants_processed.xlsx')
def info_group(user_profile):

    item_profiles = df.iloc[1:, 2:].values

    similarities = cosine_similarity([user_profile], item_profiles)
    recommended_items = list(enumerate(similarities[0]))
    recommended_items = sorted(recommended_items, key=lambda x: x[1], reverse=True)

    top_4_items = recommended_items[:4]

    top_4_items_ids = [df.iloc[recommended_items[i][0] + 1, 0] for i in range(5)]
    return top_4_items_ids




def get_recommendations():
    user_profile = 
    info_group(user_profile)


