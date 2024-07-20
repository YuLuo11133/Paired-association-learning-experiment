// 定义小人的图片路径
const characters = ["./image2/g1.png", "./image2/g2.png", "./image2/g3.png", "./image2/b1.png", "./image2/b2.png", "./image2/c.png"];
// 定义房屋在网格地图中的位置，使用[row, col]格式
const housePositions = [[1, 1], [6, 1], [3, 1], [1, 6], [3, 6], [1, 3]];
//定义观察、选择试验的总次数
const totalObservationTrials = 12;
const totalSelectionTrials = 6;
//定义每个观察试次的持续时间（毫秒）
const trialDuration = 4000; // 4000ms
//定义注视点持续时间（毫秒）
const messageDuration = 1000; // 1000ms
//定义选择反馈持续时间（毫秒）
const feedbackDuration = 1500; // 1500ms
//获取html元素的引用
const P1 = document.getElementById('P1');
const P2 = document.getElementById('P2');
const P3 = document.getElementById('P3');
const P4 = document.getElementById('P4');
const P5 = document.getElementById('P5');
const P6 = document.getElementById('P6');
const P7 = document.getElementById('P7');
const S1 = document.getElementById('S1');
const S2 = document.getElementById('S2');
const S3 = document.getElementById('S3');
const S4 = document.getElementById('S4');
const S5 = document.getElementById('S5');
const S6 = document.getElementById('S6');
const S7 = document.getElementById('S7');
const feedback = document.getElementById('feedback');
const message = document.getElementById('message');
const content = document.getElementById('content');
const observationContent = document.getElementById('observation-content');
const selectionContent = document.getElementById('selection-content');

let remainingCharacters = shuffle([...characters]);
let observationTrialsCompleted = 0;
let selectionTrialsCompleted = 0;
let currentCharacter;
let selectionMode = false;
let selectionData = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//观察阶段高亮小人对应的房屋位置
function highlightHouse(character) {
    const index = characters.indexOf(character);
    const [row, col] = housePositions[index];
    const cell = P7.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    if (cell) {
        cell.classList.add('highlight');
    }
}

//选择阶段被试选择错误后高亮小人对应的正确位置的房屋
function highlightCorrectHouse(character) {
    const index = characters.indexOf(character);
    const [row, col] = housePositions[index];
    const cell = S7.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    if (cell) {
        cell.classList.add('correct-highlight');
    }
}

//清除观察阶段高亮
function clearHighlight() {
    const highlightedCells = P7.querySelectorAll('.highlight');
    highlightedCells.forEach(cell => cell.classList.remove('highlight'));
}

//清除选择阶段反馈高亮
function clearCorrectHighlight() {
    const highlightedCells = S7.querySelectorAll('.correct-highlight');
    highlightedCells.forEach(cell => cell.classList.remove('correct-highlight'));
}

//小人和房屋配对
function displayCharacters(mode) {
    if (remainingCharacters.length === 0) {
        remainingCharacters = shuffle([...characters]);
    }

    currentCharacter = remainingCharacters.shift();
    const otherCharacters = shuffle([...characters.filter(c => c !== currentCharacter)]);
    const allCharacters = [currentCharacter, ...otherCharacters];

    const P1 = mode === 'observation' ? document.getElementById('P1') : document.getElementById('S1');
    const P2 = mode === 'observation' ? document.getElementById('P2') : document.getElementById('S2');
    const P3 = mode === 'observation' ? document.getElementById('P3') : document.getElementById('S3');
    const P4 = mode === 'observation' ? document.getElementById('P4') : document.getElementById('S4');
    const P5 = mode === 'observation' ? document.getElementById('P5') : document.getElementById('S5');
    const P6 = mode === 'observation' ? document.getElementById('P6') : document.getElementById('S6');

    P1.innerHTML = `<img src="${currentCharacter}" alt="${currentCharacter}" class="p1-image">`;
    P2.innerHTML = `<img src="${allCharacters[1]}" alt="${allCharacters[1]}" width="60" height="60">`;
    P3.innerHTML = `<img src="${allCharacters[2]}" alt="${allCharacters[2]}" width="60" height="60">`;
    P4.innerHTML = `<img src="${allCharacters[3]}" alt="${allCharacters[3]}" width="60" height="60">`;
    P5.innerHTML = `<img src="${allCharacters[4]}" alt="${allCharacters[4]}" width="60" height="60">`;
    P6.innerHTML = `<img src="${allCharacters[5]}" alt="${allCharacters[5]}" width="60" height="60">`;

    clearHighlight();
    if (mode === 'observation') {
        highlightHouse(currentCharacter);
    }
}

