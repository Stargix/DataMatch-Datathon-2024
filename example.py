from participant import load_participants
from rich import print

data_path = "data/datathon_participants.json"
participants = load_participants(data_path)

print(participants[2])
