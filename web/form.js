// FORM AND ANIMATIONS SCRIPT
// Developed by Markus Urban for FME Datathon
// 16/11/2026 - 17/11/2024

// Let's see how much sleep I get today...


// [AMP] Programming languages could be rated by level

function go_to_team_form() {

    document.getElementById("dashboard").style.display = "none";
    //document.body.classList = "min-h-screen bg-gradient-to-b from-white to-purple-50 p-4 flex flex-col items-center justify-center";
    document.getElementById("app").style.display = "block";

}

// Open the participant dashboard
function start_team_form() {

    document.getElementById("app").style.display = "none";
    document.body.classList = "min-h-screen bg-gradient-to-br from-teal-50 to-white p-4 md:p-8";
    document.getElementById("team_building_form").style.display = "block";

}


// FORM TITLES AND SUBTITLES
let form_section_titles = ["Participant Information", "Tell us about your preferences", "Tell us about your skills", "More about yourself", "Almost done! ☀️"];
let form_section_subtitles = ["Let's start with some basic information", "Help us customize your experience", "Select all programming languages you're proficient in", "Please tell us more about your objectives and yourself for the Datathon", "Tell us about your projects, your future, and a fun fact"]


var form_page = 0;
var form_max_pages = 5;
var progress = 10;

function form_next_button() {

    form_page++;

    // Change button to "Finish"
    if (form_page == 4) {
        document.getElementById("form_next_button").innerHTML = "Save & finish";
    }

    else {
        document.getElementById("form_next_button").innerHTML = "Next Step";
    }

    // Form finished
    if (form_page >= form_max_pages) {

        send_form();

    }

    else {

        document.getElementById("step_indicator").innerHTML = "Step " + (form_page + 1) + " from 5";
        document.getElementById("form_step_" + (form_page)).style.display = "none";
        document.getElementById("form_step_" + (form_page+1)).style.display = "block";
        document.getElementById("form_section_title").innerHTML = form_section_titles[form_page];
        document.getElementById("form_section_subtitle").innerHTML = form_section_subtitles[form_page];

        // Update progress bar
        const progressBar = document.getElementById("progressBar");
        progress += 20;
        progressBar.style.width = `${progress}%`;

    }

}


function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

var sent_json;

// Save the data and send to server for teammates formation
function send_form() {

    var birthdate = document.getElementById("dob").value;
    var age = getAge(birthdate);

    if (!preferred_role) {
        preferred_role = "Don't care";
    }

    var years = ["1st", "2nd", "3rd", "4th"];
    var year_study = selectedYears[0];
    
    if (years.includes(selectedYears[0])) {
        year_study += " year";
    }

    if (dietaryRestrictions.length == 0) {
        dietaryRestrictions = "None";
    }

    // Format selected programming languages
    var items = selectedLanguages;
    const dict = Object.fromEntries(items.map(item => [item, 4]));

    // Collect all the data
    let participant_info = {
        name: document.getElementById("firstName").value + " " + document.getElementById("lastName").value,
        age: age,
        email: document.getElementById("email").value,
        age: age,
        year_of_study: year_study,
        shirt_size: shirtSize,
        university: document.getElementById("uni").value,
        dietary_restrictions: dietaryRestrictions,

        preferred_languages: ["English", "Spanish"],

        programming_skills: dict,
        experience_level: selectedExperienceLevels[0],
        hackathons_done: document.getElementById("hackathons").value,
        interests: interests,
        preferred_role: preferred_role,
        objective: document.getElementById("objective").value,
        interest_in_challenges: [selectedChallenge + " Challenge"],
        friend_registration: [],
        preferred_team_size: document.getElementById("teamSize").value,
        availability: selectedAvailability,

        introduction: document.getElementById("aboutYourself").value,
        technical_project: document.getElementById("technical-project").value,
        future_excitement: document.getElementById("future-excitement").value,
        fun_fact: document.getElementById("fun-fact").value

    };

    sent_json = participant_info;

    send_data(sent_json);

    document.getElementById("team_building_form").style.display = "none";
    document.getElementById("loader_spinner").style.display = "flex";

}


function show_team_skeleton() {

    document.getElementById("loader_spinner").style.display = "none";
    document.getElementById("skeleton_page").style.display = "block";
}



function send_data(data) {
    
    const url = "http://127.0.0.1:5000/recommendations";
 
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Create the cards
        const jsonArray = data.map(JSON.parse);
        show_real_results(jsonArray);
    })
    .catch(error => {
        console.error("Error:", error);
    });
}



