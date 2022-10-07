import { ThemeOptions } from '@mui/material'

export const palette: ThemeOptions['palette'] = {
  background: {
    default: '#fafbfc',
    paper: '#fff',
  },
  primary: {
    main: '#101928',
    contrastText: '#fff',
    dark: '#0f0a07',
    light: '#d6dadf',
  },
  secondary: {
    main: '#0076ff',
    dark: '#01346f',
    light: '#e5f1ff',
    contrastText: '#fff',
  },
  error: {
    main: '#da2346',
    dark: '#83011a',
    light: '#fbe9ec',
    contrastText: '#fff',
  },
  warning: {
    main: '#fbd64d',
    contrastText: '#fff',
    dark: '#663c00',
    light: '#f8f0d5',
  },
  info: {
    dark: '#fbd64d',
    light: '#fff',
    main: '#663c00',
    contrastText: '#f8f0d5',
  },
  success: {
    main: '#01a36d',
    dark: '#015e3f',
    light: '#e5f5f0',
    contrastText: '#fff',
  },
  text: {
    primary: '#101928',
    secondary: '#68758c',
    disabled: 'rgpa(0, 0, 0, 0.4)',
  },
  action: {
    disabled: 'rgba(0, 0, 0, 0.26)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
    active: 'rgba(0, 0, 0, 0.54)',
    hover: 'rgba(0, 0, 0, 0.04)',
    selected: 'rgba(0, 0, 0, 0.08)',
    focus: 'rgba(0, 0, 0, 0.12)',
  },
  divider: 'rgba(0, 0, 0, 0.12)',
}
