from groq import Groq
import os
from dotenv import load_dotenv

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
                    "content": f"Given the following users of a team in a Hackathon, explain why they are similar users. Make it short and concise. Explain it to the user like he is included: Here are the users: {mensaje_usuario}"
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
    