const cardGrid = document.getElementById('cardGrid');
const searchInput = document.getElementById('searchInput');
const typeFilter = document.getElementById('typeFilter');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const noResultsMsg = document.getElementById('noResults');

let allCards = [];

// API do Anime (Temporada 1)
const ANIME_ID = 52991;
const API_URL = `https://api.jikan.moe/v4/anime/${ANIME_ID}/characters`;

// --- 1. BASE DE DADOS DE LORE (PERSONAGENS DO ANIME) ---
// Chave = Primeiro nome em minúsculo (conforme vem da API)
const customLore = {
    // Grupo do Herói
    "frieren": { type: "Especial", mana: 9200, atk: 8800, def: 9100, desc: "Maga elfa milenar. Especialista em análise mágica e combate de desgaste." },
    "himmel": { type: "Especial", mana: 0, atk: 9500, def: 8900, desc: "O Herói. Velocidade e carisma incomparáveis. O maior espadachim humano." },
    "heiter": { type: "Suporte", mana: 9400, atk: 3000, def: 9600, desc: "Sacerdote com reservas de mana surreais. Mestre em magias de suporte e sobrevivência." },
    "eisen": { type: "Defesa", mana: 0, atk: 9000, def: 9900, desc: "Guerreiro anão. Possui a resistência física mais alta da série. Praticamente indestrutível." },
    
    // Novo Grupo e Mestres
    "fern": { type: "Ataque", mana: 3500, atk: 7800, def: 6500, desc: "Maga de ataque ultra-rápido. Sua velocidade de conjuração supera magos milenares." },
    "stark": { type: "Defesa", mana: 0, atk: 8200, def: 8800, desc: "Guerreiro com imenso potencial. Tanque de alta durabilidade e dano explosivo." },
    "flamme": { type: "Especial", mana: 9800, atk: 9700, def: 9500, desc: "A lendária maga humana que ensinou Frieren. Criadora do sistema mágico atual." },
    "qual": { type: "Ataque", mana: 7500, atk: 9200, def: 6000, desc: "Demônio criador do Zoltraak. Poder ofensivo de perfuração absoluta." },
    "sein": { type: "Suporte", mana: 5500, atk: 4500, def: 7800, desc: "Sacerdote prodígio. Especialista em purificação de maldições e cura." },
    "kraft": { type: "Defesa", mana: 8900, atk: 9000, def: 9200, desc: "Monge elfo milenar. Combatente físico com sabedoria e força de eras passadas." },

    // Arco de Aura
    "aura": { type: "Especial", mana: 8200, atk: 7500, def: 4000, desc: "Uma dos Sete Sábios. Usa a Balança da Obediência para escravizar oponentes." },
    "lügner": { type: "Especial", mana: 5800, atk: 6500, def: 6000, desc: "Demônio que manipula o próprio sangue como chicotes cortantes." },
    "linie": { type: "Ataque", mana: 4200, atk: 7000, def: 5000, desc: "Demônia que copia perfeitamente movimentos físicos de guerreiros através da leitura de mana." },
    "draht": { type: "Ataque", mana: 3800, atk: 6800, def: 3000, desc: "Usa fios de mana invisíveis e indestrutíveis para decapitar inimigos." },
    "granat": { type: "Suporte", mana: 100, atk: 400, def: 500, desc: "Nobre humano responsável pela proteção da cidade e sua barreira antiga." },

    // Exame de Mago (1ª Etapa)
    "lawine": { type: "Ataque", mana: 2800, atk: 5500, def: 5200, desc: "Maga de gelo. Parceira agressiva de Kanne." },
    "kanne": { type: "Suporte", mana: 2900, atk: 5800, def: 4500, desc: "Maga da água. Manipulação elemental dependente de fontes hídricas." },
    "übel": { type: "Ataque", mana: 4500, atk: 8500, def: 4000, desc: "Maga de corte instintivo; 'o que eu imagino, eu corto'." },
    "land": { type: "Especial", mana: 4000, atk: 6000, def: 7000, desc: "Mestre em clones perfeitos. Nunca sai de casa." },
    "wirbel": { type: "Ataque", mana: 5200, atk: 7500, def: 6800, desc: "Mago de combate militar. Usa magia de atadura." },
    "scharf": { type: "Ataque", mana: 3500, atk: 6200, def: 5000, desc: "Transforma pétalas em lâminas afiadas." },
    "ehre": { type: "Suporte", mana: 3800, atk: 6500, def: 4800, desc: "Neta de Lernen, alta técnica de mana." },
    "denken": { type: "Ataque", mana: 6500, atk: 7800, def: 8200, desc: "Mago Imperial experiente em batalhas políticas e táticas." },
    "richter": { type: "Defesa", mana: 5000, atk: 7200, def: 7500, desc: "Mago de manipulação de terra e geocinese." },
    "laufen": { type: "Ataque", mana: 3000, atk: 6800, def: 4000, desc: "Guerreira de velocidade extrema (Jilwer)." },
    "genau": { type: "Ataque", mana: 7800, atk: 8400, def: 8000, desc: "Examinador de 1ª classe; magias de vento cortante." },

    // Exame de Mago (2ª e 3ª Etapa)
    "edel": { type: "Suporte", mana: 4200, atk: 3000, def: 5500, desc: "Especialista em magias mentais e hipnose." },
    "blei": { type: "Ataque", mana: 3500, atk: 6000, def: 6000, desc: "Participante do exame de mago." },
    "dünste": { type: "Suporte", mana: 4000, atk: 6200, def: 6000, desc: "Participante do exame de mago." },
    "ton": { type: "Defesa", mana: 3200, atk: 5500, def: 5800, desc: "Participante do exame de mago." },
    "lang": { type: "Ataque", mana: 3800, atk: 6000, def: 5500, desc: "Participante do exame de mago." },
    "methode": { type: "Suporte", mana: 5800, atk: 7000, def: 7200, desc: "Versátil, conhece cura, contenção e rastreamento." },
    "sense": { type: "Defesa", mana: 8500, atk: 8800, def: 8900, desc: "Usa seu cabelo como arma de ataque e defesa absoluta." },
    "lernen": { type: "Especial", mana: 7900, atk: 8200, def: 7800, desc: "O primeiro mago de 1ª classe; pupilo de Serie." },
    "serie": { type: "Especial", mana: 10000, atk: 10000, def: 10000, desc: "A Elfa Viva mais poderosa. Grimório vivo que conhece quase todas as magias." }
};

