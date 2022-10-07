import { createTheme, responsiveFontSizes, Theme } from '@mui/material/styles'
import { createBreakpoints } from '@mui/system'

import { components } from './components'
import { palette } from './palette'
import { typography } from './typography'

export const breakpoints = createBreakpoints({})
// A custom theme for this app
let theme: Theme = createTheme({
  palette,
  typography,
  components,
})

theme = responsiveFontSizes(theme)

export default theme
