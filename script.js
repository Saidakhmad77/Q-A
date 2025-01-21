async function fetchTranslations() {
    const response = await fetch("translations.json");
    return await response.json();
}

function loadQuestions(translations, language) {
    const sections = ["Exosome"];

    sections.forEach((section) => {
        const container = document.getElementById(
            `${section.toLowerCase()}-questions`
        );
        container.innerHTML = "";

        const questions = translations[language][section];
        Object.entries(questions).forEach(([question, data]) => {
            const questionDiv = document.createElement("div");
            questionDiv.className = "question";

            const toggleIcon = document.createElement("span");
            toggleIcon.className = "toggle-icon";
            toggleIcon.innerHTML = "&#9654;"; // Right arrow (closed state)

            if (Array.isArray(data)) {
                questionDiv.innerHTML = `
                    <div class="question-header">
                        <div class="question-text">${question}</div>
                    </div>
                    <div class="answer-section" style="display: none;">
                        <div class="answer-navigation"></div>
                        <div class="answers"></div>
                    </div>
                `;

                const header = questionDiv.querySelector(".question-header");
                header.appendChild(toggleIcon);

                const answerSection = questionDiv.querySelector(".answer-section");
                const answerNavigation = questionDiv.querySelector(".answer-navigation");
                const answersContainer = questionDiv.querySelector(".answers");

                let currentAnswerIndex = 0; // Track current answer index
                let startX = 0; // Store starting X-coordinate for swipe

                data.forEach((answer, index) => {
                    // Add navigation buttons
                    const button = document.createElement("button");
                    button.className = "answer-button";
                    button.innerText = index + 1;
                    if (index === 0) button.classList.add("active"); // Highlight first button by default
                    button.addEventListener("click", () => {
                        currentAnswerIndex = index; // Update current answer index
                        updateAnswerDisplay(index);
                    });
                    answerNavigation.appendChild(button);

                    // Add answers
                    const answerDiv = document.createElement("div");
                    answerDiv.className = "answer";
                    answerDiv.style.display = index === 0 ? "block" : "none"; // Show first answer by default
                    answerDiv.innerHTML = `
                        <p>${answer.text}</p>
                        ${
                            answer.image
                                ? `<img src="${answer.image}" alt="${question} Answer ${index + 1}">`
                                : ""
                        }
                    `;
                    answersContainer.appendChild(answerDiv);
                });

                // Swipe functionality
                answersContainer.addEventListener("touchstart", (e) => {
                    startX = e.touches[0].clientX; // Capture initial touch position
                });

                answersContainer.addEventListener("touchend", (e) => {
                    const endX = e.changedTouches[0].clientX; // Capture final touch position
                    const deltaX = endX - startX; // Calculate swipe distance

                    if (Math.abs(deltaX) > 50) { // Minimum swipe distance threshold
                        if (deltaX < 0 && currentAnswerIndex < data.length - 1) {
                            // Swipe left: Next answer
                            currentAnswerIndex++;
                        } else if (deltaX > 0 && currentAnswerIndex > 0) {
                            // Swipe right: Previous answer
                            currentAnswerIndex--;
                        }
                        updateAnswerDisplay(currentAnswerIndex);
                    }
                });

                const updateAnswerDisplay = (index) => {
                    // Update answer display based on index
                    Array.from(answersContainer.children).forEach((child, i) => {
                        child.style.display = i === index ? "block" : "none";
                    });

                    Array.from(answerNavigation.children).forEach((btn, i) => {
                        if (i === index) {
                            btn.classList.add("active");
                        } else {
                            btn.classList.remove("active");
                        }
                    });
                };

                header.addEventListener("click", () => {
                    const isVisible = answerSection.style.display === "block";
                    closeAllAnswers();

                    if (!isVisible) {
                        answerSection.style.display = "block";
                        toggleIcon.innerHTML = "&#9660;"; // Down arrow (open state)

                        // Ensure the first answer and button are active by default
                        Array.from(answersContainer.children).forEach((child, i) => {
                            child.style.display = i === 0 ? "block" : "none";
                        });
                        Array.from(answerNavigation.children).forEach((btn, i) => {
                            if (i === 0) {
                                btn.classList.add("active");
                            } else {
                                btn.classList.remove("active");
                            }
                        });
                    } else {
                        answerSection.style.display = "none";
                        toggleIcon.innerHTML = "&#9654;"; // Right arrow (closed state)
                    }
                });
            } else {
                questionDiv.innerHTML = `
                    <div class="question-header">
                        <div class="question-text">${question}</div>
                    </div>
                    <div class="answer" style="display: none;">
                        <p>${data.text}</p>
                        ${
                            data.image
                                ? `<img src="${data.image}" alt="${question}">`
                                : ""
                        }
                    </div>
                `;

                const header = questionDiv.querySelector(".question-header");
                header.appendChild(toggleIcon);

                header.addEventListener("click", () => {
                    const answerDiv = questionDiv.querySelector(".answer");
                    const isVisible = answerDiv.style.display === "block";
                    closeAllAnswers();
                    if (!isVisible) {
                        answerDiv.style.display = "block";
                        toggleIcon.innerHTML = "&#9660;"; // Down arrow (open state)
                    } else {
                        answerDiv.style.display = "none";
                        toggleIcon.innerHTML = "&#9654;"; // Right arrow (closed state)
                    }
                });
            }

            container.appendChild(questionDiv);
        });
    });
}

// Function to close all answers
function closeAllAnswers() {
    document.querySelectorAll(".answer-section").forEach((section) => {
        section.style.display = "none";
    });
    document.querySelectorAll(".answer").forEach((answer) => {
        answer.style.display = "none";
    });
    document.querySelectorAll(".toggle-icon").forEach((icon) => {
        icon.innerHTML = "&#9654;"; // Reset all icons to closed state
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