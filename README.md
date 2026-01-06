# 🌿 Grimório Frieren: Galeria de Imagens TCG 

> "A magia é o mundo da imaginação." — Frieren

![Status do Projeto](https://img.shields.io/badge/Status-Finalizado-green)
![Tech Stack](https://img.shields.io/badge/Tech_Stack-HTML5_|_CSS3_|_JavaScript-blue)

## 📖 Sobre o Projeto

O **Grimório Frieren** é uma aplicação web interativa que consome dados de API para transformar os personagens do anime/mangá *Frieren: Beyond Journey's End* em cartas colecionáveis (TCG).

O objetivo foi criar uma interface que unisse **design imersivo** (inspirado na estética "cozy" e naturalista da obra) com **lógica de manipulação de dados**, criando stats de RPG (Mana, Ataque, Defesa) para cada personagem.

---

## 🔗 Link do Projeto (Live Preview)

Acesse a aplicação a funcionar aqui:
👉 **[Grimório Frieren TCG - Live App](https://lariscalzaretto.github.io/frieren-tgc-galeriaDeFotos/)**

---

## 🎨 Design & UI

Como designer em transição para tecnologia, o foco visual foi criar uma atmosfera etérea:
* **Paleta de Cores:** Tons de verde, azul céu e dourado para evocar a natureza e magia.
* **Glassmorphism:** Uso de transparências nos cards e painéis para modernidade.
* **Responsividade:** Layout fluido utilizando CSS Grid e Flexbox.

## 🚀 Funcionalidades

* **Consumo de API:** Integração com a [Jikan API](https://jikan.moe/) (Base de dados do MyAnimeList).
* **Enriquecimento de Dados:** Script personalizado que intercepta os dados da API e injeta uma "Lore" customizada (Stats de RPG e descrições detalhadas) que não existem na API original.
* **Filtros Dinâmicos:** Filtragem em tempo real por Classe (Ataque, Defesa, Suporte) e Busca por Nome.
* **Tratamento de Erros:** Fallback visual para imagens não encontradas ou falha na API.

## 🛠️ Tecnologias Utilizadas

* **HTML5 Semântico**
* **CSS3** (Variáveis, Gradients, Grid Layout, Media Queries)
* **JavaScript (ES6+)**
    * `fetch` API & `async/await`
    * Manipulação do DOM
    * Array Methods (`map`, `filter`, `forEach`)

---

## 🧩 Trecho de Código Destacado

A lógica principal une os dados "crus" da API com um objeto de configuração manual (`customLore`), permitindo que personagens principais tenham descrições fiéis à obra, enquanto figurantes recebem status gerados proceduralmente:

```javascript
// Exemplo da lógica de fusão de dados
const characterCards = apiCharacters.map(item => {
    const rawName = item.character.name;
    // Verifica se existe lore manual para o personagem
    const customData = customLore[formatName(rawName)];

    // Se tiver lore, usa. Se não, gera aleatório (RNG)
    return {
        ...item,
        stats: customData ? customData : generateRandomStats()
    };
});
