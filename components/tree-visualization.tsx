"use client"

import { useAppContext } from "@/contexts/app-context"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useTreeAlgorithms } from "@/hooks/use-tree-algorithms"
import { useEffect, useRef } from "react"

export function TreeVisualization() {
  const { state, dispatch } = useAppContext()
  const { renderTree, resetTree, traverseTree } = useTreeAlgorithms()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current && state.currentTopic) {
      renderTree(state.currentTopic, containerRef.current)
    }
  }, [state.currentTopic, renderTree])

  const handleSpeedChange = (value: number[]) => {
    dispatch({ type: "SET_SPEED", payload: 1700 - value[0] })
  }

  const getRootNode = () => {
    return state.currentTopic === "binary-tree" ? "50" : "40"
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <Button
          onClick={() => traverseTree(getRootNode(), "pre-order")}
          disabled={state.isAnimating}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
        >
          Pré-ordem
        </Button>
        <Button
          onClick={() => traverseTree(getRootNode(), "in-order")}
          disabled={state.isAnimating}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
        >
          Em-ordem
        </Button>
        <Button
          onClick={() => traverseTree(getRootNode(), "post-order")}
          disabled={state.isAnimating}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
        >
          Pós-ordem
        </Button>
        <Button variant="secondary" onClick={resetTree} disabled={state.isAnimating}>
          Resetar
        </Button>
      </div>

      <div className="flex items-center justify-center gap-4 mb-4">
        <label className="text-sm font-medium">Velocidade:</label>
        <Slider
          value={[1700 - state.speed]}
          onValueChange={handleSpeedChange}
          max={1300}
          min={200}
          step={100}
          className="w-48"
        />
        <span className="text-sm">Normal</span>
      </div>

      <div
        ref={containerRef}
        className="w-full h-80 border-2 border-gray-200 rounded-lg bg-white relative overflow-hidden"
      />
    </div>
  )
}
