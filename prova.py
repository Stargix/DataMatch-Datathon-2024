from participant import load_participants
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from api_users import caracteriasticas, load_participants
import json
from flask import Flask, jsonify, request
from matching import matching
from flask_cors import CORS
from ai_agent import chat
import numpy as np


df = pd.read_excel('datathon_participants_processed.xlsx')

def group_team():
    team_profiles = {}
    for user in df['id']:
        # Obtener los participantes del equipo del usuario actual
        team_member_ids = load_participants(user)
        if not team_member_ids:
            continue  # Si no hay equipo, pasamos al siguiente usuario

        team_profiles_df = df[df['id'].isin(team_member_ids)]

            # Calcular el perfil promedio del equipo (ignorando las primeras columnas no numéricas)
        team_profile = team_profiles_df.iloc[:, 2:].mean(axis=0).values

        team_profiles[user] = team_profile

    return team_profiles

def info_group(user_profile):
    team_profiles = group_team()

    item_profiles = df.iloc[1:, 2:].values

    similarities = {}
    for team_id, team_profile in team_profiles.items():
        similarities[team_id] = cosine_similarity([user_profile], [team_profile])[0][0]

    sorted_teams = sorted(similarities.items(), key=lambda x: x[1], reverse=True)

    # Seleccionar los top_n equipos más similares
    recommended_items = [team[0] for team in sorted_teams]
    similarity_scores = [team[1] for team in sorted_teams]

    top_4_items = recommended_items[:16]
    top_4 = recommended_items[:3]

    #top_4_items_ids = [df.iloc[recommended_items[i][0] + 1, 0] for i in range(16)]
    items_caracteristicas = []

    for x in top_4:
        item_caracteristicas = caracteriasticas(x)
        items_caracteristicas.append(item_caracteristicas)
        
    print(items_caracteristicas)
    items_caracteristicas_json = json.dumps(items_caracteristicas, ensure_ascii=False, indent=4)
    return top_4

user_profile = df.iloc[0, 2:].values
random_index = np.random.randint(0, df.shape[0])
user_profile = df.iloc[random_index, 2:].values

print(info_group(user_profile))

