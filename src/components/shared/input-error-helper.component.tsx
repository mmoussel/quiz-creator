import React, { FC } from 'react'
import { Stack, Typography } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

interface Props {
  text: string
}

export const InputHelperErrorIcon: FC<Props> = ({ text }) => {
  return (
    <Stack direction='row' component='span' display='flex' alignItems={'center'} mt={1}>
      <ErrorOutlineIcon color='error' />

      <Typography variant='body2' color={'error.main'} mt={0.4} mr={1} ml={1}>
        {text}
      </Typography>
    </Stack>
  )
}
