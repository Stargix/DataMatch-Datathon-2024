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
        return False
    

text = """objective": "For this datathon, I'm all about having an awesome time and making some new buddies! I don't mind if my project idea isn't super original or if I don't win, as long as I get to hang out with other passionate people and learn something new along the way. I'm looking forward to attending workshops, meetups, and social events, and just soaking up all the energy and excitement of the datathon. My objective is to come out with some fantastic memories, and a bunch of new friends who share my enthusiasm for data and technology!",
        "introduction": "Hey! I'm Luna, a 19-year-old student on a mission to make some unforgettable memories and friendships at this datathon. I'm all about being part of a vibrant community that shares my passion for data and tech. I'm excited to dive into workshops, mingle with like-minded individuals, and soak up new skills. If I'm being honest, I'm not super picky about the project - as long as it's fun and interactive, I'm game! Looking forward to meeting new people, sharing laughs, and maybe even finding a new partner-in-crime for future projects. See you around!",
        "technical_project": "One project I really enjoyed working on was a mental health app I built for my college assignment. I used Android Development and PyTorch to create a voice-based chatbot that helps users track their mood and emotions. I loved how I could combine my interest in health and voice skills to create something that could make a real difference in people's lives. I also got to experiment with different techniques for handling user sentiment analysis, which was a fun challenge. Even though it was just a small project, I felt a sense of accomplishment knowing I was creating something that could potentially help people.",
        "future_excitement": "I'm utterly thrilled to share with you my aspirations for the next decade! I'm envisioning a future where AI-powered telemedicine platforms revolutionize global healthcare. Imagine virtual clinics, where patients can connect with medical professionals from the comfort of their own homes, leveraging voice assistants, mobile apps, and augmented reality to share vital signs and symptoms. As a machine learning enthusiast, I'd love to contribute to developing algorithms that help doctors accurately diagnose patients remotely, streamline patient onboarding, and even provide personalized treatment plans. It's a challenging, yet exhilarating prospect, and I'm excited to be a part of shaping this future!"""

objectives(text)