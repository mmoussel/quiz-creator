import { FC, useCallback, useEffect } from 'react'
import { Box, Button, IconButton, TextField } from '@mui/material'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { CardLayout, InputHelperErrorIcon } from '../../../components/shared'
import { QuizForm } from '../../../types'
import CloseIcon from '@mui/icons-material/Close'
import { AnswerForm } from './answer-form.component'

const requiredInputMessage = 'This input is required'
const maximumAnswers = 5

interface Props {
  questionIndex: number
  questionId: string
  canDelete: boolean
  onDelete: (questionIndex: number) => void
}

export const QuestionForm: FC<Props> = ({ questionIndex, canDelete, onDelete, questionId }) => {
  const {
    register,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useFormContext<QuizForm>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions_answers.${questionIndex}.answers`,
  })

  const answersLength = fields.length
  const currntQuestionErrors = errors.questions_answers?.[questionIndex]

  const correctAnswerSelected = watch(`questions_answers.${questionIndex}.answer_id`)

  useEffect(() => {
    setValue(`questions_answers.${questionIndex}.id`, questionId)
  }, [])

  const onAddForm = () => {
    append({
      text: '',
      id: '',
    })
  }

  const onDeleteAnswer = useCallback(
    (answerIndex: number, answerId: string) => {
      if (answersLength > 1) {
        if (answerId === correctAnswerSelected) {
          setValue(
            `questions_answers.${questionIndex}.answer_id`,
            fields[answerIndex ? answerIndex - 1 : 1].id,
          )
        }
        remove(answerIndex)
      }
    },
    [correctAnswerSelected, fields],
  )

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

      {fields.map(
        (field, index) =>
          field.id && (
            <AnswerForm
              key={field.id}
              answerIndex={index}
              answerId={field.id}
              questionIndex={questionIndex}
              onDelete={() => onDeleteAnswer(index, field.id)}
              canDelete={answersLength > 1}
            />
          ),
      )}

      <Box my={3} />
      <Button disabled={answersLength >= maximumAnswers} variant='outlined' onClick={onAddForm}>
        Add answer
      </Button>

      {currntQuestionErrors?.answer_id && (
        <>
          <Box mt={3} />
          <InputHelperErrorIcon text={'Please select the correct answer'} />
        </>
      )}
    </CardLayout>
  )
}
