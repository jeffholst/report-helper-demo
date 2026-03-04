# Report Helper Demo

A React application for interacting with the Harris Computer AI Reports API.

## Features

- Submit JSON data to create reports
- Query reports with natural language questions
- Secure API key handling with show/hide toggle

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup

1. Push your code to the `main` branch
2. Go to your repository Settings > Pages
3. Under "Build and deployment", select "GitHub Actions" as the source
4. The workflow will automatically build and deploy on each push to `main`

### Manual Deployment

You can also deploy manually using:

```bash
npm run deploy
```

This requires the `gh-pages` package and proper repository configuration.

## Usage

1. Enter your API Key
2. Paste your JSON data in the JSON field
3. Enter a unique identifier in the ID Field
4. Click Submit to create a report (Report Key will be populated automatically)
5. Enter a question in the Question field
6. Click Submit to query the report
7. View results in the Results field
