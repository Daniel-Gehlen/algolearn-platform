"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"

export interface AppState {
  currentTopic: string | null
  array: number[]
  originalArray: number[]
  isAnimating: boolean
  speed: number
  step: number
  comparisons: number
  swaps: number
  startTime: number | null
  studiedTopics: Set<string>
  quizzesCompleted: number
  quizAnswered: boolean
  graph: any
  tree: any
}

type AppAction =
  | { type: "SET_TOPIC"; payload: string }
  | { type: "SET_ARRAY"; payload: number[] }
  | { type: "SET_ANIMATING"; payload: boolean }
  | { type: "SET_SPEED"; payload: number }
  | { type: "INCREMENT_COMPARISONS" }
  | { type: "INCREMENT_SWAPS" }
  | { type: "RESET_STATS" }
  | { type: "ADD_STUDIED_TOPIC"; payload: string }
  | { type: "INCREMENT_QUIZZES" }
  | { type: "SET_QUIZ_ANSWERED"; payload: boolean }
  | { type: "SET_GRAPH"; payload: any }
  | { type: "SET_TREE"; payload: any }

const initialState: AppState = {
  currentTopic: null,
  array: [64, 34, 25, 12, 22, 11, 90],
  originalArray: [64, 34, 25, 12, 22, 11, 90],
  isAnimating: false,
  speed: 500,
  step: 0,
  comparisons: 0,
  swaps: 0,
  startTime: Date.now(),
  studiedTopics: new Set(),
  quizzesCompleted: 0,
  quizAnswered: false,
  graph: null,
  tree: null,
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_TOPIC":
      return { ...state, currentTopic: action.payload, quizAnswered: false }
    case "SET_ARRAY":
      return { ...state, array: action.payload }
    case "SET_ANIMATING":
      return { ...state, isAnimating: action.payload }
    case "SET_SPEED":
      return { ...state, speed: action.payload }
    case "INCREMENT_COMPARISONS":
      return { ...state, comparisons: state.comparisons + 1 }
    case "INCREMENT_SWAPS":
      return { ...state, swaps: state.swaps + 1 }
    case "RESET_STATS":
      return { ...state, comparisons: 0, swaps: 0 }
    case "ADD_STUDIED_TOPIC":
      const newStudiedTopics = new Set(state.studiedTopics)
      newStudiedTopics.add(action.payload)
      return { ...state, studiedTopics: newStudiedTopics }
    case "INCREMENT_QUIZZES":
      return { ...state, quizzesCompleted: state.quizzesCompleted + 1 }
    case "SET_QUIZ_ANSWERED":
      return { ...state, quizAnswered: action.payload }
    case "SET_GRAPH":
      return { ...state, graph: action.payload }
    case "SET_TREE":
      return { ...state, tree: action.payload }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider")
  }
  return context
}
