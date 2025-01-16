document.addEventListener("DOMContentLoaded", () => {
    const moodSlider = document.getElementById("mood-slider");
    const moodDisplay = document.getElementById("mood-display");
    const addMoodButton = document.getElementById("add-mood");
    const moodNote = document.getElementById("mood-note");
    const timelineList = document.getElementById("timeline-list");

    const moods = ["😢", "😟", "😐", "😊", "😁"];

    // Load saved moods from localStorage
    const loadMoods = () => {
        const savedMoods = JSON.parse(localStorage.getItem("moods")) || [];
        savedMoods.forEach(({ mood, note, date }) => addToTimeline(mood, note, date));
    };

    const addToTimeline = (mood, note, date) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${date}:</strong> ${mood} - ${note}`;
        timelineList.prepend(li); 
    };

    // Save mood and note
    addMoodButton.addEventListener("click", () => {
        const mood = moods[moodSlider.value - 1];
        const note = moodNote.value.trim();
        const date = new Date().toLocaleDateString();

        if (!note) {
            alert("Please add a note!");
            return;
        }

        addToTimeline(mood, note, date);

        // Save to localStorage
        const savedMoods = JSON.parse(localStorage.getItem("moods")) || [];
        savedMoods.unshift({ mood, note, date }); 
        localStorage.setItem("moods", JSON.stringify(savedMoods));

  
        moodNote.value = "";
    });

    // Mood Slider Input
    moodSlider.addEventListener("input", () => {
        const moodIndex = moodSlider.value - 1;
        moodDisplay.textContent = moods[moodIndex];
        moodDisplay.style.transform = "scale(1.2)";
        setTimeout(() => (moodDisplay.style.transform = "scale(1)"), 300);
        setTimeout(() => (moodDisplay.style.transform = "scale(1)"), 300);
    });

    loadMoods();
});
