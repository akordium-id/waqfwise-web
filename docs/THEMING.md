# Theming Guide

This guide explains how to work with the Material UI theme in the WaqfWise frontend application.

## Theme Structure

The theme is organized in the `src/theme/` directory:

```
theme/
├── index.ts          # Main theme configuration
├── palette.ts        # Color palette
├── typography.ts     # Typography settings
├── components.ts     # Component overrides
└── breakpoints.ts    # Responsive breakpoints
```

## Color Palette

Define your application colors in `palette.ts`:

```typescript
export const palette = {
  primary: {
    main: '#2E7D32',    // Islamic green
    light: '#60AD5E',
    dark: '#005005',
  },
  secondary: {
    main: '#F57C00',    // Orange for accents
    light: '#FFB74D',
    dark: '#E65100',
  },
  // ... other colors
}
```

## Typography

Configure fonts and text styles in `typography.ts`:

```typescript
export const typography = {
  fontFamily: '"Roboto", "Arial", sans-serif',
  h1: {
    fontSize: '2.5rem',
    fontWeight: 600,
  },
  // ... other variants
}
```

## Component Overrides

Customize Material UI components globally in `components.ts`:

```typescript
export const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        textTransform: 'none',
      },
    },
  },
  // ... other components
}
```

## Using the Theme

### In Components

Use the `sx` prop to access theme values:

```typescript
import { Box } from '@mui/material'

function MyComponent() {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        p: 2,
        borderRadius: 1,
      }}
    >
      Content
    </Box>
  )
}
```

### With styled() API

```typescript
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}))
```

### Using useTheme Hook

```typescript
import { useTheme } from '@mui/material/styles'

function MyComponent() {
  const theme = useTheme()

  return (
    <div style={{ color: theme.palette.primary.main }}>
      Content
    </div>
  )
}
```

## Responsive Design

Use breakpoints for responsive layouts:

```typescript
<Box
  sx={{
    width: {
      xs: '100%',      // 0-600px
      sm: '80%',       // 600-900px
      md: '60%',       // 900-1200px
      lg: '50%',       // 1200-1536px
      xl: '40%',       // 1536px+
    },
  }}
>
  Content
</Box>
```

## Dark Mode (Optional)

To implement dark mode, create separate palette configurations and use a theme toggle:

```typescript
const getDesignTokens = (mode: 'light' | 'dark') => ({
  palette: {
    mode,
    ...(mode === 'light' ? lightPalette : darkPalette),
  },
})
```

## Best Practices

1. **Consistency**: Use theme values instead of hardcoded colors
2. **Spacing**: Use theme spacing units (multiples of 8px)
3. **Responsive**: Design mobile-first, then add larger breakpoints
4. **Accessibility**: Ensure sufficient color contrast
5. **Performance**: Avoid inline style objects, use `sx` or `styled()`

## Resources

- [Material UI Theming Documentation](https://mui.com/material-ui/customization/theming/)
- [Color Palette Generator](https://mui.com/material-ui/customization/color/)
- [Design Tokens](https://mui.com/material-ui/customization/default-theme/)
