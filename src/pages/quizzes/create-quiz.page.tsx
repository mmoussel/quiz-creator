import { Box, Button, IconButton, Typography, Stack, Divider, Container } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'

import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const CreateQuiz = () => {
  const navigate = useNavigate()

  const methods = useForm({
    defaultValues: {
      title: '',
    },
  })

  const { handleSubmit } = methods

  const onSubmitForm = () => null

  return (
    <Container
      sx={{
        pt: 14,
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
            onClick={() => navigate(-1)}
          >
            <ArrowBackRoundedIcon sx={{ width: 16, height: 16, resize: 'both' }} />
          </IconButton>

          <Typography variant='h6'>Create Quiz</Typography>
        </Stack>
      </Stack>

      <FormProvider {...methods}>
        <form id='create-quiz-form' onSubmit={handleSubmit(onSubmitForm)}></form>
      </FormProvider>

      <Divider sx={{ my: 3 }} />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Button variant={'outlined'} sx={{ mr: 2 }}>
          Discard
        </Button>

        <Button form='create-quiz-form' variant={'contained'} color='success' type='submit'>
          Save changes
        </Button>
      </Box>
    </Container>
  )
}

export default CreateQuiz
