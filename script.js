// 全局变量
let petalInterval;
const flowerData = {
    lotus: {
        name: "荷花",
        meaning: "纯洁 · 坚韧",
        story: "荷花生长于淤泥之中，却能开出洁净美丽的花朵，正如妈妈您生活中始终保持善良正直的品质。记得小时候家里遇到困难，您总是默默承受压力，却依然教导我们要保持乐观和真诚。您的坚韧就像荷花的根茎，深深扎根，支撑着整个家庭。"
    },
    ziwei: {
        name: "紫薇花",
        meaning: "好运 · 祝福",
        story: "号称'紫薇花开百日红'，紫薇花的花期很长，寓意着长久的快乐。妈妈您总是用乐观的态度面对生活，即使是平凡的日子也能过得有滋有味。记得您总能把简单的饭菜做得香甜可口，把普通的房间打理得温馨舒适，您的乐观就像紫薇花一样，给我们带来长久的温暖。"
    },
    tanhua: {
        name: "昙花",
        meaning: "珍贵 · 瞬间",
        story: "昙花只在夜间短暂开放，却留下永恒的美丽。生活中那些与您相处的短暂瞬间，同样珍贵难忘。记得小时候生病发烧，您整夜不睡觉地照顾我，用温水擦拭我的额头；记得第一次离开家去远方上学，您偷偷抹眼泪却还笑着鼓励我。这些短暂的瞬间，都已成为我心中最温暖的记忆。"
    }
};

const memories = [
    {
        title: "我的生日",
        description: "每次我过生日，无论我身处何处，您总是用生日蛋糕招待我，用生日礼物祝福我。",
        flower: "lotus"
    },
    {
        title: "第一次做饭",
        description: "我第一次做饭给您吃，虽然味道一般，您却吃得津津有味，说这是最好吃的一顿饭。",
        flower: "ziwei"
    },
    {
        title: "深夜的灯光",
        description: "高中晚自习回家，总能看到家里亮着一盏灯，您总是在等我回来才睡。",
        flower: "tanhua"
    }
];

const blessingText = "荷花说'愿你如我般纯洁坦荡'，紫薇花道'愿好运常伴你左右'，昙花轻声告诉你'珍贵的瞬间就是永恒'。所有的花与我一同祝愿妈妈：生日快乐，岁岁无忧，健康长寿，笑口常开！";

// DOM元素加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化花瓣飘落
    initPetals();
    // 初始化欢迎页文字动画
    initWelcomeText();
    // 绑定按钮事件
    bindEvents();
    // 初始化回忆板块
    initMemories();
    // 初始化祝福文字
    initBlessing();
    // 初始化彩蛋
    initEasterEgg();
    initScatteredImageCarousel(); // 替换之前的initImageStack()
});

// 初始化花瓣飘落效果
function initPetals() {
    const container = document.getElementById('petal-container');
    const petalTypes = ['🌸', '💮', '🌼', '🌺'];
    const colors = ['#ffccd5', '#f8b4d9', '#e1bee7', '#c8e6c9'];
    const sizes = ['1rem', '1.5rem', '2rem', '0.8rem'];

    // 清除之前的花瓣
    container.innerHTML = '';

    // 创建花瓣
    for(let i = 0; i < 30; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = petalTypes[Math.floor(Math.random() * petalTypes.length)];
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.fontSize = sizes[Math.floor(Math.random() * sizes.length)];
        petal.style.color = colors[Math.floor(Math.random() * colors.length)];
        petal.style.animation = `fallingPetals ${5 + Math.random() * 10}s linear ${Math.random() * 5}s infinite`;
        container.appendChild(petal);
    }
}

// 初始化欢迎页文字动画
function initWelcomeText() {
    const title = document.getElementById('welcome-title');
    const text = '祝王女士生日快乐ヾ|｡・∀・｡|ﾉ""';
    let index = 0;

    // 文字逐个显示
    const interval = setInterval(() => {
        if(index < text.length) {
            title.textContent += text[index];
            title.style.opacity = 1;
            index++;
        } else {
            clearInterval(interval);
        }
    }, 300);
}

