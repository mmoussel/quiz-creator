import { Box, Button, Typography } from '@mui/material'
import { useFieldArray, useFormContext } from 'react-hook-form'

import AddIcon from '@mui/icons-material/Add'
import { QuestionForm } from './question-form.component'
import { QuizForm, QuestionForm as QuestionFormInterface } from '../../../types'

const questionDefualtData: QuestionFormInterface = {
  feedback_false: '',
  feedback_true: '',
  text: '',
  answers: [{ text: '', id: '' }],
  id: '',
  answer_id: '',
}

export const QuestionsForm = () => {
  const { control } = useFormContext<QuizForm>()

  const { fields, append, remove } = useFieldArray({
    name: 'questions_answers',
    control,
    shouldUnregister: false,
  })

  const formsLength = fields.length

  const onAddForm = () => {
    append(questionDefualtData)
  }

  const onDeleteForm = (formIndex: number) => {
    formsLength > 1 && remove(formIndex)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant='h6'>Add Questions</Typography>

      <Box mb={3} />

      {fields.map(
        (field, index) =>
          field && (
            <QuestionForm
              questionIndex={index}
              key={field.id}
              canDelete={formsLength > 1}
              onDelete={onDeleteForm}
              fieldId={field.id}
            />
          ),
      )}

      <Button
        startIcon={<AddIcon />}
        variant='outlined'
        onClick={onAddForm}
        sx={{
          borderColor: 'primary.main',
          bgcolor: 'background.main',
          ':hover': { borderColor: 'primary.main' },
        }}
      >
        Add Question
      </Button>
    </Box>
  )
}
