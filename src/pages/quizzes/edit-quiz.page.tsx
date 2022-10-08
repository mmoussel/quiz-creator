import { useState, useEffect } from 'react'

import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

import { useQuizzes } from '../../hooks/use-quizzes.hook'
import { Quiz } from '../../types'
import { EditQuizForm } from './components/edit-quiz.component'

const EditQuiz = () => {
  const [quizDefaultData, setQuizDefaultData] = useState<Quiz>()
  const [isLoading, setIsLoading] = useState(false)

  const { getQuizById } = useQuizzes()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    getQuiz()
  }, [])

  const getQuiz = async () => {
    if (id) {
      setIsLoading(true)
      try {
        const response = await getQuizById(+id)
        setQuizDefaultData(response)
        setIsLoading(false)
      } catch (e) {
        setIsLoading(false)
        console.log(e)
      }
    }
  }

  if (!quizDefaultData && !isLoading) {
    return (
      <Typography color='error' variant='h4'>
        Quiz Not Found
      </Typography>
    )
  }

  return (
    <Box>
      {quizDefaultData ? <EditQuizForm defaultValues={quizDefaultData} /> : <h1>Loading ...</h1>}
    </Box>
  )
}

export default EditQuiz
