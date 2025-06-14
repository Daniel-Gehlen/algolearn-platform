"use client"

import { useAppContext } from "@/contexts/app-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useDPAlgorithms } from "@/hooks/use-dp-algorithms"
import { useState } from "react"

export function DynamicProgrammingVisualization() {
  const { state } = useAppContext()
  const { fibonacciVisualization, knapsackVisualization, resetDP } = useDPAlgorithms()
  const [fibInput, setFibInput] = useState("10")
  const [knapsackCapacity, setKnapsackCapacity] = useState("10")

  const getTitle = () => {
    switch (state.currentTopic) {
      case "knapsack":
        return "Problema da Mochila"
      case "fibonacci":
        return "Fibonacci"
      default:
        return "Programação Dinâmica"
    }
  }

  if (state.currentTopic === "fibonacci") {
    return (
      <div className="w-full">
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">N:</label>
            <Input
              type="number"
              value={fibInput}
              onChange={(e) => setFibInput(e.target.value)}
              className="w-20"
              min="1"
              max="20"
            />
          </div>
          <Button
            onClick={() => fibonacciVisualization(Number.parseInt(fibInput))}
            disabled={state.isAnimating}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            Calcular Fibonacci
          </Button>
          <Button variant="secondary" onClick={resetDP} disabled={state.isAnimating}>
            Resetar
          </Button>
        </div>

        <div id="fibonacci-container" className="w-full min-h-[300px] border-2 border-gray-200 rounded-lg bg-white p-4">
          <div className="text-center text-gray-600">
            <div className="text-3xl mb-4">🐇</div>
            <p>Clique em "Calcular Fibonacci" para ver a visualização</p>
          </div>
        </div>
      </div>
    )
  }

  if (state.currentTopic === "knapsack") {
    return (
      <div className="w-full">
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Capacidade:</label>
            <Input
              type="number"
              value={knapsackCapacity}
              onChange={(e) => setKnapsackCapacity(e.target.value)}
              className="w-20"
              min="5"
              max="20"
            />
          </div>
          <Button
            onClick={() => knapsackVisualization(Number.parseInt(knapsackCapacity))}
            disabled={state.isAnimating}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            Resolver Mochila
          </Button>
          <Button variant="secondary" onClick={resetDP} disabled={state.isAnimating}>
            Resetar
          </Button>
        </div>

        <div id="knapsack-container" className="w-full min-h-[300px] border-2 border-gray-200 rounded-lg bg-white p-4">
          <div className="text-center text-gray-600">
            <div className="text-3xl mb-4">🎒</div>
            <p>Clique em "Resolver Mochila" para ver a visualização</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center text-gray-600">
      <div className="text-5xl mb-5">🧮</div>
      <h3 className="text-xl mb-2">{getTitle()}</h3>
      <p>Visualização em desenvolvimento</p>
      <p className="mt-5">Consulte a explicação ao lado para entender o algoritmo</p>
    </div>
  )
}