var response = [
    "{\"id\":\"bbba2b20-0c61-4a25-96f8-eccf1facd63e\",\"name\":\"Emily Sanchez\",\"age\":21,\"year_of_study\":\"3rd year\",\"university\":\"Universidad Complutense de Madrid\",\"interests\":[\"Education\",\"Enterprise\",\"Communication\",\"Music\\/Art\",\"Machine Learning\\/AI\",\"DevOps\",\"E-commerce\\/Retail\",\"Fintech\",\"Design\"],\"preferred_role\":\"Design\",\"experience_level\":\"Intermediate\",\"hackathons_done\":2,\"objective\":\"For this datathon, I'm all about having an awesome time and soaking up the experience! My main objective is to make new friends and memories while learning from others. I'm more about the vibe and having fun than being super competitive - I just want to relax, enjoy the events, and be a part of the datathon community. I'm excited to see what everyone's working on, attend the workshops and talks, and just enjoy the energy of the datathon! Let's make some unforgettable moments together!\",\"introduction\":\"Hey everyone! I'm Emily, a 21-year-old student with a passion for innovation and collaboration. When I'm not hitting the books, you can find me exploring new hobbies or jamming out to my favorite tunes. I'm excited to join this datathon community, learn from like-minded individuals, and grow as a developer. I'm all about having fun and soaking up the experience, so let's make some unforgettable moments together! I'm looking forward to diving into some cool projects, attending workshops, and just enjoying the vibes. Here's to making memories and connecting with awesome people!\",\"technical_project\":\"I recently worked on a non-technical project that I just loved! I created a music journaling website where users can record and reflect on their favorite songs and artists. I didn't have to worry about coding or technical details - I just focused on designing the layout, writing the content, and testing it out. It was so satisfying to see it all come together and watch users interact with it. I also loved how it allowed me to combine my passions for music, writing, and design. It was a project that let me express myself creatively, which I always cherish!\",\"fun_fact\":\"Hey, when I'm not coding, I love busting out my guitar and singing with friends at open mic nights! My fave genre is indie-folk, and I'm always looking for new inspiration for my music... maybe a datathon challenge song will come out of this week? Stranger things have happened, right?\",\"availability\":{\"Saturday morning\":true,\"Saturday afternoon\":true,\"Saturday night\":true,\"Sunday morning\":true,\"Sunday afternoon\":true},\"interest_in_challenges\":[\"Restb.ai Challenge\",\"AED Challenge\",\"Mango Challenge\"]}\n",
    "{\"id\":\"2b64fc97-0bd2-4e04-9ac2-e779e61be5e2\",\"name\":\"Ana Isabel Ramirez\",\"age\":20,\"year_of_study\":\"3rd year\",\"university\":\"Universidad de Valencia\",\"interests\":[\"DevOps\",\"Health\",\"Communication\",\"Enterprise\",\"Music\\/Art\",\"Design\",\"Cybersecurity\",\"Databases\"],\"preferred_role\":\"Development\",\"experience_level\":\"Intermediate\",\"hackathons_done\":1,\"objective\":\"For me, this datathon is an amazing opportunity to dive deeper into machine learning and data analysis. I'm a 3rd-year student looking to gain more experience and improve my skills in these areas. I'm all about expanding my technical know-how, so I'm aiming to take in as much as I can from the workshop sessions and collaborate with fellow participants on projects that challenge me. I'm hoping to walk away from this datathon with new tools, concepts, and problem-solving strategies under my belt, and I'm excited to learn from and with my fellow participants!\",\"introduction\":\"Hi everyone! I'm Ana, a third-year student looking to level up my tech game. I'm all about problem-solving and learning new tricks. In the tech world, I've got a sweet spot for DevOps and cybersecurity. When I'm not coding, you can find me jamming to indie music or doodling in my sketchbook. I'm stoked to be part of this datathon and can't wait to dive into machine learning and data analysis with all of you. I'm looking forward to networking, collaborating, and gaining fresh skills and perspectives to rock my future projects!\",\"technical_project\":\"I really loved working on a non-technical project I titled Echoes, where I explored music production through beats and sound design. It was my way to unwind and express my creativity. I used a digital audio workstation to create and arrange melodies, experimenting with different genres and techniques. What I enjoyed most was seeing a song come to life and hearing people's reactions when I shared it with friends. It helped me appreciate the importance of collaboration and how technical skills can be used to tell emotional stories through art.\",\"fun_fact\":\"I'm a triple threat - a coding whiz, a music lover, and a secret artist! When I'm not building solutions, you can find me strumming my guitar or doodling quirky cartoons. My hidden talent? Creating bespoke, programmable sound sculptures with Arduino and Python - it's harmony and hacktivism combined!\",\"availability\":{\"Saturday morning\":false,\"Saturday afternoon\":true,\"Saturday night\":false,\"Sunday morning\":true,\"Sunday afternoon\":true},\"interest_in_challenges\":[\"AED Challenge\",\"Mango Challenge\",\"Restb.ai Challenge\"]}\n",
    "{\"id\":\"227ca0fb-9a44-40b2-a174-20bd75c46237\",\"name\":\"Sofia Garc\\u00eda Rodr\\u00edguez\",\"age\":18,\"year_of_study\":\"2nd year\",\"university\":\"Universidad Complutense de Madrid\",\"interests\":[\"Enterprise\",\"Cybersecurity\",\"Databases\",\"Fintech\",\"DevOps\",\"Education\"],\"preferred_role\":\"Development\",\"experience_level\":\"Intermediate\",\"hackathons_done\":1,\"objective\":\"My objective for this datathon is to come out with some amazing new buddies and a ton of awesome memories. I don't really care about the winning, I just wanna soak up the datathon vibes and have a blast. I'm excited to learn new things, but not as interested in pushing myself to win. My goal is to participate in as many cool events as possible, try out new tools and techniques, and just generally enjoy the ride. If we can grab some beers and chat about our shared passion for tech, even better!\",\"introduction\":\"Hey! I'm Sofia, a 2nd-year student with a passion for tech. I've been messing around with programming for a bit, and I'm always excited to learn new things and meet fellow tech enthusiasts. I'm all about building cool stuff that makes a difference, and I'm not afraid to ask for help. When I'm not coding, you can find me exploring new places, reading tech blogs, or jamming out to my favorite tunes. I'm stoked to be at this datathon and looking forward to soaking up the vibes, making new friends, and leveling up my skills!\",\"technical_project\":\"One of my favorite projects was building a chatbot for my school's library using Flutter. I'm an English literature major, but I love tinkering with tech, and this project allowed me to combine both interests. I designed the bot's layout in Figma and programmed its functionality using Flutter. I even added some humor and personality to make it more user-friendly! The final result was a functional chatbot that helped students navigate the library's resources and services. Seeing students use it and get a kick out of it made all the hard work worth it.\",\"fun_fact\":\"Hey there! So, I have a weird quirk - I can recite all the lyrics to my favorite song by Taylor Swift in both English and Spanish! It's super cheesy, but it's become a fun party trick for my friends, and it helps me remember stuff in a really unique way!\",\"availability\":{\"Saturday morning\":true,\"Saturday afternoon\":true,\"Saturday night\":true,\"Sunday morning\":true,\"Sunday afternoon\":true},\"interest_in_challenges\":[\"Mango Challenge\",\"Restb.ai Challenge\",\"AED Challenge\"]}\n",
    "{\"id\":\"0bd85721-4cf5-46c0-87d3-67ea1dfe1964\",\"name\":\"Sophia L\\u00e9a Langham\",\"age\":17,\"year_of_study\":\"1st year\",\"university\":\"Universidad de Valencia\",\"interests\":[\"Design\",\"Web\",\"Databases\",\"DevOps\",\"Blockchain\",\"Enterprise\",\"Education\",\"Voice skills\",\"Communication\"],\"preferred_role\":\"Don't know\",\"experience_level\":\"Beginner\",\"hackathons_done\":1,\"objective\":\"Hey there! So, I'm Sophia and I'm stoked to be part of this datathon! My objective is to soak up the experience and make the most of it. I want to meet new people, have a blast, and attend as many workshops and events as possible. I'm not too focused on winning - I'd rather learn some new skills, enjoy the vibes, and share laughs with fellow participants. It's gonna be an awesome weekend, and I'm excited to see what adventures we'll create!\",\"introduction\":\"Hey there! I'm Sophia, and I'm beyond excited to be here at the datathon! As a first-year student, I'm still learning the ropes, but I'm already passionate about combining my love for design with the power of tech. I've dabbled in programming, and I'm looking forward to soaking up as much as I can over the weekend. With my fingers on the pulse of innovation, I'm all about creative collaboration and having an amazing time. I'm ready to meet fellow adventurers, learn from each other, and leave with unforgettable experiences. Let's make this an unforgettable weekend!\",\"technical_project\":\"I really enjoyed working on a project where I designed a simple web page for a fictional bookstore using HTML and CSS. I was able to learn how to structure and style my page, adding headers, paragraphs, images, and even some animations! It was super fun to create something visually appealing and functional. The best part was sharing it with my friends and family, and hearing their feedback. It was a great feeling to see my work being used and appreciated. I'd love to build more creative projects like this one!\",\"fun_fact\":\"When I'm not coding, you can find me belting out my favorite indie tracks or practicing yoga in my free time! In fact, I've even performed at a local talent show with my band, The Cyber Sonic Waves - we didn't win, but we rocked the crowd and had a blast\",\"availability\":{\"Saturday morning\":true,\"Saturday afternoon\":true,\"Saturday night\":true,\"Sunday morning\":true,\"Sunday afternoon\":true},\"interest_in_challenges\":[\"Mango Challenge\",\"Restb.ai Challenge\",\"AED Challenge\"]}\n",
    "{\"id\":\"453aed48-4b53-4189-a5b7-e50714aecdd0\",\"name\":\"Aurora Rory S\\u00f8rnes\",\"age\":18,\"year_of_study\":\"1st year\",\"university\":\"Universitat Aut\\u00f2noma de Barcelona (UAB)\",\"interests\":[\"DevOps\",\"Music\\/Art\",\"Web\",\"Databases\",\"Blockchain\",\"Design\",\"Enterprise\",\"Gaming\",\"E-commerce\\/Retail\"],\"preferred_role\":\"Don't know\",\"experience_level\":\"Beginner\",\"hackathons_done\":0,\"objective\":\"Hey! I'm all about having an awesome time and meeting new people at this datathon. I'm not too worried about winning or getting all technical, I just want to have fun and be part of this awesome community. I want to soak up the vibe, attend as many events as I can, and chat with fellow datathoners about their projects. I'm hoping to learn something new, but more importantly, I want to make some rad new friends and memories to look back on. Let's get this datathon party started!\",\"introduction\":\"Hey there! I'm Aurora, but my friends call me Rory. I'm a curious and artsy 18-year-old student in my first year of university. By day, I'm trying to figure out how to code, but by night, I'm probably jamming on my guitar or drawing something weird. I'm all about creativity and experimentation, and I'm super excited to be at the datathon! I'm here to soak up the vibes, learn some new things, and make some rad new friends. Let's have some fun!\",\"technical_project\":\"Oh, oh! I'm totally obsessed with music, and I've had an absolute blast working on a Python project that uses machine learning to generate electronic music beats. It was one of those projects that just felt super cool from the get-go. I used libraries like TensorFlow and NLTK, and even incorporated some basic IoT hardware like sensors and LEDs to control the music's rhythm. The result was this sick, beat-driven track that I'd blast in my bedroom (much to my roommate's dismay, lol). It was an awesome way to combine my love of tech with my love of music - what's better than that?!\",\"fun_fact\":\"Hey there! So, I'm super passionate about music, and did you know that I once wrote a song for my friend's indie folk band? They even played it live at a local concert! I'm still trying to convince them to play it at my future birthday party\",\"availability\":{\"Saturday morning\":true,\"Saturday afternoon\":false,\"Saturday night\":true,\"Sunday morning\":true,\"Sunday afternoon\":true},\"interest_in_challenges\":[\"Restb.ai Challenge\",\"AED Challenge\",\"Mango Challenge\"]}\n",
    "{\"id\":\"4709ef24-9736-438d-b506-ed2804b719dc\",\"name\":\"Isabel Fournier-Rosas\",\"age\":21,\"year_of_study\":\"4th year\",\"university\":\"Universidad de Granada\",\"interests\":[\"Fintech\",\"Web\",\"DevOps\",\"Voice skills\",\"Databases\",\"Communication\",\"Enterprise\",\"Cybersecurity\",\"E-commerce\\/Retail\"],\"preferred_role\":\"Design\",\"experience_level\":\"Advanced\",\"hackathons_done\":8,\"objective\":\"Hey! I'm Isabel Fournier-Rosas, and my objective is to come out on top - I want to win this datathon. With my advanced programming skills and 8 hackathon participations under my belt, I'm ready to put my expertise to the test. I'll be dedicating my time to crunching numbers, perfecting my algorithms, and collaborating with others to create an unbeatable solution. My goal is to claim the top spot and earn recognition for my work. No shortcuts, no distractions - I'm all in for this competition!\",\"introduction\":\"Hey there, I'm Isabel! I'm a 4th-year student with a passion for problem-solving and programming. I've been coding for as long as I can remember, and my experience has taken me on an adventure through fintech, web dev, and enterprise solutions. My ultimate goal is to win this datathon, and I'm willing to put in the sweat to get there. When I'm not studying or coding, you can find me exploring new tech trends or jamming out to my favorite beats. I'm excited to meet fellow competitors and collaborate to create something awesome!\",\"technical_project\":\"One project that stands out to me was a voice-assisted e-commerce bot I built using Google Cloud and Python. I was tasked with creating a seamless shopping experience for users, and I had a blast tackling the challenge. From setting up the natural language processing to integrating with a mock e-commerce database, every aspect required problem-solving and creativity. I loved how this project pushed me out of my comfort zone and allowed me to think outside the box. Plus, getting to see the bot come to life and understand human speech was an amazing feeling!\",\"fun_fact\":\"Hey, I'm a coding enthusiast with a twist! When I'm not typing away on my computer, I'm probably practicing aerial silks. That's right, I'm a secret aerialist. There's something about suspended acrobatics that helps me relax and sparks creativity - perfect for tackling complex coding challenges!\",\"availability\":{\"Saturday morning\":true,\"Saturday afternoon\":true,\"Saturday night\":true,\"Sunday morning\":true,\"Sunday afternoon\":false},\"interest_in_challenges\":[\"Restb.ai Challenge\",\"Mango Challenge\",\"AED Challenge\"]}\n",
    "{\"id\":\"02638d36-f6bd-4d60-b10c-147caefeb222\",\"name\":\"Luc\\u00eda Evelyn Thompson\",\"age\":21,\"year_of_study\":\"3rd year\",\"university\":\"Universidad de Salamanca\",\"interests\":[\"Enterprise\",\"Communication\",\"E-commerce\\/Retail\",\"Education\",\"Cybersecurity\",\"Fintech\",\"AR\\/VR\",\"Voice skills\"],\"preferred_role\":\"Analysis\",\"experience_level\":\"Intermediate\",\"hackathons_done\":4,\"objective\":\"Hey! My main objective for this datathon is to level up my skills and learn as much as I can. I'm looking forward to diving into new technologies and methodologies, and I'm eager to get hands-on experience with different tools and approaches. I'm not too concerned about winning - it's not about the prize for me. I just want to take this opportunity to improve my programming skills, stay up-to-date with industry trends, and come out of here feeling more confident in my abilities. Bring on the coding challenges!\",\"introduction\":\"Hi! I'm Luc\\u00eda, a 21-year-old third-year student with a passion for coding. I'm excited to be part of this datathon, where I can sharpen my skills and explore new technologies. I'm curious about innovation in various fields, from fintech to education, and I'm always eager to learn. When I'm not hitting the books, you can find me building Android apps or playing around with Python. My goal for this datathon is to level up my coding skills and confidence. I'm looking forward to collaborating with like-minded people and having an epic time while doing it!\",\"technical_project\":\"One project that stands out to me was a Computer Vision-based chatbot I built for my university's student union. I combined my Python skills with MongoDB to create a platform that could recognize and respond to simple questions from students about events, clubs, and services. The chatbot used facial recognition to identify students and provide personalized information. I was thrilled to see it in action at the student fair, and even more proud when our president reached out to thank me for a smashing job! It was a fun project that demonstrated the power of applying tech to everyday life.\",\"fun_fact\":\"When I'm not coding, I'm an avid gamer! In my free time, I love playing video games and even participated in a few gaming tournaments in my high school days. My proudest gaming moment was coming in 2nd place in a national-level FIFA tournament!\",\"availability\":{\"Saturday morning\":true,\"Saturday afternoon\":true,\"Saturday night\":true,\"Sunday morning\":false,\"Sunday afternoon\":true},\"interest_in_challenges\":[\"Mango Challenge\",\"Restb.ai Challenge\",\"AED Challenge\"]}\n",
    "{\"id\":\"6e400493-a6b9-4f93-ba41-b8c853e49709\",\"name\":\"Marie Camille Winston\",\"age\":18,\"year_of_study\":\"2nd year\",\"university\":\"Universidad de Valencia\",\"interests\":[\"Health\",\"Design\",\"Music\\/Art\",\"DevOps\",\"Lifehacks\",\"Enterprise\",\"Databases\",\"Blockchain\",\"E-commerce\\/Retail\"],\"preferred_role\":\"Analysis\",\"experience_level\":\"Intermediate\",\"hackathons_done\":3,\"objective\":\"My objective for this datathon is to bring home the win! I've been to three hackathons before, and I'm itching for that first-place trophy. I'm an 18-year-old student with intermediate programming skills, but I'm determined to show off my skills and prove to myself that I can really take on the challenge. I'm not interested in just having fun (although, let's be real, some fun would be awesome too), I'm in it to win it. I'll be fully focused on crushing the competition and taking home that top spot!\",\"introduction\":\"Hey there! I'm Marie Camille, a driven 18-year-old student looking to crush it at this datathon. With a background in programming and a passion for building innovative solutions, I'm ready to unleash my creativity and skill-set to bring home the win. When I'm not coding, you can catch me jamming to indie tunes or designing in my free time. I thrive under pressure and am always up for a challenge. So, buckle up and get ready for a fierce competitor - I'm excited to be a part of this datathon and can't wait to see what magic we can create together!\",\"technical_project\":\"One project that really stood out to me was a mobile app I built for my high school's music department. It was a platform for band members to easily communicate with each other, submit their practices and upcoming performances, and even share their own music creations. I designed the UI\\/UX and built the app from scratch using Android Development. It was a blast to bring my music and coding passions together! Seeing the musicians use the app and get excited about it was super rewarding - and, let's be honest, getting to listen to amazing jam sessions on my phone was a definite perk\",\"fun_fact\":\"I'm a total music lover! When I'm not coding, you can find me strumming my ukulele and creating sick beats on my guitar. In fact, I even composed a song about algorithms and data structures - my friends call it the Coding Boogie.\",\"availability\":{\"Saturday morning\":true,\"Saturday afternoon\":true,\"Saturday night\":false,\"Sunday morning\":false,\"Sunday afternoon\":false},\"interest_in_challenges\":[\"Restb.ai Challenge\",\"AED Challenge\",\"Mango Challenge\"]}\n",
    "{\"id\":\"6bcecb25-380b-452d-8f49-cca09caf185d\",\"name\":\"Soledad Garc\\u00eda\",\"age\":17,\"year_of_study\":\"1st year\",\"university\":\"Universidad Complutense de Madrid\",\"interests\":[\"Social Good\",\"Cybersecurity\",\"Lifehacks\",\"Fintech\",\"Databases\",\"Machine Learning\\/AI\",\"DevOps\",\"E-commerce\\/Retail\",\"Education\"],\"preferred_role\":\"Don't know\",\"experience_level\":\"Beginner\",\"hackathons_done\":1,\"objective\":\"Hey there! So, for this datathon, I'm all about having a blast and making some new connections. I don't really care about competing to win (this time around, at least). I just wanna have fun, attend as many events as I can, and learn from the experience. I'm hoping to meet fellow data enthusiasts, grab some snacks and laughs with them, and just enjoy the atmosphere. Plus, who knows, maybe I'll even stumble upon some cool tools and techniques to improve my skills a bit too. Let's just say I'm all about chill vibes and socializing at this datathon!\",\"introduction\":\"Hey everyone! I'm Soledad, a 17-year-old coding newbie just starting my university journey. I'm super passionate about using tech to make a positive impact and love learning about the latest innovation trends. In my free time, I enjoy tinkering with new programming languages, reading about lifehacks and cybersecurity, and exploring the world of fintech and e-commerce. I'm super excited to be here and meet fellow data enthusiasts who share my enthusiasm for coding and creativity. Can't wait to chill, learn, and make some new friends!\",\"technical_project\":\"I really enjoyed working on a project where I built a simple chatbot using Python to help my school's counseling department. They had a lot of student resources on their website, but it was hard for students to find what they needed. So, I built a bot that would answer students' questions about resources like clubs, study spaces, and counseling services. It was a blast working on it, and the counselors were super stoked to have it. It was a great project for me to learn about natural language processing and conditional statements. Plus, it's making a tangible difference at my school!\",\"fun_fact\":\"When I'm not geeking out over code, I'm usually trying to geek out about music. Did you know that I can solve Rubik's Cubes and play a mean piano solo to the theme song of Harry Potter? Yep, I'm a data nerd by day and a secret musician by night!\",\"availability\":{\"Saturday morning\":true,\"Saturday afternoon\":true,\"Saturday night\":true,\"Sunday morning\":true,\"Sunday afternoon\":true},\"interest_in_challenges\":[\"Mango Challenge\",\"AED Challenge\",\"Restb.ai Challenge\"]}\n",
    "{\"id\":\"e1be33a6-1ace-4755-9d17-02ea1bcf7b9b\",\"name\":\"Lucas Reed\",\"age\":21,\"year_of_study\":\"4th year\",\"university\":\"Universitat Polit\\u00e8cnica de Catalunya (UPC)\",\"interests\":[\"DevOps\",\"Communication\",\"Databases\",\"Enterprise\",\"Design\",\"Education\",\"Music\\/Art\",\"Gaming\",\"Mobile\"],\"preferred_role\":\"Design\",\"experience_level\":\"Intermediate\",\"hackathons_done\":1,\"objective\":\"For me, it's all about vibing with new people and having an awesome time at the datathon! I don't expect to win or blow anyone away with my coding skills (although, let's be real, I'll do my best!), I just want to relax, learn some new stuff, and soak up the atmosphere. I'm super excited to try out new tools and frameworks, attend the workshops, and participate in team challenges. My goal is to make friends, have fun, and get out of my comfort zone - it's gonna be a blast, and I'm stoked to be a part of it!\",\"introduction\":\"Hey, I'm Lucas! A 4th-year student just looking to have an amazing time at the datathon. I'm not super into winning or impressing people with my coding skills (though I'll definitely give it a shot). My goal is to meet awesome people, learn some new tricks, and chill with new folks. I'm really stoked to try out new tools and technologies, attend workshops, and be part of team challenges. I'm all about vibing with new people, making friends, and stepping out of my comfort zone. Can't wait to rock this datathon and make some unforgettable memories!\",\"technical_project\":\"I've always been passionate about music and art, so I decided to combine my technical skills with my creative side and built a music visualizer using PyTorch and OpenCV! I used deep learning to analyze audio files and generate abstract visual representations of the music, which was super cool to see come to life. It was a solo project, but I'd love to see where I could take it with a team. Working on this project reminded me of the importance of experimentation and having fun while coding - it was an amazing feeling to see my idea take shape!\",\"fun_fact\":\"When I'm not coding, you can find me strumming the guitar or scribbling illustrations in my art journal! Did you know I used to teach guitar lessons to younger siblings and cousins? I've got a secret dream to release an album someday - maybe Datathon energizes my musical side!\",\"availability\":{\"Saturday morning\":true,\"Saturday afternoon\":true,\"Saturday night\":true,\"Sunday morning\":true,\"Sunday afternoon\":true},\"interest_in_challenges\":[\"Restb.ai Challenge\",\"AED Challenge\",\"Mango Challenge\"]}\n",
    "{\"id\":\"258fd865-91f5-4d7d-951e-9e6abb57e654\",\"name\":\"Sof\\u00eda Elise Langdale\",\"age\":20,\"year_of_study\":\"3rd year\",\"university\":\"Universidad Complutense de Madrid\",\"interests\":[\"Communication\",\"Machine Learning\\/AI\",\"Cybersecurity\",\"Blockchain\",\"Databases\",\"E-commerce\\/Retail\",\"DevOps\",\"AR\\/VR\"],\"preferred_role\":\"Development\",\"experience_level\":\"Intermediate\",\"hackathons_done\":2,\"objective\":\"As a beginner programmer, I'm more interested in soaking up as much knowledge as possible during this datathon. I'd love to challenge myself and learn from other participants, instructors, and even potential mentors. I'm looking to improve my programming skills, especially in data analysis and visualization, and I'm open to exploring new tools and technologies. My objective is to return to school with new ideas, strategies, and a refreshed approach to my studies, while making the most of this amazing learning opportunity. Bring on the tutorials and collaboration, let's get hacking!\",\"introduction\":\"Hey there! I'm Sof\\u00eda, a 20-year-old student diving into the world of data analysis and visualization. I'm excited to challenge myself and learn from others during this datathon. As a beginner programmer, I'm all about soaking up new knowledge and skills to improve my programming abilities. I'm looking forward to diving into data analysis and visualization, and I'm open to exploring new tools and technologies. With a passion for communication and innovation, I'm hoping to refresh my approach to studies and walk away with a newfound enthusiasm for data-driven projects.\",\"technical_project\":\"One project that really stood out to me was creating a simple web scraper using Python and BeautifulSoup to scrape recipe data from a food website. I enjoyed working on it because it allowed me to combine my interest in culinary arts with my programming skills. I was able to set up a pipeline to extract and process the data, and then visualize it using Tableau. It was a small project, but it was a great way for me to practice my skills and see the output of my work come together. It was also super satisfying to be able to scrape a bunch of recipes and now have a dataset of my own!\",\"fun_fact\":\"I'm a total dance enthusiast! When I'm not crunching code, I love teaching dance classes to kids. Who knew algorithmic rhymes would become a secret power-up to debug my code? I swear, choreographing movements on stage has taught me patience, creativity, and (of course) teamwork - skills I apply to datathons too!\",\"availability\":{\"Saturday morning\":true,\"Saturday afternoon\":true,\"Saturday night\":true,\"Sunday morning\":true,\"Sunday afternoon\":true},\"interest_in_challenges\":[\"AED Challenge\",\"Restb.ai Challenge\",\"Mango Challenge\"]}\n",
    "{\"id\":\"5f9406cb-1f82-41ee-9d96-8cd88671db0f\",\"name\":\"Luna Bianchi\",\"age\":27,\"year_of_study\":\"PhD\",\"university\":\"Politecnico di Milano\",\"interests\":[\"DevOps\",\"Communication\",\"Education\",\"Fintech\",\"Databases\",\"Enterprise\",\"Gaming\",\"Web\",\"Music\\/Art\"],\"preferred_role\":\"Design\",\"experience_level\":\"Advanced\",\"hackathons_done\":7,\"objective\":\"My objective for this datathon is to win, plain and simple. I've participated in seven hackathons so far and I've learned a thing or two about the field, but I'm still hungry for that top prize. I'm ready to dive headfirst into the competition, leveraging my advanced programming skills and doctoral-level knowledge to bring home the win. I'm not here to make friends (although, who knows, maybe I'll make some along the way!) or learn new things (although, let's be real, I'll definitely pick up some new skills). I'm here to compete and emerge victorious. Bring it on!\",\"introduction\":\"Hey there! I'm Luna Bianchi, a 27-year-old PhD student with a passion for coding. When I'm not pouring over code, you can find me geeking out over the latest fintech trends or jamming out to electronic music. With seven hackathons under my belt, I'm on a mission to win the top prize. I'm not here to make friends, but to unleash my coding skills and show what I'm capable of. Expect fiery intensity and an unwavering commitment to my objective. Bring on the challenge!\",\"technical_project\":\"I've always been fascinated by computer vision, so I spent a couple of weeks working on a project where I trained a model to recognize different cat breeds. It was a challenging but incredibly rewarding experience. I built the model using JavaScript and deployed it to the web using React, and I even created a companion app for my friends and family to participate. Seeing the model accurately identify the breeds and learn from new images was an amazing feeling. I also had a lot of fun creating the cat memes that went along with it - let's just say, it was a cat-tastrophe in the best possible way!\",\"fun_fact\":\"When I'm not hacking away, I'm actually a aspiring rockstar! I wrote my first song on guitar at the age of 12 and have been playing in local bands ever since. Nothing fuels my coding fire like a good dose of Led Zeppelin, the more heavy metal, the better!\",\"availability\":{\"Saturday morning\":true,\"Saturday afternoon\":true,\"Saturday night\":true,\"Sunday morning\":true,\"Sunday afternoon\":false},\"interest_in_challenges\":[\"AED Challenge\",\"Restb.ai Challenge\",\"Mango Challenge\"]}\n",
    "{\"id\":\"1aa4feed-7d8f-408c-8158-b5fb6d965f8d\",\"name\":\"Laurence Ellette\",\"age\":21,\"year_of_study\":\"3rd year\",\"university\":\"\\u00c9cole Polytechnique\",\"interests\":[\"Blockchain\",\"Education\",\"DevOps\",\"Enterprise\",\"Communication\"],\"preferred_role\":\"Design\",\"experience_level\":\"Intermediate\",\"hackathons_done\":3,\"objective\":\"My objective? Straightforward: I'm here to win. I've participated in three hackathons before, and each time I've left thinking, What if? What if I'd taken a different approach? What if I'd used a different tool? For this datathon, I'm determined to focus on my skills and crush the challenges. I've been preparing for months, and I'm ready to put my knowledge to the test. I want to see my project idea become a reality, and more importantly, take home the top prize. Bring it on, I'm ready for the competition.\",\"introduction\":\"Hey there, I'm Laurence Ellette. I'm a third-year student with a passion for using technology to drive positive change. Throughout my university journey, I've had a knack for figuring things out and exploring new ideas. My experience in hackathons has taught me the value of perseverance and the thrill of bringing projects to life. I'm pumped to be here, pushing myself to take on the toughest challenges and turn my ideas into realities. Bring it on, let's see what this datathon has in store!\",\"technical_project\":\"One project that stands out to me was building a Blockchain-based grading system for my university's course on DevOps. It was a hackathon project I worked on with friends, and we aimed to create a decentralized platform where students could submit assignments and receive grades without risking their anonymity. We used Ethereum's blockchain to create a decentralized storage system and built the UI using JavaScript and Docker containers. Seeing how the project aligned with my interests in Blockchain and Education made it really fulfilling. It was a huge success, and we even pitched it to the university's IT department!\",\"fun_fact\":\"When I'm not coding, you can find me whipping up a mean guitar solo or two. Did you know that I won a local battle of the bands competition in high school with my punk-rock trio? Music is my way to express my creative chaos and I bring that energy to my coding!\",\"availability\":{\"Saturday morning\":true,\"Saturday afternoon\":true,\"Saturday night\":true,\"Sunday morning\":true,\"Sunday afternoon\":true},\"interest_in_challenges\":[\"AED Challenge\",\"Mango Challenge\",\"Restb.ai Challenge\"]}\n",
    "{\"id\":\"e1e56330-6555-41ca-8028-18d751ce7f63\",\"name\":\"Emily Wilson\",\"age\":21,\"year_of_study\":\"4th year\",\"university\":\"Universitat Ramon Llull (URL)\",\"interests\":[\"Fintech\",\"Communication\",\"Design\",\"Robotic Process Automation\",\"E-commerce\\/Retail\",\"Machine Learning\\/AI\",\"Databases\",\"Lifehacks\",\"Education\"],\"preferred_role\":\"Visualization\",\"experience_level\":\"Advanced\",\"hackathons_done\":8,\"objective\":\"Hey! I'm Emily. For this datathon, my objective is all about having a blast with fellow participants! I'm super excited to mingle with new people, participate in as many events as I can, and learn from others while having fun. I'm not too stressed about winning, as I've had some experience with hackathons before and would love to focus on the social side of things. I'm hoping to make some awesome friends, enjoy some cool talks and workshops, and make this a datathon to remember!\",\"introduction\":\"Hey there! I'm Emily, a 21-year-old fourth-year student who's super excited to be here at the datathon. As a tech enthusiast, I love exploring the intersection of innovation and design, from crafting user-friendly interfaces to building intelligent systems. When I'm not buried in code, you can find me chatting with friends or scoping out the latest lifehack trends. I'm all about making the most of this event, meeting new folks, and having a blast while doing it. Let's get this party started!\",\"technical_project\":\"One project that I absolutely loved working on was a personal blog site I built using Flask and HTML\\/CSS. I designed the UI\\/UX using Materialize and Figma, and implemented a custom admin panel for content management using SQLAlchemy. What made this project so enjoyable was the sense of creative freedom and the ability to learn something new. I didn't have a strict goal or deadline, so I could work on it in small increments whenever I wanted. It was a great way to practice my web development skills and have something to show off when friends and family asked me to make their own websites.\",\"fun_fact\":\"I'm a total Harry Potter geek! When I'm not coding, you can find me re-reading the series for the umpteenth time or trying to convince my friends to let me plan a themed party. My personal motto? 'After all, to the well-organized mind, death is but the next great adventure'.\",\"availability\":{\"Saturday morning\":true,\"Saturday afternoon\":true,\"Saturday night\":true,\"Sunday morning\":true,\"Sunday afternoon\":true},\"interest_in_challenges\":[\"AED Challenge\",\"Restb.ai Challenge\",\"Mango Challenge\"]}\n",
    "{\"id\":\"930fca78-a2ac-4aec-9afd-f477947c99a9\",\"name\":\"Sof\\u00eda Estela Garc\\u00eda\",\"age\":21,\"year_of_study\":\"3rd year\",\"university\":\"Universidad Complutense de Madrid\",\"interests\":[\"Education\",\"DevOps\",\"Design\",\"Productivity\",\"Blockchain\",\"Cybersecurity\"],\"preferred_role\":\"Visualization\",\"experience_level\":\"Intermediate\",\"hackathons_done\":5,\"objective\":\"Hey! My main goal for this datathon is to immerse myself in new data-driven challenges and continue to level up my skills. I'm excited to dive into real-world problems and learn from others who share my passion for coding. I hope to leave this event feeling inspired and equipped with fresh ideas and techniques to incorporate into my studies and future projects. Of course, making connections and having fun with fellow participants is a bonus - but my primary focus is on personal growth and skill-building. Let's see what this datathon brings!\",\"introduction\":\"Hey there! I'm Sof\\u00eda, a 21-year-old student with a passion for technology and innovation. I'm in my third year of studying, and I'm all about exploring new opportunities to level up my skills. I'm excited to dive into data-driven challenges and learn from others who share my enthusiasm for coding. When I'm not studying, you can find me experimenting with different programming languages and technologies, or brainstorming new ideas for apps and projects. I'm looking forward to meeting fellow enthusiasts and taking my skills to the next level at this datathon!\",\"technical_project\":\"I had an absolute blast working on a mobile app project in Flutter for a school volunteer program. I was responsible for designing and building the app, and it was amazing to see my ideas come to life. The project involved creating a social media-like platform for volunteers to connect, share their experiences, and participate in online discussions. I got to apply my understanding of UX\\/UI principles, work with MongoDB for data storage, and even added some fun animations using the Flutter animation library. It was a huge learning experience for me, and I loved seeing the positive impact it could have on people's lives.\",\"fun_fact\":\"Hey! When I'm not coding, you can find me whipping up a mean empanada or two (or ten). I'm a passionate foodie, and I love experimenting with new flavors and recipes. Did you know I won a local cooking competition in high school with my legendary chicken parmesan empanadas?\",\"availability\":{\"Saturday morning\":true,\"Saturday afternoon\":true,\"Saturday night\":true,\"Sunday morning\":true,\"Sunday afternoon\":true},\"interest_in_challenges\":[\"Restb.ai Challenge\",\"Mango Challenge\",\"AED Challenge\"]}\n",
    "{\"id\":\"f4bed344-dd3c-49e1-85f7-9d41121c94d8\",\"name\":\"Ariadna Llorente-\\u00c9pinel\",\"age\":20,\"year_of_study\":\"2nd year\",\"university\":\"Universitat Polit\\u00e8cnica de Catalunya (UPC)\",\"interests\":[\"Cybersecurity\",\"Machine Learning\\/AI\",\"DevOps\",\"Voice skills\",\"Health\",\"Fintech\",\"Databases\",\"Design\",\"Blockchain\"],\"preferred_role\":\"Analysis\",\"experience_level\":\"Intermediate\",\"hackathons_done\":1,\"objective\":\"My objective for this datathon is to have a blast with fellow coding enthusiasts! I want to soak up the electric atmosphere, make new friends, and be a part of as many events as possible. I'm hoping to learn new tricks and techniques from others, but mainly I just want to have fun and enjoy the experience. I'm all about teamwork and collaboration, so I'm excited to see what we can achieve together. Bring on the coding, coffee, and camaraderie - I'm ready to rock this datathon!\",\"introduction\":\"Hi there! I'm Ariadna, a 20-year-old student with a passion for programming. I'm currently in my second year, and I'm loving the journey so far. When I'm not stuck in the virtual world of code, I'm exploring my fascination with the intersection of technology and humanity. I believe that tech has the power to revolutionize how we live and interact, and I want to be at the forefront of that revolution. This datathon is the perfect opportunity for me to connect with like-minded individuals and unleash my creativity. See you there!\",\"technical_project\":\"I had a blast working on a React Native project to build a voice-controlled fitness tracker! I paired machine learning algorithms with speech recognition to create a smart personal trainer that offers customized workout routines based on the user's voice commands. I loved combining my interest in AI, Voice Skills, and Health into one project. It was challenging, but the result was so cool - I could shout Hey, Ari! Let's do burpees! and my app would start counting down the exercises for me. It was an amazing feeling to see something I created come to life!\",\"fun_fact\":\"When I'm not coding, I'm actually a bit of a rockstar at heart! In my free time, I love jamming on my guitar and writing lyrics about social and environmental issues. My friends even joke that my code is the secret to unlocking my next big anthem!\",\"availability\":{\"Saturday morning\":true,\"Saturday afternoon\":true,\"Saturday night\":true,\"Sunday morning\":false,\"Sunday afternoon\":true},\"interest_in_challenges\":[\"Mango Challenge\",\"AED Challenge\",\"Restb.ai Challenge\"]}\n"
];

