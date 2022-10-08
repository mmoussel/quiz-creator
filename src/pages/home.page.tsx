import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useQuizzes } from '../hooks/use-quizzes.hook'

const Home = () => {
  const { quizzes } = useQuizzes()

  return (
    <Container>
      <Box>
        <h1>Home Page</h1>
        <Link to='/quizzes/create-quiz'>
          <Button variant='contained'>Create Quiz</Button>
        </Link>
      </Box>

      {quizzes.map((quiz) => (
        <Stack key={quiz.id}>
          <Typography>{quiz.title}</Typography>
        </Stack>
      ))}
    </Container>
  )
}

export default Home