// --- 2. DECK MANUAL (PERSONAGENS QUE NÃO ESTÃO NA API/MANGÁ) ---
// Como não temos imagens oficiais da API para estes, deixaremos um placeholder ou vazio.
const mangaDeck = [
    {
        id: 'man1', name: 'Rei Demônio', type: 'Especial', mana: 10000, atk: 10000, def: 9800,
        desc: 'Antagonista supremo. Seu poder exigiu o grupo mais forte da história para ser derrotado.',
        imageUrl: 'assets/img/rei-demonio.png'
    },
    {
        id: 'man2', name: 'Deusa da Criação', type: 'Especial', mana: 9999, atk: 9999, def: 9999,
        desc: 'Entidade mitológica. Fonte de toda a magia sagrada dos sacerdotes.',
        imageUrl: 'assets/img/deusa-da-criacao.png'
    },
    {
        id: 'man4', name: 'Schlacht', type: 'Especial', mana: 9500, atk: 9000, def: 9000,
        desc: 'O Omnisciente, braço direito do Rei Demônio.',
        imageUrl: 'assets/img/schlacht.png'
    },

    {
        id: 'man11', name: 'Gorila', type: 'Ataque', mana: 200, atk: 1500, def: 1200,
        desc: 'Um aventureiro carismático que inspirou Sein a sair de sua vila.',
        imageUrl: 'assets/img/gorila.png'
    }
];

// --- 3. DECK DE LOCAIS ---
const locationsDeck = [
    {
        id: 'loc1', name: 'Ende (Aureole)', type: 'Local', mana: 120, atk: 0, def: 0,
        desc: 'O local onde o Rei Demônio residia e onde as almas descansam.',
        imageUrl: 'assets/img/ende.png'
    },
    {
        id: 'loc2', name: 'Auberst', type: 'Local', mana: 80, atk: 0, def: 0,
        desc: 'A cidade fortificada do norte onde ocorre o Exame de Mago.',
        imageUrl: 'assets/img/auberst.png'
    },
    {
        id: 'loc3', name: 'Vila de Himmel', type: 'Local', mana: 50, atk: 0, def: 0,
        desc: 'Um local pacífico onde a estátua do herói é mantida com carinho.',
        imageUrl: 'assets/img/vila-do-himmel.png'
    },
    {
        id: 'loc4', name: 'Grande Barreira', type: 'Local', mana: 100, atk: 0, def: 0,
        desc: 'A barreira mágica criada por Flamme para proteger a humanidade.',
        imageUrl: 'assets/img/grande-barreira.png'
    }
];

