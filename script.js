// 테마 전환 기능
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

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

function analyzeNumbers(numbers) {
    const sum = numbers.reduce((a, b) => a + b, 0);
    const odds = numbers.filter(n => n % 2 !== 0).length;
    const evens = 6 - odds;
    const highs = numbers.filter(n => n >= 23).length; // 23~45
    const lows = 6 - highs; // 1~22

    return {
        sum,
        oddEven: `${odds}:${evens}`,
        highLow: `${highs}:${lows}`
    };
}

// 클립보드 복사 기능
function copyToClipboard(numbers) {
    const text = numbers.join(', ');
    navigator.clipboard.writeText(text).then(() => {
        alert('번호가 클립보드에 복사되었습니다: ' + text);
    }).catch(err => {
        console.error('복사 실패:', err);
    });
}

// 번호 저장 기능 (Local Storage)
function saveNumberSet(numbers) {
    let saved = JSON.parse(localStorage.getItem('savedLotto')) || [];
    
    // 중복 체크
    const isDuplicate = saved.some(set => JSON.stringify(set) === JSON.stringify(numbers));
    if (isDuplicate) {
        alert('이미 저장된 번호입니다.');
        return;
    }

    saved.unshift(numbers); // 최신 저장 건을 위로
    localStorage.setItem('savedLotto', JSON.stringify(saved));
    renderSavedNumbers();
    alert('번호가 저장되었습니다.');
}

// 저장된 번호 렌더링
function renderSavedNumbers() {
    const container = document.getElementById('saved-list');
    if (!container) return;

    const saved = JSON.parse(localStorage.getItem('savedLotto')) || [];
    
    if (saved.length === 0) {
        container.innerHTML = '<p class="empty-msg">저장된 번호가 없습니다.</p>';
        return;
    }

    container.innerHTML = '';
    saved.forEach((numbers, index) => {
        const item = document.createElement('div');
        item.className = 'saved-item';

        const numsDiv = document.createElement('div');
        numsDiv.className = 'saved-nums';
        numbers.forEach(num => {
            const ball = document.createElement('div');
            ball.className = 'saved-ball';
            ball.textContent = num;
            numsDiv.appendChild(ball);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '삭제';
        deleteBtn.onclick = () => deleteSavedNumber(index);

        item.appendChild(numsDiv);
        item.appendChild(deleteBtn);
        container.appendChild(item);
    });
}

// 저장된 번호 삭제
function deleteSavedNumber(index) {
    let saved = JSON.parse(localStorage.getItem('savedLotto')) || [];
    saved.splice(index, 1);
    localStorage.setItem('savedLotto', JSON.stringify(saved));
    renderSavedNumbers();
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

        const analysis = analyzeNumbers(numbers);

        const setWrapper = document.createElement('div');
        setWrapper.className = 'lotto-set-wrapper';

        const setDiv = document.createElement('div');
        setDiv.className = 'lotto-set';

        numbers.forEach(num => {
            const ball = document.createElement('div');
            ball.className = `ball ${getBallClass(num)}`;
            ball.textContent = num;
            setDiv.appendChild(ball);
        });

        // 액션 버튼 (복사, 저장)
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'set-actions';
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'action-btn copy-btn';
        copyBtn.textContent = '복사';
        copyBtn.onclick = () => copyToClipboard(numbers);

        const saveBtn = document.createElement('button');
        saveBtn.className = 'action-btn save-btn';
        saveBtn.textContent = '저장';
        saveBtn.onclick = () => saveNumberSet(numbers);

        actionsDiv.appendChild(copyBtn);
        actionsDiv.appendChild(saveBtn);

        const infoDiv = document.createElement('div');
        infoDiv.className = 'analysis-info';
        infoDiv.innerHTML = `
            <span class="analysis-item">총합: <b>${analysis.sum}</b></span>
            <span class="analysis-item">홀짝: <b>${analysis.oddEven}</b></span>
            <span class="analysis-item">고저: <b>${analysis.highLow}</b></span>
        `;

        setWrapper.appendChild(setDiv);
        setWrapper.appendChild(actionsDiv);
        setWrapper.appendChild(infoDiv);
        container.appendChild(setWrapper);
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderSavedNumbers();
});
