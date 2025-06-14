# 🧠 AlgoLearn - Plataforma Interativa de Aprendizado de Algoritmos

Uma aplicação web moderna e interativa para aprender algoritmos fundamentais da ciência da computação através de visualizações dinâmicas e exercícios práticos.

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 15** - Framework React com App Router
- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI reutilizáveis

### Gerenciamento de Estado
- **React Context API** - Gerenciamento de estado global
- **useReducer** - Padrão Redux-like para estado complexo
- **Custom Hooks** - Lógica reutilizável e separação de responsabilidades

### Visualizações
- **SVG nativo** - Renderização de grafos e árvores
- **CSS Animations** - Animações fluidas para algoritmos
- **DOM Manipulation** - Controle direto para visualizações complexas

## 🏗️ Arquitetura e Estrutura

### Padrões de Código Utilizados

#### 1. **Component-Based Architecture**
```
components/
├── navigation.tsx          # Navegação lateral esquerda
├── visualization.tsx       # Área central de visualização
├── explanation.tsx         # Painel direito de explicações
├── sorting-visualization.tsx
├── graph-visualization.tsx
├── tree-visualization.tsx
└── dp-visualization.tsx
```

#### 2. **Custom Hooks Pattern**
```
hooks/
├── use-sorting-algorithms.ts   # Lógica de algoritmos de ordenação
├── use-graph-algorithms.ts     # Algoritmos de grafos (BFS, DFS, Dijkstra)
├── use-tree-algorithms.ts      # Algoritmos de árvores
└── use-dp-algorithms.ts        # Programação dinâmica
```

#### 3. **Context + Reducer Pattern**
```
// Estado global centralizado
interface AppState {
  currentTopic: string | null
  array: number[]
  isAnimating: boolean
  speed: number
  comparisons: number
  swaps: number
  // ...
}

// Actions tipadas
type AppAction = 
  | { type: "SET_TOPIC"; payload: string }
  | { type: "SET_ANIMATING"; payload: boolean }
  // ...
```

#### 4. **Separation of Concerns**
- **Componentes**: Apenas renderização e interação
- **Hooks**: Lógica de negócio e algoritmos
- **Context**: Gerenciamento de estado
- **Data**: Conteúdo educacional separado

### Técnicas de Código Avançadas

#### 1. **Async/Await com Visualização**
```
const bubbleSort = useCallback(async () => {
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      highlightComparison(j, j + 1)
      await sleep(state.speed) // Pausa controlada
      
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        await sleep(state.speed)
      }
    }
  }
}, [dependencies])
```

#### 2. **Dynamic Component Rendering**
```
const renderVisualization = () => {
  if (state.currentTopic?.includes("sort")) {
    return <SortingVisualization />
  }
  if (["bfs", "dfs", "dijkstra"].includes(state.currentTopic)) {
    return <GraphVisualization />
  }
  // ...
}
```

#### 3. **SVG Programático**
```
const renderGraph = (topic: string, container: HTMLElement) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  
  graphData.nodes.forEach((node) => {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    circle.setAttribute("cx", node.x.toString())
    // Eventos interativos
    circle.addEventListener("click", () => startAlgorithm(node.id))
  })
}
```

#### 4. **Performance Optimization**
- **useCallback** para funções custosas
- **Memoização** de componentes pesados
- **Lazy loading** de visualizações
- **Debouncing** em controles de velocidade

## 📚 Casos de Uso

### 1. **Educação em Ciência da Computação**
- **Universidades**: Complemento para aulas de algoritmos
- **Cursos Online**: Material interativo para MOOCs
- **Autodidatas**: Aprendizado visual e prático

### 2. **Preparação para Entrevistas**
- **Desenvolvedores**: Revisão de algoritmos fundamentais
- **Estudantes**: Preparação para processos seletivos
- **Bootcamps**: Material de apoio para intensivos

### 3. **Demonstrações e Apresentações**
- **Professores**: Ferramenta visual para aulas
- **Palestrantes**: Demonstrações ao vivo
- **Workshops**: Material interativo

## 🔬 Estudos de Caso

### Caso 1: Ensino de Complexidade Algorítmica
**Problema**: Estudantes têm dificuldade em entender diferenças entre O(n²) e O(n log n)

**Solução**: 
- Visualização lado a lado de Bubble Sort vs Merge Sort
- Contador de comparações em tempo real
- Controle de velocidade para análise detalhada

**Resultado**: Compreensão visual clara das diferenças de performance

