from participant import load_participants
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from api_users import caracteriasticas
import json
from flask import Flask, jsonify, request
from matching import matching
from flask_cors import CORS
from ai_agent import chat




df = pd.read_excel('datathon_participants_processed.xlsx')
def info_group(user_profile):

    item_profiles = df.iloc[1:, 2:].values

    similarities = cosine_similarity([user_profile], item_profiles)
    
    recommended_items = list(enumerate(similarities[0]))
    recommended_items = sorted(recommended_items, key=lambda x: x[1], reverse=True)

    """ratings_matrix = item_profiles.pivot(index='user_id', columns='item_id', values='rating')
    similarities = cosine_similarity(ratings_matrix)

    user_similarities = similarities[0]
    number_of_items = item_profiles.shape[1]

    item_scores = [0] * number_of_items
    for i in range(len(user_similarities)):
        if i != 0:  # No comparamos al usuario consigo mismo
            for j in range(number_of_items):
                if ratings_matrix[i][j] > 0:  # Solo consideramos ítems calificados
                    item_scores[j] += user_similarities[i] * ratings_matrix[i][j]

    #recommended_items = list(enumerate(similarities[0]))
    #recommended_items = sorted(recommended_items, key=lambda x: x[1], reverse=True)
    recommended_items = sorted(enumerate(item_scores), key=lambda x: x[1], reverse=True)"""


    top_4_items = recommended_items[:16]
    top_4 = recommended_items[:4]

    top_4_items_ids = [df.iloc[recommended_items[i][0] + 1, 0] for i in range(16)]
    items_caracteristicas = []

    for x in top_4_items_ids:
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