// --- FUNÇÃO PRINCIPAL ---
async function fetchCards() {
    cardGrid.innerHTML = '<p class="loading">✨ Invocando personagens e locais... ✨</p>';

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Erro na API');
        
        const data = await response.json();
        const apiCharacters = data.data;

        // 1. Processa Personagens da API (Anime)
        const animeCards = apiCharacters.map(item => {
            const charData = item.character;
            // Limpeza de nome para encontrar a chave na Lore
            let rawName = charData.name.replace(',', '');
            let firstName = rawName.split(' ')[0].toLowerCase();
            
            // Correção para nomes compostos específicos
            if (rawName.includes("Granat")) firstName = "granat";

            const customData = customLore[firstName];

            // Se tem lore definida, usa. Se não, gera status genérico.
            const stats = customData 
                ? customData 
                : generateRandomStats(rawName, item.role);

            return {
                id: charData.mal_id,
                name: rawName,
                imageUrl: charData.images.jpg.image_url,
                ...stats
            };
        });

        // 2. Junta Tudo: Anime + Mangá (Manual) + Locais
        // Filtramos do manual caso a API já tenha trazido (ex: Frieren não deve duplicar)
        // Mas como o MangaDeck contém chars que a API (Season 1) não tem, o risco é baixo.
        
        allCards = [...animeCards, ...mangaDeck, ...locationsDeck]; 

        renderCards(allCards);

    } catch (error) {
        console.error(error);
        // Fallback: Se a API falhar, mostra pelo menos os manuais e locais
        allCards = [...mangaDeck, ...locationsDeck];
        renderCards(allCards);
        // Adiciona aviso de erro discreto
        const errorMsg = document.createElement('p');
        errorMsg.textContent = "Nota: A conexão com o grimório online falhou. Exibindo apenas registros locais.";
        errorMsg.style.textAlign = "center";
        errorMsg.style.color = "red";
        cardGrid.prepend(errorMsg);
    }
}

// Gera stats genéricos para figurantes não listados
function generateRandomStats(name, role) {
    const types = ['Ataque', 'Defesa', 'Suporte'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    
    // Figurantes são mais fracos (0 - 1000)
    return {
        type: randomType,
        atk: Math.floor(Math.random() * 500) + 100,
        def: Math.floor(Math.random() * 500) + 100,
        mana: Math.floor(Math.random() * 500) + 10,
        desc: "Um habitante ou aventureiro deste mundo."
    };
}

function renderCards(cards) {
    cardGrid.innerHTML = ''; 
    
    if (!cards || cards.length === 0) {
        noResultsMsg.classList.remove('hidden');
        return;
    } else {
        noResultsMsg.classList.add('hidden');
    }

    cards.forEach(card => {
        const div = document.createElement('div');
        div.className = 'tcg-card';

        // Ícones
        let icon = '';
        if(card.type === 'Ataque') icon = '⚔️';
        if(card.type === 'Defesa') icon = '🛡️';
        if(card.type === 'Suporte') icon = '🌿';
        if(card.type === 'Especial') icon = '🔮';
        if(card.type === 'Local') icon = '🗺️';

        // Placeholder para imagem quebrada ou vazia (Manga Deck)
        const imgUrl = card.imageUrl || 'https://via.placeholder.com/300x400?text=Sem+Registro+Visual';

        div.innerHTML = `
            <div class="card-top">
                <span class="card-name">${card.name}</span>
                <span class="card-cost" title="Mana Capacity">${card.mana}</span>
            </div>
            
            <div class="card-img-container">
                <img src="${imgUrl}" alt="${card.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x400?text=Imagem+Indispon%C3%ADvel'">
            </div>
            
            <div class="card-info">
                <span class="card-type">${icon} ${card.type}</span>
                <p class="card-desc">${card.desc}</p>
            </div>
            
            <div class="card-stats">
                <span>ATK ${card.atk}</span>
                <span>DEF ${card.def}</span>
            </div>
        `;
        cardGrid.appendChild(div);
    });
}

// Filtros
function applyFilter() {
    const nameTerm = searchInput.value.toLowerCase();
    const typeTerm = typeFilter.value;

    const filtered = allCards.filter(card => {
        const matchesName = card.name.toLowerCase().includes(nameTerm);
        const matchesType = (typeTerm === 'all') || (card.type === typeTerm);
        return matchesName && matchesType;
    });

    renderCards(filtered);
}

clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    typeFilter.value = 'all';
    renderCards(allCards);
});

searchBtn.addEventListener('click', applyFilter);

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') applyFilter();
});

// Iniciar
fetchCards();