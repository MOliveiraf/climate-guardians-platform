# 🌍 Educar para o Clima: Conscientizar Crianças com Atividades Interativas

Projeto educacional interativo desenvolvido para conscientizar crianças (até 11 anos) sobre **mudanças climáticas**, utilizando **uma interface web interativa e elementos físicos com Arduino e LEDs**.

O sistema permite que crianças aprendam sobre ações que **ajudam ou prejudicam o planeta**, visualizando o impacto dessas ações no **estado do planeta representado na interface e nos LEDs físicos**.

---

# 📚 Objetivo do Projeto

O projeto tem como objetivo principal **educar crianças sobre mudanças climáticas de forma lúdica e interativa**, incentivando comportamentos sustentáveis desde cedo.

A proposta é transformar conceitos ambientais em **interações simples**, onde cada ação realizada pela criança altera o **estado do planeta**, permitindo compreender as consequências das atitudes humanas.

---

# 🎯 Público-Alvo

Crianças de até **11 anos de idade**, em ambientes como:

- escolas
- feiras de ciência
- projetos educacionais
- atividades de conscientização ambiental

---

# 🧠 Conceito Educacional

A aplicação apresenta ações do cotidiano, como:

- reciclar lixo
- economizar água
- plantar árvores
- desperdiçar recursos
- poluir o meio ambiente

Cada ação influencia o **nível de saúde do planeta**.

O sistema responde visualmente através de:

- **mudança na interface web**
- **mudança nas cores dos LEDs controlados pelo Arduino**

---

# 🏗️ Arquitetura do Projeto

O projeto é dividido em três partes principais:

```
Interface Web (Frontend)
        ↓
Servidor Backend (API)
        ↓
Arduino + LEDs (Resposta Física)
```

---

# ⚙️ Tecnologias Utilizadas

## Frontend

- HTML
- CSS
- JavaScript

Responsável por:

- interface interativa
- botões de ações
- reprodução de áudios educativos
- comunicação com o backend

---

## Backend

- Node.js
- Express

Responsável por:

- receber ações do frontend
- processar mudanças no estado do planeta
- enviar comandos para o Arduino
- servir arquivos estáticos (áudios)

---

## Hardware

- Arduino
- LEDs

Responsável por representar fisicamente o estado do planeta.

Exemplo de representação:

| Estado do planeta | Cor do LED |
|---|---|
| Saudável | Verde |
| Em risco | Amarelo |
| Crítico | Vermelho |

---

# 🎵 Sistema de Áudio Educativo

O projeto utiliza áudios educativos que são reproduzidos quando a criança interage com os botões.

Os áudios estão armazenados em:

```
backend/public/audios
```

Exemplo de frases:

- "Ótimo! Plantar árvores ajuda o planeta!"
- "Muito bem! Reciclar é importante!"
- "Cuidado! Jogar lixo no chão prejudica a natureza!"

---

# 🌎 Sistema Multilíngue

Os áudios foram preparados em múltiplos idiomas para ampliar o alcance educacional do projeto.

Idiomas suportados:

- Português
- Inglês
- Espanhol
- Francês
- Italiano
- Chinês
- Japonês

Os áudios foram gerados utilizando a plataforma:

https://voicemaker.in

---

# 📁 Estrutura de Pastas

```
project-root
│
├── backend
│   │
│   ├── public
│   │   └── audios
│   │       ├── pt
│   │       ├── en
│   │       ├── es
│   │       ├── fr
│   │       ├── it
│   │       ├── zh
│   │       └── ja
│   │
│   ├── routes
│   ├── controllers
│   ├── services
│   │
│   └── server.js
│
├── frontend
│   ├── css
│   ├── js
│   └── index.html
│
└── README.md
```

---

# 🔁 Fluxo de Funcionamento

1️⃣ A criança acessa a interface web.

2️⃣ Ela clica em uma ação (ex: **plantar árvore**).

3️⃣ O frontend envia a ação para o **backend**.

4️⃣ O backend processa a ação e atualiza o **estado do planeta**.

5️⃣ O backend envia um comando para o **Arduino**.

6️⃣ O Arduino altera a **cor dos LEDs**.

7️⃣ Um **áudio educativo é reproduzido**.

---

# 🚀 Como Executar o Projeto

## 1️⃣ Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

---

## 2️⃣ Entrar na pasta do backend

```bash
cd backend
```

---

## 3️⃣ Instalar as dependências

```bash
npm install
```

---

## 4️⃣ Iniciar o servidor

```bash
npm start
```

O servidor será iniciado em:

```
http://localhost:3000
```

---

# 🧪 Testando o Projeto

1. Abra o navegador
2. Acesse a interface do projeto
3. Clique nos botões de ações
4. Observe:

- reprodução de áudio
- mudança no estado do planeta
- alteração dos LEDs

---

# 🎓 Aplicação Educacional

Este projeto pode ser utilizado em:

- aulas de educação ambiental
- feiras de ciência
- projetos escolares
- atividades interativas de sustentabilidade

Ele promove o aprendizado através de **experiência prática e visual**.

---

# 🔮 Possíveis Melhorias Futuras

Algumas melhorias que podem ser implementadas:

- sistema de pontuação para as crianças
- níveis de dificuldade
- novos cenários ambientais
- mais interações educativas
- dashboard para professores acompanharem os resultados

---

# 👨‍💻 Autor

Projeto desenvolvido por:

**Miqueias d Oliveira**

---

# 📄 Licença

Este projeto é de caráter educacional e pode ser utilizado para fins acadêmicos e de aprendizagem.