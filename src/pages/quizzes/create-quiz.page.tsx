import { useCallback } from 'react'

import { Box, Button, IconButton, Typography, Stack, Divider, Container } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { BasicInfo, QuestionsForm } from './components'
import { QuizForm } from '../../types'
import { useQuizzes } from '../../hooks/use-quizzes.hook'

const quizDefaultValues: QuizForm = {
  title: '',
  url: '',
  description: '',
  questions_answers: [
    {
      feedback_false: '',
      feedback_true: '',
      text: '',
      answer_id: '',
      id: '',
      answers: [
        {
          text: '',
          id: '',
        },
      ],
    },
  ],
}

const CreateQuiz = () => {
  const navigate = useNavigate()

  const { addQuiz } = useQuizzes()

  const methods = useForm<QuizForm>({
    defaultValues: quizDefaultValues,
  })

  const { handleSubmit } = methods

  const goBack = () => navigate(-1)

  const onSubmitForm: SubmitHandler<QuizForm> = useCallback((event) => {
    const formatedData: QuizForm = {
      ...event,
      questions_answers: event.questions_answers.map((question) => ({
        ...question,
        answers: question.answers.map((answer) => ({
          ...answer,
          is_true: Boolean(question.answer_id === answer.id),
        })),
      })),
    }

    addQuiz(formatedData)
    navigate('/')
  }, [])

  return (
    <Container
      sx={{
        pt: 4,
      }}
    >
      <Stack
        display='flex'
        flexDirection='row'
        alignItems='center'
        my={3}
        justifyContent='space-between'
      >
        <Stack display='flex' flexDirection='row'>
          <IconButton
            sx={{
              width: '30px',
              height: '30px',
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              mr: 2,
            }}
            color='primary'
            onClick={goBack}
          >
            <ArrowBackRoundedIcon sx={{ width: 16, height: 16, resize: 'both' }} />
          </IconButton>

          <Typography variant='h6'>Create Quiz</Typography>
        </Stack>
      </Stack>

      <FormProvider {...methods}>
        <form id='create-quiz-form' onSubmit={handleSubmit(onSubmitForm)}>
          <BasicInfo />

          <Box my={4} />

          <QuestionsForm />
        </form>
      </FormProvider>

      <Divider sx={{ my: 3 }} />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Button variant={'outlined'} sx={{ mr: 2 }} onClick={goBack}>
          Discard
        </Button>

        <Button form='create-quiz-form' variant={'contained'} color='success' type='submit'>
          Create Quiz
        </Button>
      </Box>
    </Container>
  )
}

export default CreateQuiz
