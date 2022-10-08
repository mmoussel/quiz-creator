import { FC, useEffect } from 'react'
import { Box, Checkbox, IconButton, TextField, Typography } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

import { InputHelperErrorIcon } from '../../../components/shared'
import { QuizForm } from '../../../types'
import CloseIcon from '@mui/icons-material/Close'

const requiredInputMessage = 'This input is required'

interface Props {
  questionIndex: number
  answerIndex: number
  canDelete: boolean
  onDelete: (anwerIndex: number) => void
  feildId: string
}

export const AnswerForm: FC<Props> = ({
  questionIndex,
  answerIndex,
  onDelete,
  canDelete,
  feildId,
}) => {
  const {
    register,
    formState: { errors },
    setValue,
    control,
    watch,
  } = useFormContext<QuizForm>()

  const currntQuestionErrors = errors.questions_answers?.[questionIndex]

  const currentAnswerError = currntQuestionErrors?.answers?.[answerIndex]?.text

  const answerId = watch(`questions_answers.${questionIndex}.answers.${answerIndex}.id`)
  const correctAnswerSelected = watch(`questions_answers.${questionIndex}.answer_id`)

  useEffect(() => {
    if (!answerId) {
      // assign new Id to each answer

      setValue(`questions_answers.${questionIndex}.answers.${answerIndex}.id`, feildId, {
        shouldValidate: true,
      })
    }
  }, [])

  const handleDelete = () => {
    if (answerId === correctAnswerSelected) {
      // delete the answer id from question
      setValue(`questions_answers.${questionIndex}.answer_id`, '', {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
    }
    onDelete(answerIndex)
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          mt: 3,
        }}
      >
        <TextField
          label={`Answer ${answerIndex + 1}`}
          fullWidth
          {...register(`questions_answers.${questionIndex}.answers.${answerIndex}.text`, {
            required: {
              value: true,
              message: requiredInputMessage,
            },
          })}
          error={currentAnswerError ? true : false}
        />

        <Controller
          control={control}
          name={`questions_answers.${questionIndex}.answer_id`}
          rules={{
            required: true,
          }}
          render={({ field: { value, onChange } }) => (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mx: 2,
              }}
            >
              <Checkbox
                checked={value === answerId}
                onChange={(event) => {
                  const isChecked = event.target.checked
                  isChecked && onChange(answerId)
                }}
                color='secondary'
              />
              <Typography
                sx={{
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                }}
              >
                is correct answer
              </Typography>
            </Box>
          )}
        />

        {canDelete && (
          <IconButton onClick={handleDelete}>
            <CloseIcon color='error' fontSize='small' />
          </IconButton>
        )}
      </Box>

      {currentAnswerError && (
        <InputHelperErrorIcon text={(currentAnswerError?.message as string) || ''} />
      )}
    </Box>
  )
}
