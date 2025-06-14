"use client"

import { useAppContext } from "@/contexts/app-context"
import { Progress } from "@/components/ui/progress"

const topics = [
  {
    category: "🔢 Ordenação",
    items: [
      { id: "bubble-sort", name: "Bubble Sort" },
      { id: "merge-sort", name: "Merge Sort" },
      { id: "quick-sort", name: "Quick Sort" },
    ],
  },
  {
    category: "🕸️ Grafos",
    items: [
      { id: "bfs", name: "Busca em Largura (BFS)" },
      { id: "dfs", name: "Busca em Profundidade (DFS)" },
      { id: "dijkstra", name: "Algoritmo de Dijkstra" },
    ],
  },
  {
    category: "🌳 Árvores",
    items: [
      { id: "binary-tree", name: "Árvore Binária" },
      { id: "avl-tree", name: "Árvore AVL" },
    ],
  },
  {
    category: "🎯 Programação Dinâmica",
    items: [
      { id: "knapsack", name: "Problema da Mochila" },
      { id: "fibonacci", name: "Fibonacci" },
    ],
  },
]

export function Navigation() {
  const { state, dispatch } = useAppContext()

  const handleTopicSelect = (topicId: string) => {
    dispatch({ type: "SET_TOPIC", payload: topicId })
    dispatch({ type: "ADD_STUDIED_TOPIC", payload: topicId })
    dispatch({ type: "SET_ANIMATING", payload: false })
  }

  const totalTopics = topics.reduce((acc, category) => acc + category.items.length, 0)
  const studiedCount = state.studiedTopics.size
  const progressPercentage = Math.floor((studiedCount / totalTopics) * 100)

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 border-r-2 border-gray-200 overflow-y-auto p-5">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          🧠 AlgoLearn
        </h1>
        <p className="text-gray-600 text-sm mt-1">Aprenda algoritmos interativamente</p>
      </div>

      {topics.map((category) => (
        <div key={category.category} className="mb-6">
          <div className="font-bold text-indigo-600 mb-3 text-lg border-b-2 border-indigo-600 pb-1">
            {category.category}
          </div>
          {category.items.map((item) => (
            <div
              key={item.id}
              className={`p-3 m-2 bg-white rounded-xl cursor-pointer transition-all duration-300 border-2 border-transparent shadow-md hover:shadow-lg hover:-translate-y-1 hover:border-indigo-500 ${
                state.currentTopic === item.id
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg -translate-y-1"
                  : ""
              }`}
              onClick={() => handleTopicSelect(item.id)}
            >
              {item.name}
            </div>
          ))}
        </div>
      ))}

      <div className="mt-8">
        <Progress value={progressPercentage} className="mb-3" />
        <p className="text-center text-gray-600">Progresso: {progressPercentage}%</p>
      </div>
    </div>
  )
}
