function navigateToQuestions(lang) {
    window.location.href = `qna.html?lang=${lang}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const languageSelector = document.getElementById('language');
    const questionsContainer = document.getElementById('questions-container');

    const translations = {
        en: {
            questions: [
                { q: "What is STEMON's mission?", a: "STEMON aims to develop innovative cell therapies for intractable diseases." },
                { q: "Where is STEMON located?", a: "STEMON is headquartered in Gyeonggi-do, South Korea." },
                { q: "What services does STEMON provide?", a: "STEMON is a company that offers a variety of innovative services and solutions, primarily in the technology and business development sectors. Their core focus is on providing comprehensive support to businesses aiming to integrate advanced technologies into their operations. They specialize in IT consulting, helping companies optimize workflows and adopt the latest digital tools. STEMON also offers custom software development to meet unique client requirements, including web, mobile, and enterprise applications. They are skilled in integrating artificial intelligence (AI) and machine learning (ML) to enhance decision-making and efficiency. Another key service is cloud computing solutions, enabling businesses to scale and secure their operations effectively. STEMON provides robust cybersecurity measures, including risk assessments and threat mitigation strategies. For startups, the company offers business incubation and mentorship programs to foster innovation. They assist in project management, ensuring timely and efficient execution of initiatives. Their expertise in data analytics helps organizations extract actionable insights from large datasets. STEMON supports digital transformation efforts, guiding companies through modernization processes. They provide e-commerce solutions, including platform development and marketing strategies. Additionally, STEMON develops Internet of Things (IoT) systems for smart automation and monitoring. The company offers training programs for employees to build technical competencies. They have experience in blockchain development for secure and transparent transactions. STEMON also focuses on renewable energy technology integration for businesses aiming to go green. Their virtual and augmented reality services cater to industries like education, entertainment, and healthcare. STEMON assists clients in patent development and intellectual property management. They provide quality assurance and testing services for products and software. Lastly, STEMON offers technical support and maintenance services to ensure client systems operate seamlessly. Through these services, STEMON aims to empower businesses with cutting-edge tools and strategies for success in a competitive market." }
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
            questionDiv.textContent = q;

            const answerDiv = document.createElement('div');
            answerDiv.className = 'answer';
            answerDiv.textContent = a;

            questionDiv.addEventListener('click', () => {
                const isVisible = answerDiv.style.display === 'block';
                document.querySelectorAll('.answer').forEach(ans => (ans.style.display = 'none'));
                answerDiv.style.display = isVisible ? 'none' : 'block';
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
