import React, { createContext, FC, useState, useCallback, useEffect } from 'react'
import { Quiz, QuizForm } from '../types'

interface ProviderProps {
  children: React.ReactNode
}

interface QuizzesContextValue {
  addQuiz: (quiz: QuizForm) => void
  quizzes: Quiz[]
}

export const QuizzesContext = createContext<QuizzesContextValue>({
  quizzes: [],
  addQuiz: () => null,
})

export const QuizzesProvider: FC<ProviderProps> = ({ children }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])

  useEffect(() => {
    fetchFromLocalStorage()
  }, [])

  const updateLocalStorage = useCallback((newQuizzes: Quiz[]) => {
    localStorage.setItem('quizzes', JSON.stringify(newQuizzes))
  }, [])

  const fetchFromLocalStorage = useCallback(async () => {
    const storedQuizzes = await localStorage.getItem('quizzes')
    storedQuizzes && setQuizzes(JSON.parse(storedQuizzes))
  }, [])

  const addQuiz = useCallback((quiz: QuizForm) => {
    setQuizzes((prevState) => {
      const nextState = [
        ...prevState,
        {
          ...quiz,
          created: new Date(),
          modified: new Date(),
          score: null,
          id: prevState.length + 1,
        },
      ]
      updateLocalStorage(nextState)
      return nextState
    })
  }, [])

  return (
    <QuizzesContext.Provider
      value={{
        addQuiz,
        quizzes,
      }}
    >
      {children}
    </QuizzesContext.Provider>
  )
}
