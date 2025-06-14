export const algorithmContent: Record<
  string,
  {
    title: string
    explanation: string
    quiz: {
      question: string
      options: string[]
      correct: number
    }
  }
> = {
  "bubble-sort": {
    title: "Bubble Sort",
    explanation: `
      <h3 class="text-xl font-bold text-indigo-600 mb-3">🫧 Bubble Sort</h3>
      <p class="mb-4">O Bubble Sort é um algoritmo de ordenação simples que compara elementos adjacentes e os troca se estiverem na ordem errada.</p>
      
      <h3 class="text-lg font-bold text-indigo-600 mb-3">⚡ Complexidade:</h3>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li><strong>Tempo:</strong> O(n²) no pior caso</li>
        <li><strong>Espaço:</strong> O(1) - ordena in-place</li>
      </ul>
      
      <h3 class="text-lg font-bold text-indigo-600 mb-3">🔄 Como funciona:</h3>
      <ol class="list-decimal list-inside mb-4 space-y-1">
        <li>Compare cada par de elementos adjacentes</li>
        <li>Troque-os se estiverem fora de ordem</li>
        <li>Repita até que não haja mais trocas</li>
      </ol>
    `,
    quiz: {
      question: "Qual é a complexidade de tempo do Bubble Sort no pior caso?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
      correct: 2,
    },
  },

  "merge-sort": {
    title: "Merge Sort",
    explanation: `
      <h3 class="text-xl font-bold text-indigo-600 mb-3">🔄 Merge Sort</h3>
      <p class="mb-4">O Merge Sort é um algoritmo de ordenação eficiente que usa a estratégia "dividir para conquistar".</p>
      
      <h3 class="text-lg font-bold text-indigo-600 mb-3">⚡ Complexidade:</h3>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li><strong>Tempo:</strong> O(n log n) sempre</li>
        <li><strong>Espaço:</strong> O(n) - precisa de espaço adicional</li>
      </ul>
      
      <h3 class="text-lg font-bold text-indigo-600 mb-3">🔄 Como funciona:</h3>
      <ol class="list-decimal list-inside mb-4 space-y-1">
        <li>Divida o array pela metade recursivamente</li>
        <li>Ordene cada metade separadamente</li>
        <li>Combine (merge) as partes ordenadas</li>
      </ol>
      
      <h3 class="text-lg font-bold text-indigo-600 mb-3">✅ Vantagens:</h3>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li>Complexidade estável O(n log n)</li>
        <li>Algoritmo estável (mantém ordem de elementos iguais)</li>
        <li>Boa para grandes datasets</li>
      </ul>
    `,
    quiz: {
      question: "Qual estratégia o Merge Sort utiliza?",
      options: ["Força bruta", "Dividir para conquistar", "Algoritmo guloso", "Backtracking"],
      correct: 1,
    },
  },

  "quick-sort": {
    title: "Quick Sort",
    explanation: `
      <h3 class="text-xl font-bold text-indigo-600 mb-3">⚡ Quick Sort</h3>
      <p class="mb-4">O Quick Sort é um algoritmo de ordenação eficiente que usa a estratégia "dividir para conquistar".</p>
      
      <h3 class="text-lg font-bold text-indigo-600 mb-3">⚡ Complexidade:</h3>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li><strong>Tempo:</strong> O(n log n) no caso médio, O(n²) no pior caso</li>
        <li><strong>Espaço:</strong> O(log n) - ordena in-place</li>
      </ul>
      
      <h3 class="text-lg font-bold text-indigo-600 mb-3">🔄 Como funciona:</h3>
      <ol class="list-decimal list-inside mb-4 space-y-1">
        <li>Escolha um elemento como pivô</li>
        <li>Particione o array em elementos menores e maiores que o pivô</li>
        <li>Ordene recursivamente as partições</li>
      </ol>
    `,
    quiz: {
      question: "Qual é a complexidade média do Quick Sort?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
      correct: 1,
    },
  },

  bfs: {
    title: "Busca em Largura (BFS)",
    explanation: `
      <h3 class="text-xl font-bold text-indigo-600 mb-3">🌊 Busca em Largura (BFS)</h3>
      <p class="mb-4">A BFS explora um grafo visitando todos os nós de um nível antes de passar para o próximo nível.</p>
      
      <h3 class="text-lg font-bold text-indigo-600 mb-3">⚡ Complexidade:</h3>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li><strong>Tempo:</strong> O(V + E) onde V = vértices, E = arestas</li>
        <li><strong>Espaço:</strong> O(V) para a fila e marcação</li>
      </ul>
      
      <h3 class="text-lg font-bold text-indigo-600 mb-3">🔄 Como funciona:</h3>
      <ol class="list-decimal list-inside mb-4 space-y-1">
        <li>Comece com um nó inicial e marque como visitado</li>
        <li>Adicione todos os vizinhos não visitados à fila</li>
        <li>Processe o próximo nó da fila</li>
        <li>Repita até a fila estar vazia</li>
      </ol>
      
      <h3 class="text-lg font-bold text-indigo-600 mb-3">🎯 Aplicações:</h3>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li>Encontrar o caminho mais curto (grafos não ponderados)</li>
        <li>Verificar conectividade</li>
        <li>Resolver puzzles e labirintos</li>
      </ul>
    `,
    quiz: {
      question: "Qual estrutura de dados a BFS utiliza internamente?",
      options: ["Pilha", "Fila", "Árvore", "Hash Table"],
      correct: 1,
    },
  },

  dfs: {
    title: "Busca em Profundidade (DFS)",
    explanation: `
      <h3 class="text-xl font-bold text-indigo-600 mb-3">🌳 Busca em Profundidade (DFS)</h3>
      <p class="mb-4">A DFS explora um grafo seguindo um caminho até o fim antes de retroceder.</p>
      
      <h3 class="text-lg font-bold text-indigo-600 mb-3">⚡ Complexidade:</h3>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li><strong>Tempo:</strong> O(V + E) onde V = vértices, E = arestas</li>
        <li><strong>Espaço:</strong> O(V) para a pilha e marcação</li>
      </ul>
      
      <h3 class="text-lg font-bold text-indigo-600 mb-3">🔄 Como funciona:</h3>
      <ol class="list-decimal list-inside mb-4 space-y-1">
        <li>Comece com um nó inicial e marque como visitado</li>
        <li>Visite um vizinho não visitado</li>
        <li>Repita até não haver mais vizinhos não visitados</li>
        <li>Retroceda (backtrack) e repita</li>
      </ol>
    `,
    quiz: {
      question: "Qual estrutura de dados a DFS utiliza internamente?",
      options: ["Pilha", "Fila", "Árvore", "Hash Table"],
      correct: 0,
    },
  },

  dijkstra: {
    title: "Algoritmo de Dijkstra",
    explanation: `
      <h3 class="text-xl font-bold text-indigo-600 mb-3">🛣️ Algoritmo de Dijkstra</h3>
      <p class="mb-4">O algoritmo de Dijkstra encontra o caminho mais curto entre um nó inicial e todos os outros nós em um grafo ponderado.</p>
      
      <h3 class="text-lg font-bold text-indigo-600 mb-3">⚡ Complexidade:</h3>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li><strong>Tempo:</strong> O(V²) na implementação simples</li>
        <li><strong>Espaço:</strong> O(V) para armazenar distâncias</li>
      </ul>
      
      <h3 class="text-lg font-bold text-indigo-600 mb-3">🔄 Como funciona:</h3>
      <ol class="list-decimal list-inside mb-4 space-y-1">
        <li>Atribua distância zero ao nó inicial e infinito aos outros</li>
        <li>Selecione o nó com menor distância não visitado</li>
        <li>Atualize as distâncias dos vizinhos</li>
        <li>Repita até todos os nós serem visitados</li>
      </ol>
    `,
    quiz: {
      question: "O algoritmo de Dijkstra funciona com pesos negativos?",
      options: ["Sim, sempre", "Não, nunca", "Depende do grafo", "Só se não houver ciclos"],
      correct: 1,
    },
  },

  "binary-tree": {
    title: "Árvore Binária",
    explanation: `
      <h3 class="text-xl font-bold text-indigo-600 mb-3">🌳 Árvore Binária</h3>
      <p class="mb-4">Uma árvore binária é uma estrutura de dados onde cada nó tem no máximo dois filhos.</p>
      
      <h3 class="text-lg font-bold text-indigo-600 mb-3">⚡ Características:</h3>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li>Cada nó tem 0, 1 ou 2 filhos</li>
        <li>Filhos são chamados de esquerda e direita</li>
        <li>Pode ser usada para busca eficiente (BST)</li>
      </ul>
      
      <h3 class="text-lg font-bold text-indigo-600 mb-3">🔄 Percursos:</h3>
      <ol class="list-decimal list-inside mb-4 space-y-1">
        <li><strong>Pré-ordem:</strong> Raiz, Esquerda, Direita</li>
        <li><strong>Em-ordem:</strong> Esquerda, Raiz, Direita</li>
        <li><strong>Pós-ordem:</strong> Esquerda, Direita, Raiz</li>
      </ol>
    `,
    quiz: {
      question: "Quantos filhos no máximo um nó em uma árvore binária pode ter?",
      options: ["1", "2", "3", "Nenhuma das anteriores"],
      correct: 1,
    },
  },

  "avl-tree": {
    title: "Árvore AVL",
    explanation: `
      <h3 class="text-xl font-bold text-indigo-600 mb-3">🌴 Árvore AVL</h3>
      <p class="mb-4">Uma árvore AVL é uma árvore binária de busca auto-balanceada.</p>
      
      <h3 class="text-lg font-bold text-indigo-600 mb-3">⚡ Características:</h3>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li>Altura das subárvores difere no máximo em 1</li>
        <li>Operações garantem O(log n) no pior caso</li>
        <li>Usa rotações para manter o balanceamento</li>
      </ul>
      
      <h3 class="text-lg font-bold text-indigo-600 mb-3">🔄 Rotações:</h3>
      <ol class="list-decimal list-inside mb-4 space-y-1">
        <li><strong>Simples à direita</strong></li>
        <li><strong>Simples à esquerda</strong></li>
        <li><strong>Dupla direita-esquerda</strong></li>
        <li><strong>Dupla esquerda-direita</strong></li>
      </ol>
    `,
    quiz: {
      question: "Qual é a principal vantagem da árvore AVL sobre uma BST comum?",
      options: [
        "Menor uso de memória",
        "Balanceamento automático",
        "Suporte a mais tipos de dados",
        "Implementação mais simples",
      ],
      correct: 1,
    },
  },

  knapsack: {
    title: "Problema da Mochila",
    explanation: `
      <h3 class="text-xl font-bold text-indigo-600 mb-3">🎒 Problema da Mochila</h3>
      <p class="mb-4">Dado um conjunto de itens com pesos e valores, determine o subconjunto de maior valor que cabe na mochila.</p>
      
      <h3 class="text-lg font-bold text-indigo-600 mb-3">⚡ Abordagens:</h3>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li><strong>Força bruta:</strong> O(2ⁿ) - testa todas as combinações</li>
        <li><strong>Programação dinâmica:</strong> O(nW) - mais eficiente</li>
      </ul>
      
      <h3 class="text-lg font-bold text-indigo-600 mb-3">🔄 Solução DP:</h3>
      <ol class="list-decimal list-inside mb-4 space-y-1">
        <li>Crie uma tabela para armazenar soluções parciais</li>
        <li>Preencha a tabela iterativamente</li>
        <li>Use a tabela para reconstruir a solução</li>
      </ol>
    `,
    quiz: {
      question: "Qual é a complexidade da solução de programação dinâmica para o problema da mochila?",
      options: ["O(n)", "O(n log n)", "O(nW)", "O(2ⁿ)"],
      correct: 2,
    },
  },

  fibonacci: {
    title: "Sequência de Fibonacci",
    explanation: `
      <h3 class="text-xl font-bold text-indigo-600 mb-3">🐇 Sequência de Fibonacci</h3>
      <p class="mb-4">Cada número é a soma dos dois anteriores: 0, 1, 1, 2, 3, 5, 8, 13...</p>
      
      <h3 class="text-lg font-bold text-indigo-600 mb-3">⚡ Implementações:</h3>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li><strong>Recursiva:</strong> O(2ⁿ) - exponencial</li>
        <li><strong>DP (bottom-up):</strong> O(n) - linear</li>
        <li><strong>Matriz:</strong> O(log n) - mais eficiente</li>
      </ul>
      
      <h3 class="text-lg font-bold text-indigo-600 mb-3">🔄 Aplicações:</h3>
      <ol class="list-decimal list-inside mb-4 space-y-1">
        <li>Análise de algoritmos</li>
        <li>Design de sistemas</li>
        <li>Modelagem de crescimento populacional</li>
      </ol>
    `,
    quiz: {
      question: "Qual é o próximo número na sequência: 0, 1, 1, 2, 3, 5, 8?",
      options: ["10", "11", "12", "13"],
      correct: 3,
    },
  },
}
