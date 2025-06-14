"use client"

import { useAppContext } from "@/contexts/app-context"
import { useCallback } from "react"

const sampleGraphs = {
  bfs: {
    nodes: [
      { id: "A", x: 200, y: 100 },
      { id: "B", x: 100, y: 200 },
      { id: "C", x: 300, y: 200 },
      { id: "D", x: 150, y: 300 },
      { id: "E", x: 250, y: 300 },
    ],
    links: [
      { source: "A", target: "B" },
      { source: "A", target: "C" },
      { source: "B", target: "D" },
      { source: "C", target: "E" },
      { source: "D", target: "E" },
    ],
  },
  dfs: {
    nodes: [
      { id: "A", x: 200, y: 100 },
      { id: "B", x: 100, y: 200 },
      { id: "C", x: 300, y: 200 },
      { id: "D", x: 50, y: 300 },
      { id: "E", x: 150, y: 300 },
      { id: "F", x: 250, y: 300 },
      { id: "G", x: 350, y: 300 },
    ],
    links: [
      { source: "A", target: "B" },
      { source: "A", target: "C" },
      { source: "B", target: "D" },
      { source: "B", target: "E" },
      { source: "C", target: "F" },
      { source: "C", target: "G" },
    ],
  },
  dijkstra: {
    nodes: [
      { id: "A", x: 200, y: 100 },
      { id: "B", x: 100, y: 200 },
      { id: "C", x: 300, y: 200 },
      { id: "D", x: 50, y: 300 },
      { id: "E", x: 250, y: 300 },
    ],
    links: [
      { source: "A", target: "B", weight: 4 },
      { source: "A", target: "C", weight: 2 },
      { source: "B", target: "D", weight: 5 },
      { source: "C", target: "B", weight: 1 },
      { source: "C", target: "E", weight: 3 },
      { source: "D", target: "E", weight: 1 },
    ],
  },
}

