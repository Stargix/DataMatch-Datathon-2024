document.addEventListener("DOMContentLoaded", () => {
    const personas = [
      { id: 0, title: "Persona 1", icon: "🧑‍🦱" },
      { id: 1, title: "Persona 2", icon: "👩‍🦰" },
      { id: 2, title: "Persona 3", icon: "👩‍🦱" },
      { id: 3, title: "Persona 4", icon: "👩🏾‍🦱" },
      { id: 4, title: "Persona 5", icon: "🧑‍🦰" },
    ];
  
    let selectedCard = 2;
  
    const app = document.getElementById("app");
  
    function render() {
      app.innerHTML = `
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          ${personas
            .map(
              (persona, index) => `
            <div
              class="relative cursor-pointer transition-all duration-300 ${
                selectedCard === index
                  ? "bg-gradient-to-b from-purple-400 to-purple-500 scale-110 z-10"
                  : "bg-white hover:scale-105"
              } w-48 h-64 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center gap-4 fade-in"
              onclick="selectCard(${index})"
            >
              <div
                class="text-4xl rounded-full p-4 ${
                  selectedCard === index ? "bg-white/20" : "bg-gray-100"
                }"
              >
                ${persona.icon}
              </div>
              <div class="h-2 w-16 rounded ${
                selectedCard === index ? "bg-white/20" : "bg-gray-100"
              }"></div>
              <div class="h-2 w-24 rounded ${
                selectedCard === index ? "bg-white/20" : "bg-gray-100"
              }"></div>
            </div>`
            )
            .join("")}
        </div>
        <div class="text-center space-y-6 fade-in">
          <h1 class="text-4xl md:text-5xl font-serif font-medium text-gray-900">Create a nice team</h1>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Answer some questions and let us find some amazing teammates for this Datathon
          </p>
          <div class="flex flex-col items-center gap-2">
            <button onclick="start_team_form();" class="group relative inline-flex items-center justify-center rounded-full bg-gray-900 px-8 py-3 text-lg font-medium text-white transition-transform hover:scale-105">
              Let's Go
            </button>
            <span class="text-sm text-gray-500">takes ~6 minutes</span>
          </div>
        </div>
      `;
    }
  
    // Define global function to allow inline `onclick`
    window.selectCard = (index) => {
      selectedCard = index;
      render();
    };
  
    render();
  });
  
  
