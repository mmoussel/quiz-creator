import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Home = () => (
  <div>
    <h1>Home Page</h1>
    <Link to='/quizzes/create-quiz'>
      <Button variant='contained'>Create Quiz</Button>
    </Link>
  </div>
)

export default Home