var users = [];

function show_real_results(participants) {

  document.getElementById("loader_spinner").style.display = "none";

  // First card is filled with sent_json data
  document.getElementById("user_avatar_1").src = `https://avatar.oxro.io/avatar.svg?name=${sent_json.name}`;
  document.getElementById("user_name_1").textContent = sent_json.name;
  document.getElementById("user_description_1").textContent = sent_json.preferred_role;

  // Popover for first card
  document.getElementById("user_age_1").textContent = `Age: ${sent_json.age}`;
  document.getElementById("user_year_1").textContent = `Year of Study: ${sent_json.year_of_study}`;
  document.getElementById("user_role_1").textContent = `Role: ${sent_json.preferred_role}`;
  document.getElementById("user_hackathons_1").textContent = `Hackathons Done: ${sent_json.hackathons_done}`;

  // Fill remaining cards with data from participants array
  for (let i = 0; i < 2; i++) {
    const participant = participants[i];
    const cardId = i + 2; // To target user_card_2 and user_card_3

    document.getElementById(`user_avatar_${cardId}`).src = `https://avatar.oxro.io/avatar.svg?name=${participant.name}`;
    document.getElementById(`user_name_${cardId}`).textContent = participant.name;
    document.getElementById(`user_description_${cardId}`).textContent = participant.preferred_role;

    // Popover for other cards
    document.getElementById(`user_age_${cardId}`).textContent = `Age: ${participant.age}`;
    document.getElementById(`user_year_${cardId}`).textContent = `Year of Study: ${participant.year_of_study}`;
    document.getElementById(`user_role_${cardId}`).textContent = `Role: ${participant.preferred_role}`;
    document.getElementById(`user_hackathons_${cardId}`).textContent = `Hackathons Done: ${participant.hackathons_done}`;
  }

  document.getElementById("loader_spinner").style.display = "none";
  document.getElementById("real_results_page").style.display = "block";

}



