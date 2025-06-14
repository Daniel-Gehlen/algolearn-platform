"use client"

import { useAppContext } from "@/contexts/app-context"
import { useCallback } from "react"

export function useSortingAlgorithms() {
  const { state, dispatch } = useAppContext()

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const highlightComparison = (index1: number, index2: number) => {
    const item1 = document.getElementById(`array-item-${index1}`)
    const item2 = document.getElementById(`array-item-${index2}`)

    document.querySelectorAll(".array-item").forEach((item) => {
      item.classList.remove("comparing")
    })

    item1?.classList.add("comparing")
    item2?.classList.add("comparing")
  }

  const markAsSorted = (index: number) => {
    const item = document.getElementById(`array-item-${index}`)
    item?.classList.add("sorted")
  }

  const clearHighlights = () => {
    document.querySelectorAll(".array-item").forEach((item) => {
      item.classList.remove("comparing")
    })
  }

  const showCompletionMessage = () => {
    console.log("🎉 Algoritmo concluído!")
  }

  const bubbleSort = useCallback(async () => {
    if (state.isAnimating) return

    dispatch({ type: "SET_ANIMATING", payload: true })
    dispatch({ type: "RESET_STATS" })

    const arr = [...state.array]
    const n = arr.length

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        highlightComparison(j, j + 1)
        dispatch({ type: "INCREMENT_COMPARISONS" })

        await sleep(state.speed)

        if (arr[j] > arr[j + 1]) {
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          dispatch({ type: "INCREMENT_SWAPS" })
          dispatch({ type: "SET_ARRAY", payload: [...arr] })
          await sleep(state.speed)
        }

        clearHighlights()
      }
      markAsSorted(n - 1 - i)
    }

    if (n > 0) markAsSorted(0)

    dispatch({ type: "SET_ANIMATING", payload: false })
    showCompletionMessage()
  }, [state.array, state.speed, state.isAnimating, dispatch])

  const mergeSort = useCallback(async () => {
    if (state.isAnimating) return

    dispatch({ type: "SET_ANIMATING", payload: true })
    dispatch({ type: "RESET_STATS" })

    const mergeSortHelper = async (arr: number[], left: number, right: number): Promise<void> => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2)
        await mergeSortHelper(arr, left, mid)
        await mergeSortHelper(arr, mid + 1, right)
        await merge(arr, left, mid, right)
      }
    }

    const merge = async (arr: number[], left: number, mid: number, right: number) => {
      const leftArr = arr.slice(left, mid + 1)
      const rightArr = arr.slice(mid + 1, right + 1)

      let i = 0,
        j = 0,
        k = left

      while (i < leftArr.length && j < rightArr.length) {
        dispatch({ type: "INCREMENT_COMPARISONS" })
        highlightComparison(k, k)
        await sleep(state.speed)

        if (leftArr[i] <= rightArr[j]) {
          arr[k] = leftArr[i]
          i++
        } else {
          arr[k] = rightArr[j]
          j++
          dispatch({ type: "INCREMENT_SWAPS" })
        }

        dispatch({ type: "SET_ARRAY", payload: [...arr] })
        k++
      }

      while (i < leftArr.length) {
        arr[k] = leftArr[i]
        dispatch({ type: "SET_ARRAY", payload: [...arr] })
        i++
        k++
        await sleep(state.speed / 2)
      }

      while (j < rightArr.length) {
        arr[k] = rightArr[j]
        dispatch({ type: "SET_ARRAY", payload: [...arr] })
        j++
        k++
        await sleep(state.speed / 2)
      }
    }

    const workingArray = [...state.array]
    await mergeSortHelper(workingArray, 0, workingArray.length - 1)

    state.array.forEach((_, index) => markAsSorted(index))

    dispatch({ type: "SET_ANIMATING", payload: false })
    showCompletionMessage()
  }, [state.array, state.speed, state.isAnimating, dispatch])

  const quickSort = useCallback(async () => {
    if (state.isAnimating) return

    dispatch({ type: "SET_ANIMATING", payload: true })
    dispatch({ type: "RESET_STATS" })

    const quickSortHelper = async (arr: number[], low: number, high: number): Promise<void> => {
      if (low < high) {
        const pi = await partition(arr, low, high)
        await quickSortHelper(arr, low, pi - 1)
        await quickSortHelper(arr, pi + 1, high)
      }
    }

    const partition = async (arr: number[], low: number, high: number): Promise<number> => {
      const pivot = arr[high]
      let i = low - 1

      for (let j = low; j < high; j++) {
        dispatch({ type: "INCREMENT_COMPARISONS" })
        highlightComparison(j, high)
        await sleep(state.speed)

        if (arr[j] < pivot) {
          i++
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
          dispatch({ type: "INCREMENT_SWAPS" })
          dispatch({ type: "SET_ARRAY", payload: [...arr] })
          await sleep(state.speed)
        }
        clearHighlights()
      }
      ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
      dispatch({ type: "INCREMENT_SWAPS" })
      dispatch({ type: "SET_ARRAY", payload: [...arr] })
      await sleep(state.speed)

      return i + 1
    }

    const workingArray = [...state.array]
    await quickSortHelper(workingArray, 0, workingArray.length - 1)

    state.array.forEach((_, index) => markAsSorted(index))

    dispatch({ type: "SET_ANIMATING", payload: false })
    showCompletionMessage()
  }, [state.array, state.speed, state.isAnimating, dispatch])

  const resetArray = useCallback(() => {
    if (state.isAnimating) return

    dispatch({ type: "SET_ARRAY", payload: [...state.originalArray] })
    dispatch({ type: "RESET_STATS" })
    clearHighlights()

    document.querySelectorAll(".array-item").forEach((item) => {
      item.classList.remove("sorted")
    })
  }, [state.isAnimating, state.originalArray, dispatch])

  const generateRandomArray = useCallback(() => {
    if (state.isAnimating) return

    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100) + 1)
    dispatch({ type: "SET_ARRAY", payload: newArray })
    dispatch({ type: "RESET_STATS" })

    setTimeout(() => {
      document.querySelectorAll(".array-item").forEach((item) => {
        item.classList.remove("sorted")
      })
    }, 100)
  }, [state.isAnimating, dispatch])

  return {
    bubbleSort,
    mergeSort,
    quickSort,
    resetArray,
    generateRandomArray,
  }
}
