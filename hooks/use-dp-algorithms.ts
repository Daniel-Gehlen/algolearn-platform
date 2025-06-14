"use client"

import { useAppContext } from "@/contexts/app-context"
import { useCallback } from "react"

export function useDPAlgorithms() {
  const { state, dispatch } = useAppContext()

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const fibonacciVisualization = useCallback(
    async (n: number) => {
      if (state.isAnimating || n < 1 || n > 20) return

      dispatch({ type: "SET_ANIMATING", payload: true })

      const container = document.getElementById("fibonacci-container")
      if (!container) return

      container.innerHTML = `
      <div class="text-center mb-4">
        <h3 class="text-lg font-bold">Calculando Fibonacci(${n}) com Programação Dinâmica</h3>
      </div>
      <div id="fib-table" class="grid gap-2 mb-4" style="grid-template-columns: repeat(auto-fit, minmax(60px, 1fr)); max-width: 600px; margin: 0 auto;"></div>
      <div id="fib-result" class="text-center text-xl font-bold mt-4"></div>
    `

      const table = document.getElementById("fib-table")
      if (!table) return

      // Criar tabela DP
      const dp: number[] = new Array(n + 1).fill(0)
      dp[0] = 0
      if (n > 0) dp[1] = 1

      // Mostrar valores iniciais
      for (let i = 0; i <= n; i++) {
        const cell = document.createElement("div")
        cell.className = "border-2 border-gray-300 rounded p-2 text-center bg-gray-100"
        cell.id = `fib-cell-${i}`
        cell.innerHTML = `
        <div class="text-xs text-gray-600">F(${i})</div>
        <div class="font-bold">${i <= 1 ? dp[i] : "?"}</div>
      `
        table.appendChild(cell)
      }

      await sleep(1000)

      // Calcular Fibonacci com visualização
      for (let i = 2; i <= n; i++) {
        // Destacar células sendo usadas
        const cell1 = document.getElementById(`fib-cell-${i - 1}`)
        const cell2 = document.getElementById(`fib-cell-${i - 2}`)
        const currentCell = document.getElementById(`fib-cell-${i}`)

        if (cell1) cell1.style.backgroundColor = "#ffd700"
        if (cell2) cell2.style.backgroundColor = "#ffd700"
        if (currentCell) currentCell.style.backgroundColor = "#ff6b6b"

        await sleep(state.speed)

        dp[i] = dp[i - 1] + dp[i - 2]

        if (currentCell) {
          currentCell.innerHTML = `
          <div class="text-xs text-gray-600">F(${i})</div>
          <div class="font-bold">${dp[i]}</div>
        `
          currentCell.style.backgroundColor = "#10b981"
        }

        await sleep(state.speed)

        // Remover destaque
        if (cell1) cell1.style.backgroundColor = "#f3f4f6"
        if (cell2) cell2.style.backgroundColor = "#f3f4f6"
      }

      const resultDiv = document.getElementById("fib-result")
      if (resultDiv) {
        resultDiv.innerHTML = `🎉 Fibonacci(${n}) = ${dp[n]}`
        resultDiv.style.color = "#10b981"
      }

      dispatch({ type: "SET_ANIMATING", payload: false })
    },
    [state.isAnimating, state.speed, dispatch],
  )

  const knapsackVisualization = useCallback(
    async (capacity: number) => {
      if (state.isAnimating || capacity < 5 || capacity > 20) return

      dispatch({ type: "SET_ANIMATING", payload: true })

      const container = document.getElementById("knapsack-container")
      if (!container) return

      // Itens de exemplo
      const items = [
        { weight: 2, value: 3, name: "Item A" },
        { weight: 3, value: 4, name: "Item B" },
        { weight: 4, value: 5, name: "Item C" },
        { weight: 5, value: 6, name: "Item D" },
      ]

      container.innerHTML = `
      <div class="text-center mb-4">
        <h3 class="text-lg font-bold">Problema da Mochila - Capacidade: ${capacity}</h3>
      </div>
      <div class="mb-4">
        <h4 class="font-bold mb-2">Itens disponíveis:</h4>
        <div class="flex gap-2 justify-center flex-wrap">
          ${items
            .map(
              (item, i) => `
            <div class="border-2 border-blue-300 rounded p-2 text-center bg-blue-50">
              <div class="font-bold">${item.name}</div>
              <div class="text-sm">Peso: ${item.weight}</div>
              <div class="text-sm">Valor: ${item.value}</div>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
      <div id="knapsack-table" class="mb-4"></div>
      <div id="knapsack-result" class="text-center text-xl font-bold mt-4"></div>
    `

      const tableDiv = document.getElementById("knapsack-table")
      if (!tableDiv) return

      // Criar tabela DP
      const n = items.length
      const dp: number[][] = Array(n + 1)
        .fill(null)
        .map(() => Array(capacity + 1).fill(0))

      // Criar visualização da tabela
      let tableHTML = '<table class="mx-auto border-collapse border border-gray-400">'
      tableHTML += "<tr><th class='border border-gray-400 p-2'>Item\\Peso</th>"
      for (let w = 0; w <= capacity; w++) {
        tableHTML += `<th class='border border-gray-400 p-2'>${w}</th>`
      }
      tableHTML += "</tr>"

      for (let i = 0; i <= n; i++) {
        tableHTML += "<tr>"
        tableHTML += `<th class='border border-gray-400 p-2'>${i === 0 ? "∅" : items[i - 1].name}</th>`
        for (let w = 0; w <= capacity; w++) {
          tableHTML += `<td class='border border-gray-400 p-2 text-center' id='dp-${i}-${w}'>0</td>`
        }
        tableHTML += "</tr>"
      }
      tableHTML += "</table>"
      tableDiv.innerHTML = tableHTML

      await sleep(1000)

      // Preencher tabela DP com animação
      for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
          const cell = document.getElementById(`dp-${i}-${w}`)
          if (cell) cell.style.backgroundColor = "#ff6b6b"

          await sleep(state.speed / 2)

          const currentItem = items[i - 1]
          if (currentItem.weight <= w) {
            const include = currentItem.value + dp[i - 1][w - currentItem.weight]
            const exclude = dp[i - 1][w]
            dp[i][w] = Math.max(include, exclude)
          } else {
            dp[i][w] = dp[i - 1][w]
          }

          if (cell) {
            cell.textContent = dp[i][w].toString()
            cell.style.backgroundColor = "#10b981"
          }

          await sleep(state.speed / 2)

          if (cell) cell.style.backgroundColor = "#f3f4f6"
        }
      }

      const resultDiv = document.getElementById("knapsack-result")
      if (resultDiv) {
        resultDiv.innerHTML = `🎉 Valor máximo: ${dp[n][capacity]}`
        resultDiv.style.color = "#10b981"
      }

      dispatch({ type: "SET_ANIMATING", payload: false })
    },
    [state.isAnimating, state.speed, dispatch],
  )

  const resetDP = useCallback(() => {
    if (state.isAnimating) return

    const fibContainer = document.getElementById("fibonacci-container")
    const knapsackContainer = document.getElementById("knapsack-container")

    if (fibContainer) {
      fibContainer.innerHTML = `
        <div class="text-center text-gray-600">
          <div class="text-3xl mb-4">🐇</div>
          <p>Clique em "Calcular Fibonacci" para ver a visualização</p>
        </div>
      `
    }

    if (knapsackContainer) {
      knapsackContainer.innerHTML = `
        <div class="text-center text-gray-600">
          <div class="text-3xl mb-4">🎒</div>
          <p>Clique em "Resolver Mochila" para ver a visualização</p>
        </div>
      `
    }
  }, [state.isAnimating])

  return {
    fibonacciVisualization,
    knapsackVisualization,
    resetDP,
  }
}
