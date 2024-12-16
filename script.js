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
                { 
                    q: "What is STEMON?", 
                    a: "STEMON is a global biotechnology company specializing in innovative cell and exosome therapies to improve human health." 
                },
                { 
                    q: "What is an exosome?", 
                    a: "Exosomes are small vesicles secreted by cells that play a critical role in cell communication, regeneration, and healing processes." 
                },
                { 
                    q: "How do exosome therapies work?", 
                    a: "Exosome therapies deliver beneficial proteins and RNA to damaged or diseased cells, promoting natural regeneration and healing." 
                },
                { 
                    q: "What products does STEMON offer?", 
                    a: "STEMON provides advanced exosome-based products and cell therapies designed to address various medical and aesthetic conditions." 
                },
                { 
                    q: "What conditions can STEMON's therapies treat?", 
                    a: "STEMON's therapies are developed to treat immune disorders, skin rejuvenation, chronic inflammation, aging-related issues, and more." 
                },
                { 
                    q: "Are STEMON's products safe?", 
                    a: "Yes, all STEMON products undergo rigorous testing, quality control, and clinical trials to ensure safety and effectiveness." 
                },
                { 
                    q: "Where can I find STEMON's treatments?", 
                    a: "STEMON's treatments are available through certified clinics and medical partners worldwide, including Japan, Korea, and the US." 
                },
                { 
                    q: "Does STEMON conduct research and development?", 
                    a: "Yes, STEMON continuously invests in R&D to innovate cell and exosome therapies and improve healthcare solutions globally." 
                }
            ]
        },
        zh: {
            questions: [
                { q: "什么是STEMON？", a: "STEMON是一家全球性生物技术公司，专注于创新的细胞和外泌体疗法，以改善人类健康。" },
                { q: "什么是外泌体？", a: "外泌体是细胞分泌的小囊泡，在细胞通讯、再生和愈合过程中起着重要作用。" },
                { q: "外泌体疗法如何工作？", a: "外泌体疗法将有益的蛋白质和RNA传递到受损或患病细胞，促进自然再生和愈合过程。" },
                { q: "STEMON提供哪些产品？", a: "STEMON提供先进的外泌体产品和细胞疗法，专门治疗各种医学和美容问题。" },
                { q: "STEMON的疗法可以治疗哪些疾病？", a: "STEMON的疗法专为免疫系统疾病、皮肤修复、慢性炎症、衰老相关问题等设计。" },
                { q: "STEMON的产品安全吗？", a: "是的，所有STEMON产品都经过严格的测试、质量控制和临床试验，以确保安全性和有效性。" },
                { q: "在哪里可以找到STEMON的治疗？", a: "STEMON的治疗可通过全球认证的诊所和医疗合作伙伴提供，包括日本、韩国和美国等地区。" },
                { q: "STEMON是否进行研发？", a: "是的，STEMON持续投资于研发，不断创新细胞和外泌体疗法，改善全球医疗解决方案。" }
            ]
        },
        jp: {
            questions: [
                { q: "STEMONとは何ですか？", a: "STEMONは、革新的な細胞療法とエクソソーム療法を提供し、人々の健康を改善するグローバルなバイオテクノロジー企業です。" },
                { q: "エクソソームとは何ですか？", a: "エクソソームは細胞が分泌する小さな小胞で、細胞間の通信や再生、修復に重要な役割を果たします。" },
                { q: "エクソソーム療法はどのように機能しますか？", a: "エクソソーム療法は、有益なタンパク質やRNAを損傷した細胞に届け、自然な再生と治癒を促進します。" },
                { q: "STEMONの製品にはどのようなものがありますか？", a: "STEMONは、さまざまな医療および美容分野の問題を対象とした先進的なエクソソーム製品と細胞療法を提供しています。" },
                { q: "STEMONの治療はどのような症状に効果がありますか？", a: "STEMONの治療は、免疫疾患、皮膚の若返り、慢性炎症、加齢による問題などに効果的です。" },
                { q: "STEMONの製品は安全ですか？", a: "はい、STEMONのすべての製品は、厳格なテストと臨床試験を経て、安全性と有効性が確保されています。" },
                { q: "STEMONの治療はどこで受けられますか？", a: "STEMONの治療は、日本、韓国、アメリカなど、世界中の認定クリニックや医療パートナーを通じて提供されています。" },
                { q: "STEMONは研究開発を行っていますか？", a: "はい、STEMONは細胞療法とエクソソーム療法の革新に投資し、世界の医療ソリューションの改善に取り組んでいます。" }
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