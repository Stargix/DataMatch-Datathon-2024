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

Once we have standarized the data, we group it in teams (there are users that have applyed with friends), then we apply the cosine_similarity function to analize distances between users in the multidimensional space, where we order by proximity and get a group of 4 suitable members, and a backup of similar users that might be useful if the match isn't succesful at first.





![landing.png](https://cdn.dorahacks.io/static/files/19339be04057f7c2ad9066e4d4eae613.png)

# INTRODUCTION 🌍
Building effective teams is complicated, so our system aims to use the power of **Artificial Intelligence** to match Datathon participants and allow an incredible experience. 

# THE DATASET 💾
Taking a look at the user database and applying **Dimensionality Reduction** techniques *(PCA)*, we can observe various user clusters. We can see that the individuals that are recommended by our system are from the same cluster as the original user, allowing us to see that they are similar users. 

![visualizacion_equipos.png](https://cdn.dorahacks.io/static/files/19339c429a47203ef3f28ac4f8380443.png)

Observing locally, using *t-SNE* :
![visualizacion_equipos2.png]()


We can also take a look at the **Variance** of the users that our system recommends. As we can see on the folowing chart, the variances are very low, indicating that the users are, indeed, **very close** to each other. 

![varianza_distancias.png](https://cdn.dorahacks.io/static/files/19339ca30482a23cb9ef7ed4de78277a.png)


# THE MATCHING SYSTEM ✨
First, we process the data from the user database, selecting the most relevant variables based on match compatibility. Next, we standardize all the data to ensure that all values fall within the range of 0 to 1, balancing the weights across the variables. 

Once the data is standardized, we group users into teams, taking into account that some users have applied with friends. We then apply the cosine similarity function to analyze the distances between users in a multidimensional space. Users are ranked by proximity, and we select a group of four suitable members. Additionally, we create a backup pool of similar users who can be considered if the initial match is unsuccessful.

# THE USER INTERFACE 💻
We’ve designed a **modern**, **intuitive** user interface with a strong focus on ease of use. 

To start, we’ve developed a **participant dashboard** that showcases relevant information, such as upcoming events, ensuring users have quick and easy access to key details.
![Participant Dasboard.png](https://cdn.dorahacks.io/static/files/193399df869c32a5d0947be45c9bc3c8.png)
The registration form has been carefully structured to gather a large amount of relevant data while minimizing complexity. The form is divided into sections, making it easier and less time-consuming to complete. 
![FORMSection.png](https://cdn.dorahacks.io/static/files/19339a157b84b5657235cbe4992ae128.png)
Once registered, our **AI-driven matching** system analyzes the data to identify the best team combinations, presenting the results to the user. 
![team_recommendations.png](https://cdn.dorahacks.io/static/files/19339abc3abcc57955c64e4496db5c38.png)
Additionally, an **AI-powered chatbot** is available to answer detailed questions about both individual participants and the team as a whole, ensuring transparency and explainability in our recommendations. 
![team_chat.png](https://cdn.dorahacks.io/static/files/19339ac25ca1cf1f45bc1b2416ab0664.png)
Users can save, swap, and adjust team members until they are satisfied.
![team_change.png](https://cdn.dorahacks.io/static/files/19339ac86a70fe7010e2faa4b48a697d.png)
Once the perfect team is formed, joining is just a click away. 
![team_joined.png](https://cdn.dorahacks.io/static/files/19339accdb2e4423c76783b4638b477e.png)
**Team building has never been simpler!** ☀️
