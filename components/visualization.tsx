"use client"

import { useAppContext } from "@/contexts/app-context"
import { SortingVisualization } from "@/components/sorting-visualization"
import { GraphVisualization } from "@/components/graph-visualization"
import { TreeVisualization } from "@/components/tree-visualization"
import { DynamicProgrammingVisualization } from "@/components/dp-visualization"

export function Visualization() {
  const { state } = useAppContext()

  const renderVisualization = () => {
    if (!state.currentTopic) {
      return (
        <div className="text-center text-gray-600">
          <div className="text-5xl mb-5">🚀</div>
          <h3 className="text-xl mb-2">Bem-vindo ao AlgoLearn!</h3>
          <p>Sua jornada de aprendizado interativo começa aqui.</p>
        </div>
      )
    }

    if (state.currentTopic.includes("sort")) {
      return <SortingVisualization />
    }

    if (["bfs", "dfs", "dijkstra"].includes(state.currentTopic)) {
      return <GraphVisualization />
    }

    if (["binary-tree", "avl-tree"].includes(state.currentTopic)) {
      return <TreeVisualization />
    }

    if (["knapsack", "fibonacci"].includes(state.currentTopic)) {
      return <DynamicProgrammingVisualization />
    }

    return (
      <div className="text-center text-gray-600">
        <div className="text-5xl mb-5">🚧</div>
        <h3 className="text-xl mb-2">Em Desenvolvimento</h3>
        <p>Esta visualização será implementada em breve!</p>
      </div>
    )
  }

  return (
    <div className="bg-white flex flex-col items-center justify-center p-5 relative">
      <div className="text-center mb-5">
        {state.currentTopic ? (
          <>
            <h2 className="text-2xl font-bold mb-2">
              {state.currentTopic === "bubble-sort" && "Bubble Sort"}
              {state.currentTopic === "merge-sort" && "Merge Sort"}
              {state.currentTopic === "quick-sort" && "Quick Sort"}
              {state.currentTopic === "bfs" && "Busca em Largura (BFS)"}
              {state.currentTopic === "dfs" && "Busca em Profundidade (DFS)"}
              {state.currentTopic === "dijkstra" && "Algoritmo de Dijkstra"}
              {state.currentTopic === "binary-tree" && "Árvore Binária"}
              {state.currentTopic === "avl-tree" && "Árvore AVL"}
              {state.currentTopic === "knapsack" && "Problema da Mochila"}
              {state.currentTopic === "fibonacci" && "Fibonacci"}
            </h2>
            <p className="text-gray-600">Algoritmo interativo com visualização</p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-2">Selecione um algoritmo para começar</h2>
            <p className="text-gray-600">Escolha um tópico no painel esquerdo</p>
          </>
        )}
      </div>

      <div className="w-full max-w-4xl h-96 border-3 border-gray-200 rounded-2xl bg-gradient-to-b from-white to-gray-50 flex items-center justify-center shadow-inner">
        {renderVisualization()}
      </div>
    </div>
  )
}