// 绑定事件
function bindEvents() {
    // 开始按钮点击事件
    const startButton = document.getElementById('start-button');
    startButton.addEventListener('click', function() {
        // 花苞绽放动画
        const bloomElement = this.querySelector('.card-back');
        bloomElement.style.animation = 'bloom 1s forwards';
    
        // 播放背景音乐 - 修改为无论音频是否播放都执行页面跳转
        const music = document.getElementById('background-music');
        music.play().catch(e => {
            console.log('音频播放需要用户交互，将继续执行页面跳转');
        });
    
        // 1秒后切换到主内容（原2秒，加快跳转体验）
        setTimeout(() => {
            document.getElementById('welcome-page').style.display = 'none';
            document.getElementById('main-content').classList.remove('hidden');
            // 显示返回顶部按钮
            document.getElementById('back-to-top').style.opacity = 1;
        }, 1000);
    });

    // 花卉卡片点击事件
    document.querySelectorAll('.flower-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if(e.target.closest('.close-card')) return;
            if(e.target.tagName === 'BUTTON' || e.target.parentElement.tagName === 'BUTTON') {
                this.classList.add('active');
                const flowerType = this.dataset.flower;
                const storyContent = this.querySelector('.story-content');
                storyContent.innerHTML = '';
                // 打字机效果显示故事
                typeWriter(flowerData[flowerType].story, storyContent);
            }
        });
    });

    // 关闭卡片按钮事件
    document.querySelectorAll('.close-card').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            this.closest('.flower-card').classList.remove('active');
        });
    });

    // 返回顶部按钮事件
    document.getElementById('back-to-top').addEventListener('click', function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });

    // 监听滚动事件，添加卡片晃动效果
    window.addEventListener('scroll', function() {
        if(window.scrollY > 100) {
            document.body.classList.add('scrolling');
        } else {
            document.body.classList.remove('scrolling');
        }
    });
}

// 打字机效果
function typeWriter(text, element) {
    let i = 0;
    element.innerHTML = '';
    const interval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, 30);
}

// 初始化回忆板块
function initMemories() {
    const container = document.getElementById('memories-container');
    memories.forEach((memory, index) => {
        const memoryCard = document.createElement('div');
        memoryCard.className = 'bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl';
        memoryCard.innerHTML = `
            <div class="text-4xl mb-4">${memory.flower === 'lotus' ? '🌸' : memory.flower === 'ziwei' ? '💮' : '🌼'}</div>
            <h3 class="text-xl font-bold text-pink-600 mb-2">${memory.title}</h3>
            <p class="text-gray-700">${memory.description}</p>
        `;
        container.appendChild(memoryCard);
    });
}

// 初始化祝福文字
function initBlessing() {
    const container = document.getElementById('blessing-content');
    container.innerHTML = `<div class="blessing-scroll">${blessingText}</div>`;
}

// 初始化彩蛋功能
function initEasterEgg() {
    // 隐藏的祝福按钮（在荷花图片上）
    const hiddenButton = document.createElement('button');
    hiddenButton.className = 'absolute top-1/4 left-1/4 w-16 h-16 rounded-full opacity-0 hover:opacity-30 transition-opacity';
    hiddenButton.style.backgroundColor = 'rgba(255,255,255,0.1)';
    hiddenButton.addEventListener('click', function() {
        alert('妈妈，我爱你！在实际项目中，这里会显示您与妈妈的合照并播放语音。');
    });
    document.querySelector('[data-flower="lotus"] img').parentElement.appendChild(hiddenButton);
}

// 返回顶部按钮显示控制
window.addEventListener('scroll', function() {
    const backToTopButton = document.getElementById('back-to-top');
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('opacity-100');
        backToTopButton.classList.remove('opacity-0');
    } else {
        backToTopButton.classList.add('opacity-0');
        backToTopButton.classList.remove('opacity-100');
    }
});

