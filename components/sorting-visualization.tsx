"use client"

import { useAppContext } from "@/contexts/app-context"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useSortingAlgorithms } from "@/hooks/use-sorting-algorithms"

export function SortingVisualization() {
  const { state, dispatch } = useAppContext()
  const { bubbleSort, mergeSort, quickSort, resetArray, generateRandomArray } = useSortingAlgorithms()

  const handleSpeedChange = (value: number[]) => {
    dispatch({ type: "SET_SPEED", payload: 2100 - value[0] })
  }

  const getAlgorithmFunction = () => {
    switch (state.currentTopic) {
      case "bubble-sort":
        return bubbleSort
      case "merge-sort":
        return mergeSort
      case "quick-sort":
        return quickSort
      default:
        return bubbleSort
    }
  }

  const getAlgorithmName = () => {
    switch (state.currentTopic) {
      case "bubble-sort":
        return "Bubble Sort"
      case "merge-sort":
        return "Merge Sort"
      case "quick-sort":
        return "Quick Sort"
      default:
        return "Algoritmo"
    }
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <Button
          onClick={getAlgorithmFunction()}
          disabled={state.isAnimating}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
        >
          Iniciar {getAlgorithmName()}
        </Button>
        <Button variant="secondary" onClick={resetArray} disabled={state.isAnimating}>
          Resetar
        </Button>
        <Button variant="secondary" onClick={generateRandomArray} disabled={state.isAnimating}>
          Array Aleatório
        </Button>
      </div>

      <div className="flex items-center justify-center gap-4 mb-6">
        <label className="text-sm font-medium">Velocidade:</label>
        <Slider
          value={[2100 - state.speed]}
          onValueChange={handleSpeedChange}
          max={1900}
          min={100}
          step={100}
          className="w-48"
        />
        <span className="text-sm">Normal</span>
      </div>

      <div className="flex justify-center gap-2 flex-wrap">
        {state.array.map((value, index) => (
          <div
            key={index}
            id={`array-item-${index}`}
            className="w-12 h-12 bg-gradient-to-b from-white to-gray-100 border-2 border-indigo-500 rounded-lg flex items-center justify-center font-bold text-lg transition-all duration-300 shadow-md array-item"
          >
            {value}
          </div>
        ))}
      </div>

      <style jsx>{`
        .array-item.comparing {
          background: linear-gradient(145deg, #ffd700, #ffed4a) !important;
          transform: scale(1.1);
        }
        .array-item.sorted {
          background: linear-gradient(145deg, #10b981, #059669) !important;
          color: white;
        }
      `}</style>
    </div>
  )
}
