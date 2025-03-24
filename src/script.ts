const canvas = document.getElementById('jogoCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

let pontuacao = 0;


const teclasPressionadas: {[key: string]: boolean} = {
    KeyW: false,
    KeyS: false,
    KeyD: false,
    KeyA: false
};

const opostoMap: {[key: string]: string} = {
    KeyW: 'KeyS',
    KeyS: 'KeyW',
    KeyD: 'KeyA',
    KeyA: 'KeyD'
}


document.addEventListener('keydown', (e) => {
    if (teclasPressionadas[opostoMap[e.code]]) return;

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
    x: number;
    y: number;
    largura: number;
    altura: number;
    cor?: string;

    constructor(x: number, y: number, largura: number, altura: number, cor?: string) {
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
    readonly velocidade = 5;
    cor = '#ffa';
    segmentos: { x: number, y: number }[] = [];

    constructor(x: number, y: number, largura: number, altura: number) {
        super(x, y, largura, altura);
        this.segmentos.push({ x, y });
    }

    atualizar() {
        for (let i = this.segmentos.length - 1; i > 0; i--)
            this.segmentos[i] = { ...this.segmentos[i - 1] };

        if (teclasPressionadas.KeyW)
            this.y -= this.velocidade;
        else if (teclasPressionadas.KeyS)
            this.y += this.velocidade;
        else if (teclasPressionadas.KeyA)
            this.x -= this.velocidade;
        else if (teclasPressionadas.KeyD)
            this.x += this.velocidade;

        this.segmentos[0] = { x: this.x, y: this.y };
    }

    desenhar() {
        ctx.fillStyle = this.cor ?? 'black';
        for (const segmento of this.segmentos) {
            ctx.fillRect(segmento.x, segmento.y, this.largura, this.altura);
        }
    }
    verificarSeComeu(comida: Entidade) {
        if (
            this.x < comida.x + comida.largura &&
            this.x + this.largura > comida.x &&
            this.y < comida.y + comida.altura &&
            this.y + this.altura > comida.y
        ) {
            this.houveColisao(comida);
        }
    }

    private houveColisao(comida: Entidade) {
        pontuacao++;
        comida.x = Math.random() * (canvas.width - comida.largura);
        comida.y = Math.random() * (canvas.height - comida.altura);

        const ultimoSegmento = this.segmentos[this.segmentos.length - 1];
        this.segmentos.push({ x: ultimoSegmento.x-1, y: ultimoSegmento.y-1});
    }

    colidiuEmSiMesmo(): boolean {
        for (let i = 1; i < this.segmentos.length; i++)
            if (this.x === this.segmentos[i].x && this.y === this.segmentos[i].y)
                return true;
        
        return false;
    }

    dentroDoCanvas(): boolean {
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
    cobra.verificarSeComeu(comida);

    if (!cobra.dentroDoCanvas() || cobra.colidiuEmSiMesmo()) {
        gameOver();
        return;
    }
    escreverPontuacao();

    requestAnimationFrame(loop);
}
loop();