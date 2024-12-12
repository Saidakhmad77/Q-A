function navigateToQuestions(lang) {
    window.location.href = `qna.html?lang=${lang}`;
}

function navigateToHome() {
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const languageSelector = document.getElementById('language');
    const questionsContainer = document.getElementById('questions-container');

    const translations = {
        en: {
            questions: [
                { q: "What is STEMON's mission?", a: "STEMON aims to develop innovative cell therapies for intractable diseases." },
                { q: "Where is STEMON located?", a: "STEMON is headquartered in Gyeonggi-do, South Korea." },
                { q: "What services does STEMON provide?", a: "STEMON provides cutting-edge cell therapy research and development services." }
            ]
        },
        zh: {
            questions: [
                { q: "STEMON的使命是什么？", a: "STEMON致力于开发创新的细胞治疗技术，以应对难治性疾病。" },
                { q: "STEMON的总部在哪里？", a: "STEMON总部位于韩国京畿道。" },
                { q: "STEMON提供什么服务？", a: "STEMON提供最先进的细胞治疗研究和开发服务。" }
            ]
        },
        jp: {
            questions: [
                { q: "STEMONの使命は何ですか？", a: "STEMONは、難治性疾患に対する革新的な細胞療法の開発に取り組んでいます。" },
                { q: "STEMONの所在地はどこですか？", a: "STEMONは韓国の京畿道に本社を置いています。" },
                { q: "STEMONはどのようなサービスを提供していますか？", a: "STEMONは最先端の細胞療法の研究と開発サービスを提供しています。" }
            ]
        }
    };

    function updateQuestions(language) {
        questionsContainer.innerHTML = '';
        const selectedQuestions = translations[language].questions;

        selectedQuestions.forEach(({ q, a }) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';

            const questionText = document.createElement('span');
            questionText.textContent = q;

            const icon = document.createElement('span');
            icon.className = 'icon';
            icon.textContent = '▼';

            questionDiv.appendChild(questionText);
            questionDiv.appendChild(icon);

            const answerDiv = document.createElement('div');
            answerDiv.className = 'answer';
            answerDiv.innerHTML = `
                <p>${a}</p>
                <div class="close-answer">Close ✖</div>
            `;

            questionDiv.addEventListener('click', () => {
                const isVisible = answerDiv.style.display === 'block';
                document.querySelectorAll('.answer').forEach(ans => {
                    ans.style.display = 'none';
                });
                document.querySelectorAll('.icon').forEach(i => {
                    i.textContent = '▼';
                });

                if (!isVisible) {
                    answerDiv.style.display = 'block';
                    icon.textContent = '▲';
                }
            });

            answerDiv.querySelector('.close-answer').addEventListener('click', (e) => {
                e.stopPropagation();
                answerDiv.style.display = 'none';
                icon.textContent = '▼';
            });

            questionsContainer.appendChild(questionDiv);
            questionsContainer.appendChild(answerDiv);
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const defaultLanguage = urlParams.get('lang') || 'en';

    languageSelector.value = defaultLanguage;
    updateQuestions(defaultLanguage);

    languageSelector.addEventListener('change', (e) => {
        updateQuestions(e.target.value);
    });
});