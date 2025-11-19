# Component Development Guide

This guide provides best practices for developing components in the WaqfWise frontend application.

## Component Structure

### Common Components

Located in `src/components/common/`, these are reusable UI components that can be used throughout the application:

- **Button**: Custom button component with various styles
- **Card**: Card component for content containers
- **DataTable**: Table component for displaying data
- **ErrorBoundary**: Error boundary for handling component errors
- **Loading**: Loading indicators and skeletons

### Layout Components

Located in `src/components/layout/`, these components define the application layout:

- **AppBar**: Top navigation bar
- **Sidebar**: Side navigation menu
- **Footer**: Application footer
- **DashboardLayout**: Main dashboard layout wrapper

### Domain Components

Located in `src/components/domain/`, these are business-specific components:

- **CampaignCard**: Display campaign information
- **DonationForm**: Form for making donations
- **StatisticsWidget**: Display statistics
- **AssetMap**: Map component for displaying waqf assets

## Best Practices

### Component Organization

```typescript
import { FC } from 'react'
import { Box, Typography } from '@mui/material'

interface MyComponentProps {
  title: string
  description?: string
}

export const MyComponent: FC<MyComponentProps> = ({ title, description }) => {
  return (
    <Box>
      <Typography variant="h5">{title}</Typography>
      {description && <Typography>{description}</Typography>}
    </Box>
  )
}
```

### Use TypeScript

- Always define prop types using TypeScript interfaces
- Use proper typing for events, refs, and state

### Material UI Integration

- Use MUI components as building blocks
- Utilize the `sx` prop for styling
- Leverage the theme system for consistent design

### State Management

- Use local state for component-specific data
- Use Zustand/Redux for global application state
- Use React Query for server state

### Performance

- Use `React.memo()` for expensive components
- Implement proper key props in lists
- Use `useMemo` and `useCallback` when appropriate

## Testing Components

```typescript
import { render, screen } from '@testing-library/react'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  it('renders title correctly', () => {
    render(<MyComponent title="Test Title" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })
})
```

## Accessibility

- Use semantic HTML elements
- Include proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers

## Documentation

- Add JSDoc comments for complex components
- Document props and their purpose
- Include usage examples
