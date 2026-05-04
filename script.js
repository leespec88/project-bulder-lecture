// 테마 전환 기능
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '라이트 모드';
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '다크 모드';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '라이트 모드';
        }
    });
}

function getBallClass(num) {
    if (num <= 10) return 'range-1';
    if (num <= 20) return 'range-2';
    if (num <= 30) return 'range-3';
    if (num <= 40) return 'range-4';
    return 'range-5';
}

function generateLotto() {
    const container = document.getElementById('lotto-sets');
    if (!container) return;
    
    container.innerHTML = '';

    for (let i = 0; i < 5; i++) {
        const numbers = [];
        while (numbers.length < 6) {
            const num = Math.floor(Math.random() * 45) + 1;
            if (!numbers.includes(num)) {
                numbers.push(num);
            }
        }
        numbers.sort((a, b) => a - b);

        const setDiv = document.createElement('div');
        setDiv.className = 'lotto-set';

        numbers.forEach(num => {
            const ball = document.createElement('div');
            ball.className = `ball ${getBallClass(num)}`;
            ball.textContent = num;
            setDiv.appendChild(ball);
        });

        container.appendChild(setDiv);
    }
}

// 페이지 로드 시 초기 번호 생성 및 테마 초기화
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    generateLotto();
});
