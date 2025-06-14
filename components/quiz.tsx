"use client"

import { useState, useEffect } from "react"
import { useAppContext } from "@/contexts/app-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { algorithmContent } from "@/data/algorithm-content"

interface QuizProps {
  topic: string
}

export function Quiz({ topic }: QuizProps) {
  const { state, dispatch } = useAppContext()
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const content = algorithmContent[topic]

  useEffect(() => {
    // Reset quiz when topic changes
    setSelectedOption(null)
    setShowResult(false)
    dispatch({ type: "SET_QUIZ_ANSWERED", payload: false })
  }, [topic, dispatch])

  if (!content?.quiz) return null

  const handleOptionSelect = (optionIndex: number) => {
    if (state.quizAnswered) return

    setSelectedOption(optionIndex)
    setShowResult(true)
    dispatch({ type: "SET_QUIZ_ANSWERED", payload: true })

    if (optionIndex === content.quiz.correct) {
      dispatch({ type: "INCREMENT_QUIZZES" })
      setTimeout(() => {
        alert("🎉 Correto! Parabéns!")
      }, 500)
    } else {
      setTimeout(() => {
        alert("❌ Incorreto. A resposta correta está destacada em verde.")
      }, 500)
    }
  }

  return (
    <Card className="p-5 bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-yellow-300">
      <h4 className="font-bold mb-3 text-lg">🧠 Quiz: {content.title}</h4>
      <p className="font-semibold mb-4">{content.quiz.question}</p>

      <div className="space-y-2">
        {content.quiz.options.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            className={`w-full text-left justify-start p-3 h-auto ${
              showResult
                ? index === content.quiz.correct
                  ? "bg-green-500 text-white border-green-500 hover:bg-green-600"
                  : selectedOption === index && index !== content.quiz.correct
                    ? "bg-red-500 text-white border-red-500 hover:bg-red-600"
                    : "bg-white"
                : "bg-white hover:bg-yellow-100"
            }`}
            onClick={() => handleOptionSelect(index)}
            disabled={state.quizAnswered}
          >
            {option}
          </Button>
        ))}
      </div>
    </Card>
  )
}
