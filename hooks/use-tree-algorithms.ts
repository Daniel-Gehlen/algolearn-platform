"use client"

import { useAppContext } from "@/contexts/app-context"
import { useCallback } from "react"

const sampleTrees = {
  "binary-tree": {
    nodes: [
      { id: "50", x: 200, y: 50 },
      { id: "30", x: 100, y: 150 },
      { id: "70", x: 300, y: 150 },
      { id: "20", x: 50, y: 250 },
      { id: "40", x: 150, y: 250 },
      { id: "60", x: 250, y: 250 },
      { id: "80", x: 350, y: 250 },
    ],
    links: [
      { source: "50", target: "30" },
      { source: "50", target: "70" },
      { source: "30", target: "20" },
      { source: "30", target: "40" },
      { source: "70", target: "60" },
      { source: "70", target: "80" },
    ],
  },
  "avl-tree": {
    nodes: [
      { id: "40", x: 200, y: 50 },
      { id: "20", x: 100, y: 150 },
      { id: "60", x: 300, y: 150 },
      { id: "10", x: 50, y: 250 },
      { id: "30", x: 150, y: 250 },
      { id: "50", x: 250, y: 250 },
      { id: "70", x: 350, y: 250 },
    ],
    links: [
      { source: "40", target: "20" },
      { source: "40", target: "60" },
      { source: "20", target: "10" },
      { source: "20", target: "30" },
      { source: "60", target: "50" },
      { source: "60", target: "70" },
    ],
  },
}

export function useTreeAlgorithms() {
  const { state, dispatch } = useAppContext()

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const renderTree = useCallback(
    (topic: string, container: HTMLElement) => {
      container.innerHTML = ""

      const treeData = sampleTrees[topic as keyof typeof sampleTrees] || sampleTrees["binary-tree"]
      dispatch({ type: "SET_TREE", payload: treeData })

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      svg.setAttribute("width", "100%")
      svg.setAttribute("height", "100%")
      svg.setAttribute("viewBox", "0 0 400 320")
      container.appendChild(svg)

      // Draw links
      treeData.links.forEach((link) => {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
        const sourceNode = treeData.nodes.find((n) => n.id === link.source)!
        const targetNode = treeData.nodes.find((n) => n.id === link.target)!

        line.setAttribute("x1", sourceNode.x.toString())
        line.setAttribute("y1", sourceNode.y.toString())
        line.setAttribute("x2", targetNode.x.toString())
        line.setAttribute("y2", targetNode.y.toString())
        line.setAttribute("stroke", "#999")
        line.setAttribute("stroke-width", "2")
        line.setAttribute("class", "tree-link")
        svg.appendChild(line)
      })

      // Draw nodes
      treeData.nodes.forEach((node) => {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
        circle.setAttribute("cx", node.x.toString())
        circle.setAttribute("cy", node.y.toString())
        circle.setAttribute("r", "20")
        circle.setAttribute("fill", "#667eea")
        circle.setAttribute("stroke", "#ffffff")
        circle.setAttribute("stroke-width", "3")
        circle.setAttribute("class", "tree-node")
        circle.setAttribute("data-id", node.id)
        circle.style.cursor = "pointer"

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
    [dispatch],
  )

  const markTreeNodeAsCurrent = (nodeId: string) => {
    const nodes = document.querySelectorAll(".tree-node")
    nodes.forEach((node) => {
      if (node.getAttribute("data-id") === nodeId) {
        node.setAttribute("fill", "#ffd700")
      }
    })
  }

  const markTreeNodeAsVisited = (nodeId: string) => {
    const nodes = document.querySelectorAll(".tree-node")
    nodes.forEach((node) => {
      if (node.getAttribute("data-id") === nodeId) {
        node.setAttribute("fill", "#10b981")
      }
    })
  }

  const traverseTree = useCallback(
    async (startNode: string, traversalType: string) => {
      if (state.isAnimating || !state.tree) return

      dispatch({ type: "SET_ANIMATING", payload: true })
      const visited = new Set<string>()

      const traverse = async (node: string): Promise<void> => {
        if (!node || visited.has(node)) return

        // Pre-order: visit node first
        if (traversalType === "pre-order") {
          markTreeNodeAsCurrent(node)
          await sleep(state.speed)
          visited.add(node)
          markTreeNodeAsVisited(node)
        }

        // Find children
        const children = state.tree.links.filter((link: any) => link.source === node).map((link: any) => link.target)

        // Left child
        if (children.length > 0) await traverse(children[0])

        // In-order: visit node between children
        if (traversalType === "in-order") {
          markTreeNodeAsCurrent(node)
          await sleep(state.speed)
          visited.add(node)
          markTreeNodeAsVisited(node)
        }

        // Right child
        if (children.length > 1) await traverse(children[1])

        // Post-order: visit node last
        if (traversalType === "post-order") {
          markTreeNodeAsCurrent(node)
          await sleep(state.speed)
          visited.add(node)
          markTreeNodeAsVisited(node)
        }
      }

      await traverse(startNode)
      dispatch({ type: "SET_ANIMATING", payload: false })
    },
    [state.isAnimating, state.tree, state.speed, dispatch],
  )

  const resetTree = useCallback(() => {
    if (state.isAnimating) return

    const nodes = document.querySelectorAll(".tree-node")
    nodes.forEach((node) => {
      node.setAttribute("fill", "#667eea")
    })
  }, [state.isAnimating])

  return {
    renderTree,
    resetTree,
    traverseTree,
  }
}
