
async function fetchTranslations() {
    const response = await fetch("translations.json");
    return await response.json();
}

function loadQuestions(translations, language) {
    const sections = ["Exosome", "STEMON", "Reprosome"];

    sections.forEach(section => {
        const container = document.getElementById(`${section.toLowerCase()}-questions`);
        container.innerHTML = ""; 

        const questions = translations[language][section];
        Object.entries(questions).forEach(([question, answer]) => {
            const questionDiv = document.createElement("div");
            questionDiv.className = "question";

            questionDiv.innerHTML = `
                <div class="question-text">${question}</div>
                <div class="answer">${answer}</div>
            `;

            questionDiv.addEventListener("click", () => {
                const answerDiv = questionDiv.querySelector(".answer");
                const isVisible = answerDiv.style.display === "block";
                document.querySelectorAll(".answer").forEach(a => a.style.display = "none");
                answerDiv.style.display = isVisible ? "none" : "block";
            });

            container.appendChild(questionDiv);
        });
    });
}

function setLanguage(language) {
    localStorage.setItem("selectedLanguage", language);
}

function getLanguage() {
    return localStorage.getItem("selectedLanguage") || "en";
}

function navigateToQnA(language) {
    setLanguage(language);
    window.location.href = `qna.html?lang=${language}`;
}

function navigateToHome() {
    const currentLanguage = getLanguage();
    window.location.href = `index.html?lang=${currentLanguage}`;
}

document.addEventListener("DOMContentLoaded", async () => {
    const translations = await fetchTranslations();

    const languageSelector = document.getElementById("language");
    const urlParams = new URLSearchParams(window.location.search);
    let currentLanguage = urlParams.get("lang") || getLanguage();

    if (languageSelector) {
        languageSelector.value = currentLanguage;
        languageSelector.addEventListener("change", (e) => {
            currentLanguage = e.target.value;
            setLanguage(currentLanguage);
            loadQuestions(translations, currentLanguage);

            const newUrl = `${window.location.pathname}?lang=${currentLanguage}`;
            window.history.replaceState(null, "", newUrl);
        });
    }

    setLanguage(currentLanguage);
    loadQuestions(translations, currentLanguage);
});