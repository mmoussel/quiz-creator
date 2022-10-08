import { Box, Button, Card, Typography } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Quiz } from '../../../types'

interface Props {
  quiz: Quiz
}

export const QuizCard: FC<Props> = ({ quiz }) => (
  <Card
    sx={{
      display: 'flex',
      flexDirection: ['column', 'column', 'row'],
      alignItems: ['flex-start', 'flex-start', 'center'],
      justifyContent: 'space-between',
      p: 4,
      boxShadow: 0,
      border: '1px solid rgba(0,0,0,.125)',
      mb: 2,
      transition: 'transform .2s',
      ':hover': {
        transform: 'scale(1.01)',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 2px 10px 0 rgba(0, 0, 0, 0.19)',
      },
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        mb: {
          xs: 2,
          sm: 2,
          md: 0,
        },
      }}
    >
      <Box>
        <Typography
          variant='h6'
          sx={{
            wordWrap: 'unset',
            display: 'flex',
            flex: 1,
          }}
        >
          {quiz.title} Quiz
        </Typography>
      </Box>
    </Box>

    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        width: ['100%', '100%', 'unset'],
      }}
    >
      <Link to={`edit-quiz/${quiz.id}`}>
        <Button variant='contained' color='success'>
          Edit Quiz
        </Button>
      </Link>
    </Box>
  </Card>
)
