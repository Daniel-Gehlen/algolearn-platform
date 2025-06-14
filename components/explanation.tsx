"use client"

import { useAppContext } from "@/contexts/app-context"
import { Card } from "@/components/ui/card"
import { Quiz } from "@/components/quiz"
import { algorithmContent } from "@/data/algorithm-content"

export function Explanation() {
  const { state } = useAppContext()

  const getStats = () => {
    const totalMinutes = state.startTime ? Math.floor((Date.now() - state.startTime) / 60000) : 0

    return {
      algorithmsStudied: state.studiedTopics.size,
      totalTime: totalMinutes,
      quizzesCompleted: state.quizzesCompleted,
    }
  }

  const stats = getStats()

  if (!state.currentTopic) {
    return (
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 border-l-2 border-gray-200 overflow-y-auto p-5">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-indigo-600 mb-3">💡 Como usar o AlgoLearn</h3>
            <p className="mb-4">
              Este é um ambiente interativo para aprender algoritmos fundamentais da ciência da computação.
            </p>

            <h3 className="text-lg font-bold text-indigo-600 mb-3">🎯 Recursos Principais:</h3>
            <ul className="space-y-2 mb-4">
              <li>
                <strong>Visualizações Interativas:</strong> Veja algoritmos funcionando em tempo real
              </li>
              <li>
                <strong>Controle de Velocidade:</strong> Ajuste a velocidade das animações
              </li>
              <li>
                <strong>Passo a Passo:</strong> Execute algoritmos passo a passo
              </li>
              <li>
                <strong>Dados Personalizados:</strong> Teste com seus próprios dados
              </li>
            </ul>

            <h3 className="text-lg font-bold text-indigo-600 mb-3">🚀 Começando:</h3>
            <p>
              Selecione um algoritmo no painel esquerdo para ver sua explicação detalhada e visualização interativa.
            </p>
          </div>

          <Card className="p-4 bg-gradient-to-r from-gray-50 to-gray-100">
            <h4 className="font-bold mb-3">📊 Suas Estatísticas (Sessão Atual)</h4>
            <div className="space-y-1 text-sm">
              <p>
                Algoritmos estudados: <span className="font-semibold">{stats.algorithmsStudied}</span>
              </p>
              <p>
                Tempo de estudo: <span className="font-semibold">{stats.totalTime} min</span>
              </p>
              <p>
                Quizzes completados: <span className="font-semibold">{stats.quizzesCompleted}</span>
              </p>
              <p className="text-xs text-gray-600 mt-2">💡 Dados salvos apenas durante esta sessão</p>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  const content = algorithmContent[state.currentTopic]
  if (!content) return null

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 border-l-2 border-gray-200 overflow-y-auto p-5">
      <div className="space-y-6">
        <div dangerouslySetInnerHTML={{ __html: content.explanation }} />

        {state.currentTopic.includes("sort") && (
          <Card className="p-4 bg-gradient-to-r from-gray-50 to-gray-100">
            <h4 className="font-bold mb-3">📊 Estatísticas Atuais:</h4>
            <div className="space-y-1">
              <p>
                Comparações:{" "}
                <span id="comparisons" className="font-semibold">
                  {state.comparisons}
                </span>
              </p>
              <p>
                Trocas:{" "}
                <span id="swaps" className="font-semibold">
                  {state.swaps}
                </span>
              </p>
            </div>
          </Card>
        )}

        <Quiz topic={state.currentTopic} />

        <Card className="p-4 bg-gradient-to-r from-gray-50 to-gray-100">
          <h4 className="font-bold mb-3">📊 Suas Estatísticas (Sessão Atual)</h4>
          <div className="space-y-1 text-sm">
            <p>
              Algoritmos estudados: <span className="font-semibold">{stats.algorithmsStudied}</span>
            </p>
            <p>
              Tempo de estudo: <span className="font-semibold">{stats.totalTime} min</span>
            </p>
            <p>
              Quizzes completados: <span className="font-semibold">{stats.quizzesCompleted}</span>
            </p>
            <p className="text-xs text-gray-600 mt-2">💡 Dados salvos apenas durante esta sessão</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