function joinTeam() {

    document.getElementById("spinner_text").innerHTML = "Saving your new team...";
    document.getElementById("real_results_page").style.display = "none";
    document.getElementById("loader_spinner").style.display = "flex";

    setTimeout(function() {
        
        document.getElementById("loader_spinner").style.display = "none";
        document.getElementById("team_images_placeholder").style.display = "none";
        document.getElementById("team_images_real").style.display = "flex";
        document.getElementById("team_text").innerHTML = "You joined a team!";
        document.getElementById("team_subtext").innerHTML = "You can change your team if you wish";
        document.getElementById("button_team_join").innerHTML = "Leave the team";
        document.getElementById("button_team_join").style.backgroundColor = "#e74c3c";

        // Put team member initials on the dashboard
        document.getElementById("team_avatar_img_1").src = document.getElementById("user_avatar_1").src;
        document.getElementById("team_avatar_img_2").src = document.getElementById("user_avatar_2").src;
        document.getElementById("team_avatar_img_3").src = document.getElementById("user_avatar_3").src;
        document.getElementById("team_avatar_img_4").src = document.getElementById("user_avatar_4").src;

        document.getElementById("dashboard").style.display = "block";

    }, 2000);

}

function closeSuccessSection() {
    document.getElementById("join_success_section").classList.add("hidden");
  }
