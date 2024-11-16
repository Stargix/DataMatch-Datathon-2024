from participant import load_participants
from rich import print
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from api_users import caracteriasticas

import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import json

# Load the data
df = pd.read_excel('datathon_participants_processed.xlsx')
# Assuming the first user is the first row, and their features start from column 2
user_profile = df.iloc[0, 2:].values  # The profile of the first user (as an example)
# The item profiles are all rows except the first one (which is the user)
item_profiles = df.iloc[1:, 2:].values  # Exclude the profile of the first user from the items
# Calculate the cosine similarity between the user's profile and the items
similarities = cosine_similarity([user_profile], item_profiles)
# Convert the similarity into a list of tuples of (item_index, similarity)
recommended_items = list(enumerate(similarities[0]))
# Sort the items by similarity
recommended_items = sorted(recommended_items, key=lambda x: x[1], reverse=True)
# Get the top 5 most similar items (adjust the range here)
top_5_items = recommended_items[:4]
# Display the top 5 most similar items (item and similarity)
print(top_5_items)
# Get the IDs of the top 5 most similar items
top_5_items_ids = [df.iloc[recommended_items[i][0] + 1, 0] for i in range(5)]  # Add 1 to get the correct IDs
#print(f"The 5 IDs of the most similar items are: {top_5_items_ids}")
# Create a list to store the features of the items
items_caracteristicas = []
# Get the features of each item and add them to the list
for x in top_5_items_ids:
    item_caracteristicas = caracteriasticas(x)
    items_caracteristicas.append(item_caracteristicas)
# Convert the list of features into a JSON
items_caracteristicas_json = json.dumps(items_caracteristicas, ensure_ascii=False, indent=4)
# Print the resulting JSON
print(items_caracteristicas_json)