### Caso 2: Algoritmos de Grafos
**Problema**: Conceitos abstratos de BFS vs DFS são difíceis de visualizar

**Solução**:
- Grafos interativos clicáveis
- Animação passo a passo da exploração
- Cores diferentes para nós visitados/atuais

**Resultado**: Entendimento intuitivo dos padrões de busca

### Caso 3: Programação Dinâmica
**Problema**: Conceito de "tabela DP" é abstrato para iniciantes

**Solução**:
- Visualização da construção da tabela em tempo real
- Fibonacci e Mochila como exemplos práticos
- Destaque das células sendo calculadas

**Resultado**: Desmistificação da programação dinâmica

## 🎯 Funcionalidades Principais

### Algoritmos Implementados

#### 🔢 **Ordenação**
- **Bubble Sort**: O(n²) - Algoritmo didático
- **Merge Sort**: O(n log n) - Dividir para conquistar
- **Quick Sort**: O(n log n) médio - Particionamento

#### 🕸️ **Grafos**
- **BFS**: Busca em largura com fila
- **DFS**: Busca em profundidade com pilha
- **Dijkstra**: Caminho mínimo com pesos

#### 🌳 **Árvores**
- **Árvore Binária**: Percursos (pré, em, pós-ordem)
- **Árvore AVL**: Auto-balanceamento

#### 🎯 **Programação Dinâmica**
- **Fibonacci**: Sequência clássica
- **Problema da Mochila**: Otimização combinatória

### Recursos Interativos
- ⚡ **Controle de Velocidade**: Ajuste fino das animações
- 🎲 **Dados Aleatórios**: Geração de arrays e grafos
- 📊 **Estatísticas**: Comparações, trocas, tempo
- 🧠 **Quizzes**: Avaliação do aprendizado
- 📈 **Progresso**: Acompanhamento de tópicos estudados

## 🛠️ Instalação e Execução

### Pré-requisitos
- **Node.js** 18+ 
- **npm** ou **yarn**
- **Git**

### Passo a Passo

#### 1. **Clone o Repositório**
```
git clone https://github.com/seu-usuario/algolearn-platform.git
cd algolearn-platform
```

#### 2. **Instale as Dependências**
```
# Com npm
npm install

# Ou com yarn
yarn install
```

#### 3. **Execute o Projeto**
```
# Modo desenvolvimento
npm run dev

# Ou com yarn
yarn dev
```

#### 4. **Acesse a Aplicação**
Abra seu navegador e acesse: \`http://localhost:3000\`

#### 5. **Build para Produção (Opcional)**
```
# Build
npm run build

# Iniciar produção
npm start
```

### Comandos Disponíveis

```
npm run dev          # Desenvolvimento
npm run build        # Build para produção
npm run start        # Servidor de produção
npm run lint         # Verificação de código
npm run type-check   # Verificação de tipos
```

### Estrutura de Pastas
```
algolearn-platform/
├── app/                    # App Router do Next.js
│   ├── page.tsx           # Página principal
│   ├── layout.tsx         # Layout global
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── ui/               # Componentes shadcn/ui
│   ├── navigation.tsx    # Navegação lateral
│   ├── visualization.tsx # Área de visualização
│   └── ...
├── contexts/             # Context API
│   └── app-context.tsx   # Estado global
├── hooks/                # Custom hooks
│   ├── use-sorting-algorithms.ts
│   ├── use-graph-algorithms.ts
│   └── ...
├── data/                 # Dados estáticos
│   └── algorithm-content.ts
├── lib/                  # Utilitários
│   └── utils.ts
└── public/               # Arquivos estáticos
```

### Troubleshooting

#### Problema: Erro de dependências
**Solução**: 
```
rm -rf node_modules package-lock.json
npm install
```

#### Problema: Porta 3000 ocupada
**Solução**: 
```
npm run dev -- -p 3001
```

#### Problema: Erro de TypeScript
**Solução**: 
```
npm run type-check
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (\`git checkout -b feature/AmazingFeature\`)
3. Commit suas mudanças (\`git commit -m 'Add some AmazingFeature'\`)
4. Push para a branch (\`git push origin feature/AmazingFeature\`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo \`LICENSE\` para mais detalhes.

## 🙏 Agradecimentos

- **shadcn/ui** - Componentes UI elegantes
- **Tailwind CSS** - Framework CSS utilitário
- **Next.js** - Framework React moderno
- **Vercel** - Plataforma de deploy

---

**Desenvolvido com ❤️ para a comunidade de desenvolvedores**
