const video = document.getElementById('video');
const mirrorContainer = document.getElementById('mirrorContainer');
const videoOverlay = document.getElementById('videoOverlay');
const controlsContainer = document.getElementById('controlsContainer');
const advicePanel = document.getElementById('advicePanel');
const startBtn = document.getElementById('start-camera-btn');
const adviceTitle = document.getElementById('adviceTitle');
const adviceText = document.getElementById('adviceText');
const colorSwatches = document.querySelectorAll('.color-swatch'); // Seleciona as bolinhas

// Banco de Dados Completo (Dicas + Cores)
const adviceData = {
    day: {
        title: "Maquiagem para o Dia",
        text: "Luz natural pede leveza. Use tons nude, rosados e pêssego. Evite contornos pesados.",
        overlay: "rgba(255, 255, 255, 0)",
        className: "mode-day",
        accent: "#00d2ff",
        // Nude claro, Rosa bebê, Pêssego, Marrom suave, Gloss incolor/brilho
        palette: ["#F5D0C5", "#FFB7B2", "#FFDAC1", "#B08d74", "#FFE4E1"]
    },
    night: {
        title: "Maquiagem Noturna",
        text: "A noite permite ousadia. Aposte no vermelho clássico, vinho, dourado e preto esfumado.",
        overlay: "rgba(0, 0, 50, 0.2)",
        className: "mode-night",
        accent: "#4a5eff",
        // Vermelho intenso, Vinho, Dourado, Preto, Roxo escuro
        palette: ["#D80032", "#590d22", "#FFD700", "#1A1A1A", "#4B0082"]
    },
    sunset: {
        title: "Golden Hour (Tarde)",
        text: "Tons quentes brilham aqui. Use terracota, bronze, laranja queimado e iluminador dourado.",
        overlay: "rgba(255, 140, 0, 0.15)",
        className: "mode-sunset",
        accent: "#ff8c00",
        // Laranja queimado, Bronze, Terracota, Marrom quente, Coral
        palette: ["#CC5500", "#CD7F32", "#E2725B", "#8B4513", "#FF7F50"]
    },
    studio: {
        title: "Luz de Estúdio",
        text: "Para fotos, use acabamento matte. Tons de marrom neutro, malva e bege funcionam melhor.",
        overlay: "rgba(255, 255, 255, 0.05)",
        className: "mode-studio",
        accent: "#fff",
        // Bege matte, Marrom café, Malva (Mauve), Nude acinzentado, Rosa antigo
        palette: ["#D2B48C", "#6F4E37", "#E0B0FF", "#BC987E", "#C08081"]
    }
};

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        
        startBtn.classList.add('hidden');
        mirrorContainer.classList.remove('hidden');
        controlsContainer.classList.remove('hidden');
        advicePanel.classList.remove('hidden');
        
        video.onloadedmetadata = () => { video.style.opacity = 1; };

        // Inicia no modo Dia
        const firstBtn = document.querySelector('.btn-mode');
        if(firstBtn) setMode('day', firstBtn);

    } catch (err) {
        alert("Precisamos de acesso à câmera para o espelho funcionar!");
    }
}

function setMode(mode, btnElement) {
    const data = adviceData[mode];

    // 1. Botões
    document.querySelectorAll('.btn-mode').forEach(btn => btn.classList.remove('active'));
    if(btnElement) btnElement.classList.add('active');

    // 2. Luzes e Overlay
    mirrorContainer.className = `mirror-container ${data.className}`;
    videoOverlay.style.background = data.overlay;

    // 3. Texto
    adviceTitle.innerText = data.title;
    adviceText.innerText = data.text;
    document.documentElement.style.setProperty('--accent-color', data.accent);

    // 4. ATUALIZAR PALETA DE CORES
    // Passamos por cada bolinha e atribuímos a cor correspondente do array
    colorSwatches.forEach((swatch, index) => {
        if(data.palette[index]) {
            swatch.style.backgroundColor = data.palette[index];
            // Opcional: Adicionar um título (tooltip) se passar o mouse
            swatch.title = data.palette[index]; 
        }
    });
}