//创建房屋地图网格
function createGrid(mode) {
    const P7 = mode === 'observation' ? document.getElementById('P7') : document.getElementById('S7');
    for (let row = 1; row <= 6; row++) {
        for (let col = 1; col <= 6; col++) {
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item';
            gridItem.dataset.row = row;
            gridItem.dataset.col = col;

            const houseIndex = housePositions.findIndex(pos => pos[0] === row && pos[1] === col);
            if (houseIndex !== -1) {
                const houseImg = document.createElement('img');
                houseImg.src = './image2/house.png';
                houseImg.className = 'house';
                gridItem.appendChild(houseImg);
            }

            P7.appendChild(gridItem);
        }
    }
}
//3.2小人和房屋配对关系呈现
function runObservationTrial() {
    observationContent.style.visibility = 'hidden';
    message.style.visibility = 'visible';
    setTimeout(() => {
        message.style.visibility = 'hidden';
        observationContent.style.visibility = 'visible';
        displayCharacters('observation');
        observationTrialsCompleted++;
        if (observationTrialsCompleted <= totalObservationTrials) {
            setTimeout(runObservationTrial, trialDuration);
        } else {
            message.style.visibility = 'hidden';
            observationContent.style.display = 'none';
            SelectInstruction();
            return;
            
        }
    }, messageDuration);
}
//4.小人和房屋对应关系选择
    //4.1指导语
const SelectInstruction = function() {
    const headtext4 = "选择任务";
    const instructiontext4 = `
        <p>学习任务结束。接下来请你根据之前的观察，用鼠标为出现的小人选择其在房屋地图中对应的房屋。请根据你的直觉尽快作出反应。每次选择结束后都会提供正确与否的反馈，并向你提供正确答案（正确房屋位置会用黑色方框框出）。</p>
        <p>如果你已准备好，请按键盘上的任意键开始实验。</p>
        `;
    
        document.getElementById("head").innerText = headtext4;
        document.getElementById("instruction").innerHTML = instructiontext4;
        document.addEventListener('keydown', hideInstruction);

        function hideInstruction() {
            document.getElementById("head").innerText = "";
            document.getElementById("instruction").innerHTML = "";
            document.removeEventListener('keydown', hideInstruction);
            startSelectionTask();
    }
}
    //4.2开始选择任务
function startSelectionTask() {
    selectionMode = true;
    observationContent.style.display = 'none';
    selectionContent.style.display = 'flex';
    runSelectionTrial();
}
    //运行选择试验
function runSelectionTrial() {
    selectionContent.style.visibility = 'hidden';
    message.style.visibility = 'visible';
    setTimeout(() => {
        message.style.visibility = 'hidden';
        selectionContent.style.visibility = 'visible';
        displayCharacters('selection');
        addGridEventListeners();
    }, messageDuration);
}
    //添加网格地图事件监听器
function addGridEventListeners() {
    S7.querySelectorAll('.grid-item').forEach(cell => {
        cell.addEventListener('click', handleGridItemClick);
    });
}

    //对被试在网格地图中点击选择的房屋提供正确与否的反馈
function handleGridItemClick(event) {
    const cell = event.currentTarget;
    const selectedRow = parseInt(cell.dataset.row);
    const selectedCol = parseInt(cell.dataset.col);
    const correctIndex = characters.indexOf(currentCharacter);
    const [correctRow, correctCol] = housePositions[correctIndex];

    const choice = { character: currentCharacter, selectedRow, selectedCol };

    if (selectedRow === correctRow && selectedCol === correctCol) {
        feedback.textContent = "选择正确";
        choice.correct = true;
    } else {
        feedback.textContent = "选择错误";
        highlightCorrectHouse(currentCharacter);
        choice.correct = false;
        setTimeout(() => {
            clearCorrectHighlight();
            feedback.textContent = "";
            proceedToNextTrial();
        }, feedbackDuration);
        selectionData.push(choice);
        return;
    }

    setTimeout(() => {
        feedback.textContent = "";
        proceedToNextTrial();
    }, feedbackDuration);

    selectionData.push(choice);
}

function proceedToNextTrial() {
    selectionTrialsCompleted++;
    if (selectionTrialsCompleted < totalSelectionTrials) {
        runSelectionTrial();
    } else {
        // 选择任务结束，可以进行其他处理
        console.log("选择任务结束");
        console.log("选择数据：", selectionData);
        endInstruction();
    }
}

//5.实验结束
function endInstruction() {
    content.innerHTML = ''; // 清空所有内容
    const endMessage = document.createElement('div');
    endMessage.textContent = '实验结束，感谢你的参与！';
    endMessage.style.fontSize = '50px';
    endMessage.style.textAlign = 'center';
    endMessage.style.fontFamilt = '宋体';
    content.appendChild(endMessage);
}

//初始化观察和选择任务中的网格地图
createGrid('observation');
createGrid('selection');
//开始观察试验
runObservationTrial();