import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useQuizzes } from '../../hooks/use-quizzes.hook'
import { QuizCard } from './components'

const Quizzes = () => {
  const { quizzes } = useQuizzes()

  const renderQuizzes = useMemo(
    () => quizzes.map((quiz) => <QuizCard quiz={quiz} key={quiz.id} />),
    [quizzes],
  )
  return (
    <Container
      sx={{
        pt: 6,
      }}
    >
      <Stack
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          aligntItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant='h4'>Quizzes list</Typography>

        <Link to='/quizzes/create-quiz'>
          <Button variant='contained'>Create new Quizz</Button>
        </Link>
      </Stack>

      <Box mt={6}>{renderQuizzes}</Box>
    </Container>
  )
}

export default Quizzes
