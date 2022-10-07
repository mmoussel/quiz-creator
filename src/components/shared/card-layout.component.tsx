import { FC } from 'react'
import { Box, SxProps, Typography, Theme } from '@mui/material'

interface Props {
  title: string
  muiSX: SxProps<Theme>
  children: React.ReactNode
}

export const CardLayout: FC<Props> = ({ title, children, muiSX }) => {
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        border: 'solid 1px',
        borderColor: 'divider',
        borderRadius: '4px',
        position: 'relative',
        ...muiSX,
      }}
    >
      <Box
        p={2}
        pl={3}
        borderBottom='solid 1px'
        borderColor='divider'
        display='flex'
        justifyContent='space-between'
      >
        <Typography variant='body1' fontWeight='fontWeightMedium'>
          {title}
        </Typography>
      </Box>

      <Box p={3} pb={2}>
        {children}
      </Box>
    </Box>
  )
}