export function useGraphAlgorithms() {
  const { state, dispatch } = useAppContext()

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const renderGraph = useCallback(
    (topic: string, container: HTMLElement) => {
      container.innerHTML = ""

      const graphData = sampleGraphs[topic as keyof typeof sampleGraphs] || sampleGraphs.bfs
      dispatch({ type: "SET_GRAPH", payload: graphData })

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      svg.setAttribute("width", "100%")
      svg.setAttribute("height", "100%")
      svg.setAttribute("viewBox", "0 0 400 400")
      container.appendChild(svg)

      // Draw links
      graphData.links.forEach((link) => {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
        const sourceNode = graphData.nodes.find((n) => n.id === link.source)!
        const targetNode = graphData.nodes.find((n) => n.id === link.target)!

        line.setAttribute("x1", sourceNode.x.toString())
        line.setAttribute("y1", sourceNode.y.toString())
        line.setAttribute("x2", targetNode.x.toString())
        line.setAttribute("y2", targetNode.y.toString())
        line.setAttribute("stroke", "#999")
        line.setAttribute("stroke-width", "2")
        line.setAttribute("class", "link")
        svg.appendChild(line)

        // Add weight labels for Dijkstra
        if ("weight" in link) {
          const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
          text.setAttribute("x", ((sourceNode.x + targetNode.x) / 2).toString())
          text.setAttribute("y", ((sourceNode.y + targetNode.y) / 2).toString())
          text.setAttribute("text-anchor", "middle")
          text.setAttribute("font-size", "12")
          text.setAttribute("fill", "#333")
          text.textContent = link.weight?.toString() || ""
          svg.appendChild(text)
        }
      })

      // Draw nodes
      graphData.nodes.forEach((node) => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        circle.setAttribute("cx", node.x.toString())
        circle.setAttribute("cy", node.y.toString())
        circle.setAttribute("r", "20")
        circle.setAttribute("fill", "#667eea")
        circle.setAttribute("stroke", "#ffffff")
        circle.setAttribute("stroke-width", "3")
        circle.setAttribute("class", "node")
        circle.setAttribute("data-id", node.id)
        circle.style.cursor = "pointer"

        circle.addEventListener("click", () => {
          if (!state.isAnimating) {
            if (topic === "bfs") {
              startBFS(node.id)
            } else if (topic === "dfs") {
              startDFS(node.id)
            } else if (topic === "dijkstra") {
              startDijkstra(node.id)
            }
          }
        })

        svg.appendChild(circle)

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text")
        text.setAttribute("x", node.x.toString())
        text.setAttribute("y", node.y.toString())
        text.setAttribute("text-anchor", "middle")
        text.setAttribute("dominant-baseline", "central")
        text.setAttribute("font-size", "14")
        text.setAttribute("font-weight", "bold")
        text.setAttribute("fill", "white")
        text.setAttribute("pointer-events", "none")
        text.textContent = node.id
        svg.appendChild(text)
      })
    },
    [dispatch, state.isAnimating],
  )

  const markNodeAsCurrent = (nodeId: string) => {
    const nodes = document.querySelectorAll(".node")
    nodes.forEach((node) => {
      if (node.getAttribute("data-id") === nodeId) {
        node.setAttribute("fill", "#ffd700")
        node.setAttribute("r", "25")
      }
    })
  }

  const markNodeAsVisited = (nodeId: string) => {
    const nodes = document.querySelectorAll(".node")
    nodes.forEach((node) => {
      if (node.getAttribute("data-id") === nodeId) {
        node.setAttribute("fill", "#10b981")
        node.setAttribute("r", "20")
      }
    })
  }

  const startBFS = useCallback(
    async (startNode: string) => {
      if (state.isAnimating || !state.graph) return

      dispatch({ type: "SET_ANIMATING", payload: true })
      const visited = new Set<string>()
      const queue = [startNode]

      while (queue.length > 0) {
        const current = queue.shift()!

        if (visited.has(current)) continue

        markNodeAsCurrent(current)
        await sleep(state.speed)

        visited.add(current)
        markNodeAsVisited(current)

        const neighbors = state.graph.links
          .filter((link: any) => link.source === current || link.target === current)
          .map((link: any) => (link.source === current ? link.target : link.source))

        for (const neighbor of neighbors) {
          if (!visited.has(neighbor) && !queue.includes(neighbor)) {
            queue.push(neighbor)
          }
        }

        await sleep(state.speed)
      }

      dispatch({ type: "SET_ANIMATING", payload: false })
    },
    [state.isAnimating, state.graph, state.speed, dispatch],
  )

  const startDFS = useCallback(
    async (startNode: string) => {
      if (state.isAnimating || !state.graph) return

      dispatch({ type: "SET_ANIMATING", payload: true })
      const visited = new Set<string>()
      const stack = [startNode]

      while (stack.length > 0) {
        const current = stack.pop()!

        if (visited.has(current)) continue

        markNodeAsCurrent(current)
        await sleep(state.speed)

        visited.add(current)
        markNodeAsVisited(current)

        const neighbors = state.graph.links
          .filter((link: any) => link.source === current || link.target === current)
          .map((link: any) => (link.source === current ? link.target : link.source))

        neighbors.reverse().forEach((neighbor: string) => {
          if (!visited.has(neighbor)) {
            stack.push(neighbor)
          }
        })

        await sleep(state.speed)
      }

      dispatch({ type: "SET_ANIMATING", payload: false })
    },
    [state.isAnimating, state.graph, state.speed, dispatch],
  )

  const startDijkstra = useCallback(
    async (startNode: string) => {
      if (state.isAnimating || !state.graph) return

      dispatch({ type: "SET_ANIMATING", payload: true })

      const distances: Record<string, number> = {}
      const previous: Record<string, string | null> = {}
      const visited = new Set<string>()
      const unvisited = new Set(state.graph.nodes.map((n: any) => n.id))

      state.graph.nodes.forEach((node: any) => {
        distances[node.id] = node.id === startNode ? 0 : Number.POSITIVE_INFINITY
        previous[node.id] = null
      })

      while (unvisited.size > 0) {
        let current: string | null = null
        let smallestDistance = Number.POSITIVE_INFINITY

        for (const node of unvisited) {
          if (distances[node] < smallestDistance) {
            smallestDistance = distances[node]
            current = node
          }
        }

        if (current === null) break

        markNodeAsCurrent(current)
        await sleep(state.speed)

        visited.add(current)
        unvisited.delete(current)
        markNodeAsVisited(current)

        const neighbors = state.graph.links
          .filter((link: any) => link.source === current || link.target === current)
          .map((link: any) => ({
            node: link.source === current ? link.target : link.source,
            weight: link.weight || 1,
          }))

        for (const neighbor of neighbors) {
          if (!visited.has(neighbor.node)) {
            const alt = distances[current] + neighbor.weight
            if (alt < distances[neighbor.node]) {
              distances[neighbor.node] = alt
              previous[neighbor.node] = current
            }
          }
        }

        await sleep(state.speed)
      }

      dispatch({ type: "SET_ANIMATING", payload: false })
    },
    [state.isAnimating, state.graph, state.speed, dispatch],
  )

  const resetGraph = useCallback(() => {
    if (state.isAnimating) return

    const nodes = document.querySelectorAll(".node")
    nodes.forEach((node) => {
      node.setAttribute("fill", "#667eea")
      node.setAttribute("r", "20")
    })
  }, [state.isAnimating])

  return {
    renderGraph,
    resetGraph,
    startBFS,
    startDFS,
    startDijkstra,
  }
}
