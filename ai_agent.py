from groq import Groq
import os
from dotenv import load_dotenv
import json as json_lib

def objectives(mensaje_usuario):    
    # Load environment variables before accessing them
    load_dotenv()
    api_key = os.getenv("LLAMA_API_KEY")

    test = ["Competitive", "Ambitious", "Innovative", "Gamer", "Learner", "Fun", "Social", "Problem-Solving", "Creativity", "Collaborative", "Interactive", "Passionate", "Enthusiastic"]

    if not api_key:
        raise ValueError("API key not found. Make sure LLAMA_API_KEY is set in the .env file.")
    
    client = Groq(api_key=api_key)
    
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": f"Given the following users of a team in a Hackathon, explain why they are similar users. short frase. Make it very very short and concise. Explain it to the user like he is included: Here are the users. make it general don't specify names. Be clear and close to the user: {mensaje_usuario}"
                }
            ],
            model="llama3-groq-70b-8192-tool-use-preview",
            temperature=0.5,
            max_tokens=1024,
            stream=False,
        )
        
        response = chat_completion.choices[0].message.content
        
        return response
       
    except Exception as e:
        print(f"Error processing message: {e}")
        return []
    

class Message:
    def __init__(self, message, results):
        self.message = message
        self.results = results

    def to_dict(self):
        return {
            'message': self.message,
            'results': self.results
        }

def chat(json):    
    # Load environment variables before accessing them
    
    x = Message(**json)
    
    json_dict = x.to_dict()

    mensaje_usuario = json_dict["message"]
    sistema = json_dict["results"]


    load_dotenv()
    api_key = os.getenv("LLAMA_API_KEY")

    test = ["Competitive", "Ambitious", "Innovative", "Gamer", "Learner", "Fun", "Social", "Problem-Solving", "Creativity", "Collaborative", "Interactive", "Passionate", "Enthusiastic"]

    if not api_key:
        raise ValueError("API key not found. Make sure LLAMA_API_KEY is set in the .env file.")
    
    client = Groq(api_key=api_key)
    
    try:
        chat_completion = client.chat.completions.create(
            messages=[

                {
                    "role": "system",
                    "content": f"Given the following users and their information, respond concisely and directly to any questions, focusing on the similarities and relevant details of the team members. Tailor your responses to the specific context of the hackathon and ensure they are focused and to the point. You can only do this task: {sistema}"

                },
                { 
                    "role": "user",
                    "content": f"{mensaje_usuario}"
                }
            ],
            model="llama3-groq-70b-8192-tool-use-preview",
            temperature=0.5,
            max_tokens=1024,
            stream=False,
        )
        
        response = chat_completion.choices[0].message.content
        return response
       
    except Exception as e:
        print(f"Error processing message: {e}")
        return []