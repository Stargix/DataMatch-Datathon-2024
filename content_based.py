from participant import load_participants
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from api_users import caracteriasticas, load_participants
import json
from flask import Flask, jsonify, request
from matching import matching
from flask_cors import CORS
from ai_agent import chat


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

team_profiles = group_team()

def info_group(user_profile):

    item_profiles = df.iloc[1:, 2:].values

    similarities = {}
    for team_id, team_profile in team_profiles.items():
        similarities[team_id] = cosine_similarity([user_profile], [team_profile])[0][0]

    sorted_teams = sorted(similarities.items(), key=lambda x: x[1], reverse=True)

    # Seleccionar los top_n equipos más similares
    recommended_items = [team[0] for team in sorted_teams]
    similarity_scores = [team[1] for team in sorted_teams]

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

