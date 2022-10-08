import { useContext } from 'react'
import { QuizzesContext } from '../contexts'

export const useQuizzes = () => useContext(QuizzesContext)
