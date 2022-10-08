import React, { createContext, FC, useState, useCallback, useEffect } from 'react'
import { Quiz, QuizForm } from '../types'

interface ProviderProps {
  children: React.ReactNode
}

interface QuizzesContextValue {
  addQuiz: (quiz: QuizForm) => void
  editQuiz: (quiz: Quiz) => void
  quizzes: Quiz[]
  getQuizById: (id: number) => Promise<Quiz>
}

export const QuizzesContext = createContext<QuizzesContextValue>({
  quizzes: [],
  addQuiz: () => null,
  editQuiz: () => null,
  getQuizById: () => new Promise(() => null),
})

export const QuizzesProvider: FC<ProviderProps> = ({ children }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])

  useEffect(() => {
    fetchFromLocalStorage()
  }, [])

  // Save and fetch from localStorage
  const updateLocalStorage = useCallback((newQuizzes: Quiz[]) => {
    localStorage.setItem('quizzes', JSON.stringify(newQuizzes))
  }, [])

  const fetchFromLocalStorage = useCallback(async () => {
    const storedQuizzes = await localStorage.getItem('quizzes')
    storedQuizzes && setQuizzes(JSON.parse(storedQuizzes))
  }, [])

  // Quiz methods

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

  const editQuiz = useCallback(
    (quiz: Quiz) => {
      const quizIndex = quizzes.findIndex((item) => {
        return item.id === quiz.id
      })

      if (quizIndex > -1) {
        setQuizzes((prevState) => {
          prevState.splice(quizIndex, 1, quiz)
          updateLocalStorage(prevState)
          return prevState
        })
      }
    },
    [quizzes],
  )

  const getQuizById = (id: number) => {
    return new Promise<Quiz>((resolve, reject) => {
      const quizIndex = quizzes.findIndex((quiz) => quiz.id === id)

      if (quizIndex > -1) {
        resolve(quizzes[quizIndex])
      } else {
        reject('Not Found')
      }
    })
  }

  return (
    <QuizzesContext.Provider
      value={{
        addQuiz,
        quizzes,
        getQuizById,
        editQuiz,
      }}
    >
      {children}
    </QuizzesContext.Provider>
  )
}
