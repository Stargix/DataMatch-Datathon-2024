# 🌀 **DATA-MATCH**

Data-Match is a tool designed to perform data matching, with advanced features such as a form, a matching system, and an integrated chatbot.

---

## ✨ Features

- **Form**: Collect and organize input data.  
- **Matching System**: Identify similarities to match Datathon groups.  
- **Chatbot**: Dynamically interact with users to give information about the groups.  

---

## 🚀 Installation

- Clone this repository:  
   ```bash
   git clone https://github.com/Stargix/Datathon-2024

---

## 🧩 Execution

- Execute: content_based.py
- Open: /web/index.html

## Matching Sistem

Firstly we process the data from the user database, where we select the most important variables according to match campatibilities, then we standarize all the data to have all values between 0 and 1 and equilibrate weights.
Once we have standarized the data, we group it in teams (there are users that have applyed with friens), then we apply the cosine_similarity function to analize distances between users in the multidimensional space, where we order by proximity and get a group of 4 suitable members, and a backup of similar users that might be useful if the match isn't succesful at first.
