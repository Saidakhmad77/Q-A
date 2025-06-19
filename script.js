async function fetchTranslations() {
    const response = await fetch("translations.json");
    return await response.json();
}

function loadQuestions(translations, language) {
    const sections = ["Exosome"];

    sections.forEach((section) => {
        const container = document.getElementById(`${section.toLowerCase()}-questions`);
        container.innerHTML = "";

        const questions = translations[language][section];
        Object.entries(questions).forEach(([question, data]) => {
            const questionDiv = document.createElement("div");
            questionDiv.className = "question";

            const toggleIcon = document.createElement("span");
            toggleIcon.className = "toggle-icon";
            toggleIcon.innerHTML = "&#9654;";

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

                let currentAnswerIndex = 0;
                let startX = 0;

                data.forEach((answer, index) => {
                    const button = document.createElement("button");
                    button.className = "answer-button";
                    button.innerText = index + 1;
                    if (index === 0) button.classList.add("active");
                    button.addEventListener("click", () => {
                        currentAnswerIndex = index;
                        updateAnswerDisplay(index);
                    });
                    answerNavigation.appendChild(button);

                    const answerDiv = document.createElement("div");
                    answerDiv.className = "answer";
                    answerDiv.style.display = index === 0 ? "block" : "none";
                    answerDiv.innerHTML = `
                        <p>${answer.text}</p>
                        ${answer.image ? `<img src="${answer.image}" alt="${question} Answer ${index + 1}">` : ""}
                    `;
                    answersContainer.appendChild(answerDiv);
                });

                answersContainer.addEventListener("touchstart", (e) => {
                    startX = e.touches[0].clientX;
                });

                answersContainer.addEventListener("touchend", (e) => {
                    const endX = e.changedTouches[0].clientX;
                    const deltaX = endX - startX;

                    if (Math.abs(deltaX) > 50) {
                        if (deltaX < 0 && currentAnswerIndex < data.length - 1) {
                            currentAnswerIndex++;
                        } else if (deltaX > 0 && currentAnswerIndex > 0) {
                            currentAnswerIndex--;
                        }
                        updateAnswerDisplay(currentAnswerIndex);
                    }
                });

                const updateAnswerDisplay = (index) => {
                    Array.from(answersContainer.children).forEach((child, i) => {
                        child.style.display = i === index ? "block" : "none";
                    });

                    Array.from(answerNavigation.children).forEach((btn, i) => {
                        btn.classList.toggle("active", i === index);
                    });
                };

                header.addEventListener("click", () => {
                    const isVisible = answerSection.style.display === "block";
                    closeAllAnswers();

                    if (!isVisible) {
                        answerSection.style.display = "block";
                        toggleIcon.innerHTML = "&#9660;";
                        updateAnswerDisplay(0);
                    } else {
                        answerSection.style.display = "none";
                        toggleIcon.innerHTML = "&#9654;";
                    }
                });
            } else {
                questionDiv.innerHTML = `
                    <div class="question-header">
                        <div class="question-text">${question}</div>
                    </div>
                    <div class="answer" style="display: none;">
                        <p>${data.text}</p>
                        ${data.image ? `<img src="${data.image}" alt="${question}">` : ""}
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
                        toggleIcon.innerHTML = "&#9660;";
                    } else {
                        answerDiv.style.display = "none";
                        toggleIcon.innerHTML = "&#9654;";
                    }
                });
            }

            container.appendChild(questionDiv);
        });
    });

    // ✅ Show/hide Chinese-only brochure section
    const brochureSection = document.getElementById("chinese-brochure");
    if (brochureSection) {
        brochureSection.style.display = (language === "zh") ? "block" : "none";
    }
}

function closeAllAnswers() {
    document.querySelectorAll(".answer-section").forEach((section) => {
        section.style.display = "none";
    });
    document.querySelectorAll(".answer").forEach((answer) => {
        answer.style.display = "none";
    });
    document.querySelectorAll(".toggle-icon").forEach((icon) => {
        icon.innerHTML = "&#9654;";
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

// Brochure slide logic (if using buttons)
// function showBrochureSlide(index) {
//     const slides = document.querySelectorAll('.brochure-slide');
//     const tabs = document.querySelectorAll('.brochure-tab');
//     slides.forEach((slide, i) => {
//         slide.style.display = i === index ? 'block' : 'none';
//     });
//     tabs.forEach((tab, i) => {
//         tab.classList.toggle('active', i === index);
//     });
// }