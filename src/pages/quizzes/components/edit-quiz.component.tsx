import { useCallback, FC } from 'react'

import { Box, Button, IconButton, Typography, Stack, Divider, Container } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Quiz } from '../../../types'
import { BasicInfo } from './basic-info.component'
import { QuestionsForm } from './questions-form.component'
import { useQuizzes } from '../../../hooks/use-quizzes.hook'

interface Props {
  defaultValues: Quiz
}

export const EditQuizForm: FC<Props> = ({ defaultValues }) => {
  const navigate = useNavigate()
  const { editQuiz } = useQuizzes()

  const methods = useForm<Quiz>({ defaultValues })

  const {
    handleSubmit,
    formState: { isDirty },
  } = methods

  const goBack = () => navigate(-1)

  const onSubmitForm: SubmitHandler<Quiz> = useCallback((event) => {
    const formatedData: Quiz = {
      ...event,
      questions_answers: event.questions_answers.map((question) => ({
        ...question,
        answers: question.answers.map((answer) => ({
          ...answer,
          is_true: Boolean(question.answer_id === answer.id),
        })),
      })),
    }

    editQuiz(formatedData)
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

          <Typography variant='h6'>Edit Quiz</Typography>
        </Stack>
      </Stack>

      <FormProvider {...methods}>
        <form id='edit-quiz-form' onSubmit={handleSubmit(onSubmitForm)}>
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

        <Button
          form='edit-quiz-form'
          variant={'contained'}
          color='success'
          type='submit'
          disabled={!isDirty}
        >
          Save changes
        </Button>
      </Box>
    </Container>
  )
}
