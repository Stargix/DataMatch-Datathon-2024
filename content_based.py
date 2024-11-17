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
    team_members = {}
    for user in df['id']:
        team_member_ids = load_participants(user)
        if not team_member_ids:
            continue

        # Filtrar datos de miembros del equipo
        team_profiles_df = df[df['id'].isin(team_member_ids)].iloc[:, 2:]
        team_profiles_df = team_profiles_df.select_dtypes(include=[np.number])  # Solo columnas numéricas
        
        # Calcular el perfil promedio
        team_profile = team_profiles_df.mean(axis=0, skipna=True).values
        team_profiles[user] = team_profile
        team_members[user] = team_member_ids  # Guardar los IDs de los miembros

    return team_profiles, team_members

team_profiles = group_team()

def info_group(user_profile):
    team_profiles, team_members = group_team()

    # Asegurar normalización
    item_profiles = df.iloc[:, 2:].values

    similarities = {}
    for team_id, team_profile in team_profiles.items():
        similarities[team_id] = cosine_similarity([user_profile], [team_profile])[0][0]

    # Ordenar equipos por similitud
    sorted_teams = sorted(similarities.items(), key=lambda x: x[1], reverse=True)

    # Seleccionar los top_n equipos más similares
    recommended_teams = sorted_teams

    recommended_items = []
    similarity_scores = []
    for team_id, score in recommended_teams:
        recommended_items.extend(team_members[team_id])  # Añadir todos los miembros del equipo
        similarity_scores.extend([score] * len(team_members[team_id]))

    top_16 = recommended_items[:16]
    top_4 = recommended_items[:4]

    items_caracteristicas = []

    for x in top_16:
        item_caracteristicas = caracteriasticas(x)
        items_caracteristicas.append(item_caracteristicas)
        
    items_caracteristicas_json = json.dumps(items_caracteristicas, ensure_ascii=False, indent=4)
    return items_caracteristicas_json


app = Flask(__name__)
CORS(app)  # Enables CORS for all routes

@app.route('/recommendations', methods=['POST'])
def get_recommendations():
    
    
    # User preferences (JSON)
    user_json = request.get_json()
    
    return str(matching(str(user_json)))

@app.route('/chat', methods=['POST'])
def get_chat():
    # User preferences (JSON)
    json = request.get_json()
  
    return jsonify(chat(json))

if __name__ == '__main__':
    app.run(debug=True)

