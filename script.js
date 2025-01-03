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
        Object.entries(questions).forEach(([question, data]) => {
            const questionDiv = document.createElement("div");
            questionDiv.className = "question";

            questionDiv.innerHTML = `
                <div class="question-text">${question}</div>
                <div class="answer">
                    <p>${data.text}</p>
                    ${data.image ? `<img src="${data.image}" alt="${question}">` : ""}
                </div>
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

const translations = {
    en: {
        welcomeTitle: "Welcome to STEMON's Q&A",
        welcomeText: "Please select a language to explore frequently asked questions.",
        welcomeAdditional: "Whether you're curious about our therapies, biotechnology, or general company information, we have answers in your preferred language."
    },
    zh: {
        welcomeTitle: "欢迎来到 STEMON 的问答",
        welcomeText: "请选择一种语言，以探索常见问题。",
        welcomeAdditional: "无论您对我们的疗法、生物技术或一般公司信息感到好奇，我们都有您所需的答案。"
    },
    jp: {
        welcomeTitle: "STEMON のQ&Aへようこそ",
        welcomeText: "よくある質問を探すために言語を選択してください。",
        welcomeAdditional: "当社の治療法やバイオテクノロジー、一般的な会社情報についての回答をご用意しています。"
    }
};

function changeLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);

    document.getElementById('welcome-title').innerText = translations[lang].welcomeTitle;
    document.getElementById('welcome-text').innerText = translations[lang].welcomeText;
    document.getElementById('welcome-additional').innerText = translations[lang].welcomeAdditional;

    const languageDropdown = document.getElementById('header-language');
    if (languageDropdown) {
        languageDropdown.value = lang;
    }
}

function loadLanguage() {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    changeLanguage(savedLanguage);
}

window.onload = loadLanguage;

function navigateToQnA(lang) {
    localStorage.setItem('selectedLanguage', lang); 
    window.location.href = `qna.html?lang=${lang}`; 
}