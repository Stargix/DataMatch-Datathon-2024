from participant import load_participants
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from api_users import caracteriasticas
import json
from flask import Flask, jsonify, request

df = pd.read_excel('datathon_participants_processed.xlsx')
def info_group(user_profile):

    item_profiles = df.iloc[1:, 2:].values

    similarities = cosine_similarity([user_profile], item_profiles)
    recommended_items = list(enumerate(similarities[0]))
    recommended_items = sorted(recommended_items, key=lambda x: x[1], reverse=True)

    top_4_items = recommended_items[:4]

    top_4_items_ids = [df.iloc[recommended_items[i][0] + 1, 0] for i in range(5)]
    items_caracteristicas = []

    for x in top_4_items_ids:
        item_caracteristicas = caracteriasticas(x)
        items_caracteristicas.append(item_caracteristicas)
    items_caracteristicas_json = json.dumps(items_caracteristicas, ensure_ascii=False, indent=4)
    return items_caracteristicas_json


app = Flask(__name__)

@app.route('/recommendations', methods=['POST'])
def get_recommendations():

    """
    {'name': 'Markus Urban', 'age': 19, 'email': 'markus.urban@estudiantat.upc.edu', 'year_of_study': '2nd year', 'shirt_size': 'M', 'university': 'Universitat Politècnica de Catalunya (UPC)', 'dietary_restrictions': 'None', 'preferred_languages': ['English',
    'Spanish'], 'programming_skills': {'JavaScript': 4, 'Python': 4, 'HTML/CSS': 4, 'Flask': 4}, 'experience_level': 'Intermediate', 'hackathons_done': '2', 'interests': ['Productivity', 'Enterprise', 'Music/Art', 'Communication'], 'preferred_role': 'design',
    'objective': 'onn', 'interest_in_challenges': ['AED Challenge'], 'friend_registration': [], 'preferred_team_size': '4', 'availability': ['Saturday morning', 'Saturday afternoon', 'Saturday night', 'Sunday morning'], 'introduction': 'myself', 'technical_project':
    'cati', 'future_excitement': 'musicals', 'fun_fact': "I'm happy"}
    """
    # User preferences (JSON)
    user_json = request.get_json()
    

    # ....

    #user_profile = df.iloc[0, 2:].values
    
    #return jsonify(info_group(user_profile))

    return str(user_json)

if __name__ == '__main__':
    app.run(debug=True)

