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

// 페이지 로드 시 초기 번호 생성
document.addEventListener('DOMContentLoaded', generateLotto);
