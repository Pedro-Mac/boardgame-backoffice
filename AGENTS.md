# Agent Guidelines for Boardgame Backoffice

## Build/Lint/Test Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production (runs TypeScript check + Vite build)
- `npm run lint` - Run ESLint
- No test runner configured in this project

## Code Style & Conventions

- **Imports**: Use `@/` path alias for src imports, React imports with `import * as React`
- **Formatting**: Prettier config - no semicolons, single quotes, 2 spaces, trailing commas (ES5)
- **Types**: TypeScript strict mode enabled, explicit types for function params/returns
- **Naming**: camelCase for variables/functions, PascalCase for components, snake_case for API fields
- **Components**: Function declarations, destructured props with TypeScript interfaces
- **File structure**: Services in `/services`, UI components in `/components/ui`, hooks in `/hooks`
- **Styling**: Tailwind CSS with `cn()` utility from class-variance-authority and tailwind-merge
- **State**: Zustand for global state, React Hook Form + Zod for forms
- **Routing**: TanStack Router with file-based routing, type-safe search params
- **Error handling**: Use try/catch in services, return error objects rather than throwing

## Framework Stack

React 19, TanStack Router, TailwindCSS, Radix UI, Zustand, React Hook Form, Zod
