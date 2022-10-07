import { ThemeOptions } from '@mui/material'

export const components: ThemeOptions['components'] = {
  MuiButton: {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: {
        fontSize: '15px',
        fontWeight: 500,
        borderRadius: 4,
        boxShadow: 'none',
        textTransform: 'none',
        padding: '0px 24px',
        minHeight: '44px',
        ':hover': {
          boxShadow: 'none',
        },
      },
      containedPrimary: {
        ':hover': {
          boxShadow: 'none',
          background: '#343b48',
        },
      },
      text: {
        ':hover': {
          background: 'none',
        },
      },
    },
  },

  MuiFormHelperText: {
    styleOverrides: {
      root: {
        margin: '0px',
        marginTop: '8px',
      },
    },
  },

  MuiTextField: {
    styleOverrides: {
      root: {
        borderColor: 'rgba(0, 0, 0, 0.12)',
      },
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: {
        color: '#8c8c8c',
      },
    },
  },

  MuiInput: {
    styleOverrides: {
      input: {
        color: '#101928',
        borderColor: 'rgba(0, 0, 0, 0.12)',
      },
    },
  },
}
