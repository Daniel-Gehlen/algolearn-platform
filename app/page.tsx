"use client"
import { Navigation } from "@/components/navigation"
import { Visualization } from "@/components/visualization"
import { Explanation } from "@/components/explanation"
import { AppProvider } from "@/contexts/app-context"

export default function AlgoLearnPage() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
        <div className="grid grid-cols-[300px_1fr_350px] h-screen gap-px bg-white">
          <Navigation />
          <Visualization />
          <Explanation />
        </div>
      </div>
    </AppProvider>
  )
}
