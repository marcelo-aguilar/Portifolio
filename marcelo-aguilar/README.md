# Marcelo Aguilar · Portfólio

Portfólio pessoal de **Marcelo Aguilar**, estudante de Engenharia de Software no [Inteli](https://www.inteli.edu.br/), em São Paulo.

O tema do site é **"Por dentro"**: a vontade de entender como a tecnologia funciona por dentro. Quem visita desce por camadas de vidro enquanto rola a página, como quem atravessa as camadas de um sistema (tela, lógica e dados), até chegar nos projetos, nas ferramentas e no contato.

> 🇺🇸 **English:** Personal portfolio of Marcelo Aguilar, Software Engineering student at Inteli (São Paulo). A scroll-driven "dive through the layers" hero, project carousels, a hold-to-open interaction and a PT/EN language switch, built with plain HTML, CSS and JavaScript.

---

## Destaques

- **Topo animado pelo scroll.** A imagem de fundo e as placas de vidro se movem conforme a rolagem, com um brilho de "lente" a cada camada atravessada. Rolar para cima volta a animação.
- **Títulos em onda.** As letras dos títulos sobem e descem suavemente, em sequência.
- **Carrossel de projetos.** As telas trocam sozinhas e pausam quando o mouse está em cima. Também dá para navegar pelas setas, pelos pontos ou arrastando no celular.
- **"Segure para abrir".** O visitante segura um botão e um bloco se abre em três camadas, mostrando como eu resolvo problemas.
- **Dois idiomas.** Um botão PT / EN traduz a página inteira, e a escolha fica salva no navegador.
- **Acessível e leve.** Respeita a opção "reduzir animações" do sistema, funciona com o teclado e tem contraste medido em todos os textos. No celular, o topo vira uma imagem estática para carregar rápido.

## Tecnologias

HTML, CSS e JavaScript puros: sem framework, sem etapa de build e sem dependências para instalar.

- Fontes: [Unbounded](https://fonts.google.com/specimen/Unbounded), [Manrope](https://fonts.google.com/specimen/Manrope) e [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono), via Google Fonts
- Ícones das tecnologias: [Devicon](https://devicon.dev/)
- Imagem do topo: gerada com IA no [Higgsfield](https://higgsfield.ai/)

## Estrutura

```
marcelo-aguilar/
├── index.html          # estrutura e conteúdo (texto em português)
├── css/
│   └── style.css       # todo o visual: cores, layout, animações
├── js/
│   └── main.js         # animação do topo, carrossel, idiomas, interações
└── assets/
    ├── hero-layers.jpg      # imagem do topo (computador)
    ├── hero-layers-sm.jpg   # imagem do topo (celular e seção final)
    ├── marcelo-*.jpg        # fotos pessoais
    ├── redbull-*.webp       # telas do projeto Red Bull 24hrs
    ├── barber-*.webp        # telas do projeto Studio Barber
    └── icons/               # ícones das tecnologias
```

## Como rodar localmente

O site abre com dois cliques no `index.html`, mas assim o navegador bloqueia algumas funções. Para ver tudo funcionando, sirva a pasta com um servidor local:

```bash
# com Python
python3 -m http.server 8080

# ou com Node.js
npx http-server -p 8080
```

Depois abra **http://localhost:8080** no navegador.

## Como editar

| Quero mudar... | Onde |
|---|---|
| Textos em português | Direto no `index.html` |
| Textos em inglês | No objeto `EN` dentro de `js/main.js` (cada chave corresponde a um `data-i18n` do HTML) |
| Cores | Nas variáveis do bloco `:root`, no começo do `css/style.css` |
| Telas dos projetos | Troque os arquivos em `assets/` e os `<img>` dentro de cada `.carousel` no HTML |
| Tecnologias | Na seção `#ferramentas` do HTML. O ícone vem de `assets/icons/` |
| Velocidade do carrossel | O valor `4500` (milissegundos) em `js/main.js` |

**Para adicionar um texto traduzível:** coloque `data-i18n="minhaChave"` no elemento do HTML, com o texto em português, e adicione `minhaChave: 'English text'` ao objeto `EN`.

## Publicação

Como o site é só um conjunto de arquivos estáticos, ele funciona em qualquer hospedagem: GitHub Pages, Netlify, Vercel, Hostinger e outras. Antes de publicar, troque as tags `og:image` e `og:url` no `index.html` (marcadas com `DEPLOY STEP`) pelos endereços completos do site no ar. Assim, a prévia aparece certinha quando alguém compartilha o link.

## Contato

- LinkedIn: [linkedin.com/in/marcelo-aguilar-](https://www.linkedin.com/in/marcelo-aguilar-)
- GitHub: [github.com/marcelo-aguilar](https://github.com/marcelo-aguilar)
