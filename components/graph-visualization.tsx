"use client"

import { useAppContext } from "@/contexts/app-context"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useGraphAlgorithms } from "@/hooks/use-graph-algorithms"
import { useEffect, useRef } from "react"

export function GraphVisualization() {
  const { state, dispatch } = useAppContext()
  const { renderGraph, resetGraph, startBFS, startDFS, startDijkstra } = useGraphAlgorithms()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current && state.currentTopic) {
      renderGraph(state.currentTopic, containerRef.current)
    }
  }, [state.currentTopic, renderGraph])

  const handleSpeedChange = (value: number[]) => {
    dispatch({ type: "SET_SPEED", payload: 1700 - value[0] })
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <Button variant="secondary" onClick={resetGraph} disabled={state.isAnimating}>
          Resetar Grafo
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

      <p className="text-center text-gray-600 mb-4">Clique em um nó para iniciar o algoritmo</p>

      <div
        ref={containerRef}
        className="w-full h-80 border-2 border-gray-200 rounded-lg bg-white relative overflow-hidden"
      />
    </div>
  )
}
