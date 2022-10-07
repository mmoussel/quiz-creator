import { ThemeOptions } from '@mui/material'
import { palette } from './palette'

const textColor = palette?.text

export const typography: ThemeOptions['typography'] = {
  // Tell Material-UI what's the font-size on the html element is.
  htmlFontSize: 10,
  fontFamily: ['Inter'].join(','),
  body1: {
    color: textColor?.primary,
  },
  body2: {
    color: textColor?.secondary,
    fontFamily: ['Inter', 'Regular'].join(','),
  },
  h1: {
    fontFamily: ['Poppins'].join(','),
    color: textColor?.primary,
  },
  h2: {
    fontFamily: ['Poppins'].join(','),
    color: textColor?.primary,
  },
  h3: {
    fontFamily: ['Poppins'].join(','),
    color: textColor?.primary,
  },
  h4: {
    fontFamily: ['Poppins'].join(','),
    color: textColor?.primary,
  },
  h5: {
    fontFamily: ['Poppins'].join(','),
    color: textColor?.primary,
  },
  h6: {
    fontFamily: ['Poppins'].join(','),
    color: textColor?.primary,
  },
}
