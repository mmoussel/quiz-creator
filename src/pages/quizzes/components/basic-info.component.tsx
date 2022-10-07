import { Box, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'

import { CardLayout, InputHelperErrorIcon } from '../../../components/shared'

const requiredInputMessage = 'This input is required'

export const BasicInfo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <CardLayout title='Basic Info'>
      <TextField
        label='Quiz title *'
        fullWidth
        {...register('title', {
          required: {
            value: true,
            message: requiredInputMessage,
          },
        })}
        error={errors?.title ? true : false}
        helperText={
          errors?.title && <InputHelperErrorIcon text={(errors?.title?.message as string) || ''} />
        }
      />

      <Box my={2} />

      <TextField label='Video Url' fullWidth {...register('url')} />

      <Box my={2} />

      <TextField label='Descriptoin' multiline fullWidth rows={4} {...register('description')} />
    </CardLayout>
  )
}
