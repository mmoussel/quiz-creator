import { FC } from 'react'
import { Box, IconButton, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import { CardLayout, InputHelperErrorIcon } from '../../../components/shared'
import { QuizForm } from '../../../types'
import CloseIcon from '@mui/icons-material/Close'

const requiredInputMessage = 'This input is required'

interface Props {
  questionIndex: number
  canDelete: boolean
  onDelete: (questionIndex: number) => void
}

export const QuestionForm: FC<Props> = ({ questionIndex, canDelete, onDelete }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<QuizForm>()

  const currntQuestionErrors = errors.questions_answers?.[questionIndex]

  return (
    <CardLayout
      title={`Question ${questionIndex + 1}`}
      rightComponent={
        canDelete && (
          <IconButton disabled={!canDelete} onClick={() => onDelete(questionIndex)}>
            <CloseIcon color='secondary' />
          </IconButton>
        )
      }
      muiSX={{
        mb: 3,
      }}
    >
      <TextField
        label='Question text *'
        fullWidth
        {...register(`questions_answers.${questionIndex}.text`, {
          required: {
            value: true,
            message: requiredInputMessage,
          },
        })}
        error={currntQuestionErrors?.text ? true : false}
        helperText={
          currntQuestionErrors?.text && (
            <InputHelperErrorIcon text={(currntQuestionErrors?.text?.message as string) || ''} />
          )
        }
      />

      <Box my={2} />

      <TextField
        label='Correct feedback *'
        fullWidth
        {...register(`questions_answers.${questionIndex}.feedback_true`, {
          required: {
            value: true,
            message: requiredInputMessage,
          },
        })}
        error={currntQuestionErrors?.feedback_true ? true : false}
        helperText={
          currntQuestionErrors?.feedback_true && (
            <InputHelperErrorIcon
              text={(currntQuestionErrors?.feedback_true?.message as string) || ''}
            />
          )
        }
      />

      <Box my={2} />

      <TextField
        label='Incorrect feedback *'
        fullWidth
        {...register(`questions_answers.${questionIndex}.feedback_false`, {
          required: {
            value: true,
            message: requiredInputMessage,
          },
        })}
        error={currntQuestionErrors?.feedback_false ? true : false}
        helperText={
          currntQuestionErrors?.feedback_false && (
            <InputHelperErrorIcon
              text={(currntQuestionErrors?.feedback_false?.message as string) || ''}
            />
          )
        }
      />
    </CardLayout>
  )
}
