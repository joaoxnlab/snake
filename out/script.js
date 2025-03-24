"use strict";
const canvas = document.getElementById('jogoCanvas');
const ctx = canvas.getContext('2d');
let pontuacao = 0;
const teclasPressionadas = {
    KeyW: false,
    KeyS: false,
    KeyD: false,
    KeyA: false
};
document.addEventListener('keydown', (e) => {
    for (let tecla in teclasPressionadas) {
        if (teclasPressionadas.hasOwnProperty(e.code)) {
            teclasPressionadas[tecla] = false;
        }
    }
    if (teclasPressionadas.hasOwnProperty(e.code)) {
        teclasPressionadas[e.code] = true;
    }
});
class Entidade {
    x;
    y;
    largura;
    altura;
    cor;
    constructor(x, y, largura, altura, cor) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.cor = cor;
    }
    desenhar() {
        ctx.fillStyle = this.cor ?? 'black';
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
}
class Cobra extends Entidade {
    velocidade = 5;
    cor = '#ffa';
    segmentos = [];
    constructor(x, y, largura, altura) {
        super(x, y, largura, altura);
        this.segmentos.push({ x, y });
    }
    atualizar() {
        // Move cada segmento para a posição do segmento à frente
        for (let i = this.segmentos.length - 1; i > 0; i--) {
            this.segmentos[i] = { ...this.segmentos[i - 1] };
        }
        // Atualiza a posição da cabeça da cobra
        if (teclasPressionadas.KeyW) {
            this.y -= this.velocidade;
        }
        else if (teclasPressionadas.KeyS) {
            this.y += this.velocidade;
        }
        else if (teclasPressionadas.KeyA) {
            this.x -= this.velocidade;
        }
        else if (teclasPressionadas.KeyD) {
            this.x += this.velocidade;
        }
        // Atualiza a posição do primeiro segmento para a nova posição da cabeça
        this.segmentos[0] = { x: this.x, y: this.y };
    }
    desenhar() {
        ctx.fillStyle = this.cor ?? 'black';
        for (const segmento of this.segmentos) {
            ctx.fillRect(segmento.x, segmento.y, this.largura, this.altura);
        }
    }
    verificarColisao(comida) {
        if (this.x < comida.x + comida.largura &&
            this.x + this.largura > comida.x &&
            this.y < comida.y + comida.altura &&
            this.y + this.altura > comida.y) {
            this.#houveColisao(comida);
        }
    }
    #houveColisao(comida) {
        pontuacao++;
        comida.x = Math.random() * (canvas.width - comida.largura);
        comida.y = Math.random() * (canvas.height - comida.altura);
        // Adiciona um novo segmento no final da cobra
        const ultimoSegmento = this.segmentos[this.segmentos.length - 1];
        this.segmentos.push({ x: ultimoSegmento.x, y: ultimoSegmento.y });
    }
    dentroDoCanvas() {
        return this.x >= 0 &&
            this.x + this.largura <= canvas.width &&
            this.y >= 0 &&
            this.y + this.altura <= canvas.height;
    }
}
class Comida extends Entidade {
    cor = '#f33';
    constructor() {
        super(Math.random() * (canvas.width - 20), Math.random() * (canvas.height - 20), 20, 20);
    }
}
const cobra = new Cobra(100, 200, 20, 20);
const comida = new Comida();
function gameOver() {
    ctx.fillStyle = 'white';
    ctx.font = 'bold 30px Arial';
    ctx.fillText(`Fim de jogo! Pontuação final: ${pontuacao}`, 10, 40);
}
function escreverPontuacao() {
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px Arial';
    ctx.fillText(`Pontuação: ${pontuacao}`, 10, 30);
}
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cobra.desenhar();
    cobra.atualizar();
    comida.desenhar();
    cobra.verificarColisao(comida);
    if (!cobra.dentroDoCanvas()) {
        gameOver();
        return;
    }
    escreverPontuacao();
    requestAnimationFrame(loop);
}
loop();
//# sourceMappingURL=script.js.map