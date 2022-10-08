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
  fieldId: string
  canDelete: boolean
  onDelete: (questionIndex: number) => void
}

export const QuestionForm: FC<Props> = ({ questionIndex, canDelete, onDelete, fieldId }) => {
  const {
    register,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useFormContext<QuizForm>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions_answers.${questionIndex}.answers`,
  })

  const answersLength = fields.length
  const currntQuestionErrors = errors.questions_answers?.[questionIndex]

  const questionId = watch(`questions_answers.${questionIndex}.id`)

  useEffect(() => {
    if (!questionId) {
      // assign new Id to each question

      setValue(`questions_answers.${questionIndex}.id`, fieldId)
    }
  }, [])

  const onAddForm = () => {
    append({
      text: '',
      id: '',
    })
  }

  const onDeleteAnswer = useCallback(
    (answerIndex: number) => {
      if (answersLength > 1) {
        remove(answerIndex)
      }
    },
    [answersLength],
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
              feildId={field.id}
              questionIndex={questionIndex}
              onDelete={onDeleteAnswer}
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
