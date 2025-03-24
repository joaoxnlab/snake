# Jogo da Cobra

Este é um simples jogo da cobra desenvolvido em TypeScript. O objetivo do jogo é controlar a cobra para comer a comida que aparece aleatoriamente no canvas, fazendo com que a cobra cresça. O jogo termina se a cobra colidir com as bordas do canvas ou com ela mesma.

## Estrutura do Projeto

- **src**: Contém o código-fonte do projeto.
  - `index.html`: Arquivo HTML que carrega o jogo.
  - `script.ts`: Código TypeScript que implementa a lógica do jogo.
  - `style.css`: Estilos CSS para o jogo.

- **out**: Contém o arquivo JavaScript compilado e o mapa de origem.

## Rodando o Projeto

O projeto já está pronto para rodar, sem nenhuma configuração adicional necessária.

1. Clone ou baixe o projeto;
2. Rode o arquivo `/src/index.html`;
3. Divirta-se!

## Como Jogar

1. Use as teclas de seta ou as teclas W, A, S, D para mover a cobra.
2. Coma a comida para ganhar pontos e aumentar o tamanho da cobra.
3. Evite colidir com as bordas do canvas ou com o corpo da cobra.

![](/src/assets/screenshot.png)

## Configuração do Ambiente

Para preparar o ambiente de desenvolvimento, siga os passos abaixo.

1. Certifique-se de ter o Node.js e o npm instalados em sua máquina.
2. Instale o TypeScript, se ainda não estiver instalado:
   ```bash
   npm install -D typescript
3. (Opcional) Coloque o compilador em watch para compilar automaticamente a cada alteração:
   ```bash
   npx tsc --watch