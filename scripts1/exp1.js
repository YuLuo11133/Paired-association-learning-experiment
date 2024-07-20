//1.实验总指导语
const generalInstruction = function() {
    const headtext = "实验指导语";
    const welcometext = "欢迎你来参加我们的实验！";
    const instructiontext = `
        <p>本次实验共两个阶段。</p>
        <p>首先在准备阶段，电脑屏幕会依次向你展示正式实验中所用到的不同颜色小人及其眼睛朝向特征，你无需做出任何按键反应，只需观察即可。</p>
        <p>在准备阶段结束后，将进入正式实验。在正式实验时，准备阶段出现的<span id='keywords'>小人颜色和眼睛朝向</span>会共同组成小人呈现在屏幕上，你需要持续关注小人这两方面特征的变化。这一阶段除了呈现小人外，还会呈现一幅房屋地图，每个小人都对应着房屋地图中的一间房屋。正式实验分为观察任务和选择任务两个部分。在观察部分，你需要观察学习小人和房屋的一一对应关系。在选择任务中，则需要你根据观察在房屋地图中选择小人对应的房屋。观察和选择任务会重复进行5次。最后会有一个测验任务。预计总实验时间为15分钟左右。</p>
        <p>如果你已准备好，请按键盘上的任意键开始实验。</p>
    `;

    document.getElementById("head").innerText = headtext;
    document.getElementById("welcome").innerText = welcometext;
    document.getElementById("instruction").innerHTML = instructiontext;
    document.addEventListener('keydown',hideInstruction);
    //按下键盘上任意键后总指导语界面消失，进入下一阶段
    function hideInstruction() {
        document.getElementById("head").innerText = "";
        document.getElementById("welcome").innerText = "";
        document.getElementById("instruction").innerHTML = "";
        document.removeEventListener('keydown',hideInstruction);
        preparationInstruction();
    };
};

//2.刺激熟悉阶段
    //2.1指导语
const preparationInstruction = function() {
    const headtext2 = "准备阶段";
    const instructiontext2 = `
        <p>在此阶段，电脑屏幕会依次分别向你展示正式实验中所用到的小人颜色及其眼睛朝向特征，你无需做出任何按键反应，但请你注意小人的<span id="keywords">颜色和眼睛朝向角度的变化</span>这两个特征。实验过程中小人会以下图的形式呈现。颜色和眼睛朝向如下图箭头所指。</p>
        <p id="picture"><img src='./image1/instruction1.png'></p>
        <p>如果你已准备好，请按键盘上的任意键开始实验。</p>
        `;
        
    document.getElementById("head").innerText = headtext2;
    document.getElementById("instruction").innerHTML = instructiontext2;
    document.addEventListener('keydown', hideInstruction);

    function hideInstruction() {
        document.getElementById("head").innerText = "";
        document.getElementById("instruction").innerHTML = "";
        document.removeEventListener('keydown', hideInstruction);
        displayImages();
    }
}
    //2.2刺激呈现
const displayImages = function() {
    const images = [
        './image/green.jpg',
        './image/blue.jpg',
        './image/cyan.jpg',
        './image/vertical.jpg',
        './image/horizontal.jpg',
        './image/sloping.jpg'
    ];

        // 刺激顺序随机化
    images.sort(() => Math.random() - 0.5);

    let currentImageIndex = 0;
    const plusElement = document.createElement("div");
    plusElement.className = "centered-plus";
    plusElement.innerText = "+";

    const imgElement = document.createElement("img");
    imgElement.className = "centered-img";
        //刺激呈现（注视点+刺激）
    function showPlusThenImage() {
        if (currentImageIndex >= images.length) {
            observationTrial();
            return;
        }

        document.body.innerHTML = '';
        document.body.appendChild(plusElement);

        setTimeout(() => {
            // Show the image for 1 second after the plus sign
            document.body.innerHTML = '';
            imgElement.src = images[currentImageIndex];
            document.body.appendChild(imgElement);
            currentImageIndex++;
            setTimeout(showPlusThenImage, 1000);
        }, 1000);
    }

    showPlusThenImage();
}

//3.观察小人和房屋刺激配对关系
    //3.1指导语
const observationTrial = function() {
    const headtext3 = "观察任务";
    const instructiontext3 = `
        <p>请你观察屏幕中出现的小人及其在房屋地图中对应的房屋。每一次需要观察的小人会以大图的形式呈现在屏幕左边，余下五个小人则在需观察的小人下以小图的形式呈现，房屋地图则在屏幕右边呈现（小人和房屋地图的呈现方式如下图所示）。在房屋地图中，小人对应的房屋会用黑色方框圈出，然后小人消失，进入下一个小人和房屋的观察。在观察过程中，请注意小人的颜色和眼睛朝向角度的动态变化特征与房屋地图中房屋可能存在的关系。</p>
        <p id="picture"><img src='./image1/instruction2.png'></p>
        <p>如果你已准备好，请按键盘上的任意键开始实验。</p>
    `;
    document.body.innerHTML = ''; // Clear the body content
    const head = document.createElement('h1');
    head.id = "head";
    head.innerText = headtext3;
    document.body.appendChild(head);

    const instruction = document.createElement('div');
    instruction.id = "instruction";
    instruction.innerHTML = instructiontext3;
    document.body.appendChild(instruction);

    document.addEventListener('keydown', hideInstruction);

    function hideInstruction() {
        document.getElementById("head").innerText = "";
        document.getElementById("instruction").innerHTML = "";
        document.removeEventListener('keydown', hideInstruction);
        window.location.href = './html/Exp_Part2.html'; // Redirect to Part2.html
    }
};

generalInstruction();