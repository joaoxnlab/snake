const canvas = document.getElementById('jogoCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;


const teclasPressionadas: {[key: string]: boolean} = {
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
    cor = '#ffa';

    constructor(x: number, y: number, largura: number, altura: number) {
        super(x, y, largura, altura);
    }
    atualizar() {
        if (teclasPressionadas.KeyW) {
            this.y -= 7;
        } else if (teclasPressionadas.KeyS) {
            this.y += 7;
        } else if (teclasPressionadas.KeyA) {
            this.x -= 7;
        } else if (teclasPressionadas.KeyD) {
            this.x += 7;
        }
    }
    verificarColisao(comida: Entidade) {
        if (
            this.x < comida.x + comida.largura &&
            this.x + this.largura > comida.x &&
            this.y < comida.y + comida.altura &&
            this.y + this.altura > comida.y
        ) {
            this.#houveColisao(comida);
        }
    }
    #houveColisao(comida: Entidade) {
        comida.x = Math.random() * canvas.width - 10;
        comida.y = Math.random() * canvas.height - 10;
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
        super(Math.random() * canvas.width - 10, canvas.height - 10, 20, 20);
    }
}


const cobra = new Cobra(100, 200, 20, 20);
const comida = new Comida();

function gameOver() {
    ctx.fillStyle = 'white';
    ctx.font = 'bold 30px Arial';
    ctx.fillText(`Fim de jogo!`, 10, 40);
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
    
    requestAnimationFrame(loop);
}
loop();