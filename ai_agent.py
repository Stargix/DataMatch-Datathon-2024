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
                    "content": f"Given the following objectives of a Hackathon participant, classify it in categories of interests. Return single word caracteristhics in a list, the options are theese, they MUST be strings [Competitive, Ambitious, Innovative, Gamer, Learner, Fun, Social, Problem-Solving, Creativity, Collaborative, Interactive, Passionate, Enthusiastic]: Here is the message: {mensaje_usuario}"
                }
            ],
            model="llama3-groq-70b-8192-tool-use-preview",
            temperature=0.5,
            max_tokens=1024,
            stream=False,
        )
        
        response = chat_completion.choices[0].message.content
        response_list = response.strip().split(", ")

        for i in response_list:
            if i not in test:
                response_list.remove(i)

        return response_list
       
    except Exception as e:
        print(f"Error processing message: {e}")
        return []
    