// 初始化图片堆叠效果
function initScatteredImageCarousel() {
    const container = document.getElementById('image-stack-container');
    const controlsContainer = document.getElementById('carousel-controls');
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.getElementById('close-modal');
    const messageElement = document.getElementById('blessing-message');
    const imageCount = 6; // 祝福图片数量
    let currentIndex = 0;
    let carouselInterval;
    const images = [];
    const positions = [];
    
    // 生成随机位置 - 对齐文字水平线
    function generateRandomPositions(count, containerWidth, containerHeight) {
        const positions = [];
        const containerPadding = 40; // 容器内边距
        const minPercent = 25; // 最小宽度百分比
        const maxPercent = 45; // 最大宽度百分比
        const verticalVariance = 40; // 垂直方向允许的最大偏移量
        
        // 获取祝福文字元素
        const blessingElement = document.getElementById('blessing-message');
        const blessingRect = blessingElement.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // 计算相对于容器的文字垂直中心位置
        const textVerticalCenter = (blessingRect.top + blessingRect.bottom) / 2 - containerRect.top;
        
        for (let i = 0; i < count; i++) {
            // 基于容器宽度的百分比计算图片宽度
            const widthPercent = Math.floor(Math.random() * (maxPercent - minPercent + 1)) + minPercent;
            const width = (containerWidth - containerPadding) * (widthPercent / 100);
            const height = Math.floor(width * 1.2); // 保持宽高比
            
            // 水平方向分散分布
            const maxX = containerWidth - containerPadding - width;
            const x = Math.floor(Math.random() * maxX) + containerPadding/2;
            
            // 垂直方向与文字中心对齐，允许小范围偏移
            const y = Math.floor(textVerticalCenter - height/2 + (Math.random() * verticalVariance * 2 - verticalVariance));
            
            // 随机旋转角度 (-10 到 10 度)
            const rotation = (Math.random() * 20) - 10;
            
            // 随机z-index
            const zIndex = Math.floor(Math.random() * 10) + 1;
            
            positions.push({x, y, width, height, rotation, zIndex});
        }
        return positions;
    }
    
    // 初始化图片位置
    function initImagePositions() {
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight || 600; // 最小高度
        return generateRandomPositions(imageCount, containerWidth, containerHeight);
    }
    
    // 创建图片元素
    function createImageElements() {
        positions.forEach((pos, i) => {
            const img = document.createElement('img');
            img.src = `assets/bless/bg${i+1}.jpg`;
            img.alt = `美好回忆 ${i+1}`;
            img.className = 'scattered-image';
            img.dataset.index = i;
            img.dataset.originalZIndex = pos.zIndex; // 保存原始z-index
            
            // 设置初始位置和样式
            img.style.width = `${pos.width}px`;
            img.style.height = `${pos.height}px`;
            img.style.left = `${pos.x}px`;
            img.style.top = `${pos.y}px`;
            img.style.transform = `rotate(${pos.rotation}deg)`;
            img.style.zIndex = pos.zIndex;
            img.style.opacity = 1;
            
            // 点击放大查看
            img.addEventListener('click', function(e) {
                e.stopPropagation();
                modalImage.src = this.src;
                modal.classList.add('active');
                pauseCarousel();
            });
            
            container.appendChild(img);
            images.push(img);
        });
    }
    
    // 创建控制按钮
    function createControlButtons() {
        for (let i = 0; i < imageCount; i++) {
            const btn = document.createElement('div');
            btn.className = `control-btn ${i === currentIndex ? 'active' : ''}`;
            btn.dataset.index = i;
            
            btn.addEventListener('click', function() {
                goToImage(parseInt(this.dataset.index));
            });
            
            controlsContainer.appendChild(btn);
        }
    }
    
    // 切换到指定图片
    function goToImage(index) {
        // 移除之前的激活状态
        images[currentIndex].classList.remove('active');
        document.querySelectorAll('.control-btn')[currentIndex].classList.remove('active');
        
        // 更新当前索引
        currentIndex = index;
        
        // 添加新的激活状态
        images[currentIndex].classList.add('active');
        document.querySelectorAll('.control-btn')[currentIndex].classList.add('active');
    }
    
    // 下一张图片
    // 修改nextImage函数实现循环轮播
    function nextImage() {
        // 移除之前的激活状态
        if(images[currentIndex]) {
            images[currentIndex].classList.remove('active');
            images[currentIndex].style.zIndex = images[currentIndex].dataset.originalZIndex;
        }
        
        // 更新当前索引 - 实现循环
        currentIndex = (currentIndex + 1) % imageCount;
        
        // 特殊处理：当循环到第一张图片时
        if(currentIndex === 0) {
            // 显示祝福信息（每完整轮播一次显示一次祝福）
            showBlessingMessage();
            return;
        }
        
        // 添加新激活状态
        goToImage(currentIndex);
    }
    
    // 修改showBlessingMessage函数，仅显示祝福不重建图片
    function showBlessingMessage() {
        pauseCarousel();
        
        // 隐藏所有图片（添加淡出动画）
        images.forEach(img => {
            img.style.transition = 'opacity .5s ease';
            img.style.opacity = 0;
        });
        
        // 显示祝福文字
        setTimeout(() => {
            messageElement.style.opacity = .9;
            // 添加花瓣效果
            initPetals();
            
            // 3秒后隐藏祝福并继续轮播
            setTimeout(() => {
                messageElement.style.opacity = 0;
                
                // 恢复所有图片显示
                images.forEach(img => {
                    img.style.opacity = 1;
                });
                
                // 从第一张图片开始轮播
                currentIndex = 0;
                goToImage(currentIndex);
                startCarousel();
            }, document.body.clientWidth < 768 ? 2000 : 3000); // 祝福显示时间
        }, 500); // 淡出动画时间
    }
    
    // 修改初始化函数，移除重复创建逻辑
    function initScatteredImageCarousel() {
        const container = document.getElementById('image-stack-container');
        const controlsContainer = document.getElementById('carousel-controls');
        const modal = document.getElementById('image-modal');
        const modalImage = document.getElementById('modal-image');
        const closeModal = document.getElementById('close-modal');
        const messageElement = document.getElementById('blessing-message');
        const imageCount = 6; // 祝福图片数量
        let currentIndex = 0;
        let carouselInterval;
        const images = [];
        let positions;
        
        // 初始化位置和创建元素（仅执行一次）
        positions = initImagePositions();
        createImageElements();
        createControlButtons();
        
        // 开始轮播
        startCarousel();
        
        // ... 保留其他事件监听代码 ...
    }
    
    // 添加轮播启动函数
    function startCarousel() {
        carouselInterval = setInterval(nextImage, 3000);
    }
    
    // 暂停轮播
    function pauseCarousel() {
        clearInterval(carouselInterval);
    }
    
    // 初始化
    positions.push(...initImagePositions());
    createImageElements();
    createControlButtons();
    
    // 开始轮播
    startCarousel();
    
    // 点击模态框关闭
    closeModal.addEventListener('click', function() {
        modal.classList.remove('active');
        startCarousel();
    });
    
    // 点击模态框背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            startCarousel();
        }
    });
    // 添加窗口大小变化监听，确保响应式对齐
    window.addEventListener('resize', function() {
        // 清除现有图片
        container.innerHTML = '';
        images = [];
        // 重新初始化位置和图片
        positions = initImagePositions();
        createImageElements();
        // 保持当前显示的图片
        if(currentIndex < images.length) {
            goToImage(currentIndex);
        }
    });
}

// DOM元素加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    initScatteredImageCarousel(); // 替换之前的initImageStack()
    // ... existing code ...
});