# React Blog with UmiJS

A personal blog built with React and UmiJS, deployed to GitHub Pages.

## Features

- Modern React components with hooks
- UmiJS for routing and build optimization
- Responsive design for mobile and desktop
- Blog post listing and single post views
- About page with skills and contact information

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/QWangggg/QWangggg.github.io.git
cd QWangggg.github.io
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm start
# or
yarn start
```

The application will be available at http://localhost:8000.

## Building for Production

To build the application for production:

```bash
npm run build
# or
yarn build
```

## Deploying to GitHub Pages

To deploy the application to GitHub Pages:

```bash
npm run deploy
# or
yarn deploy
```

This will build the application and deploy it to the gh-pages branch of your repository.

## Project Structure

```
├── .umirc.ts                # UmiJS configuration
├── package.json             # Project dependencies and scripts
├── public/                  # Static assets
├── src/
│   ├── pages/               # Pages components
│   │   ├── index.tsx        # Home page
│   │   ├── index.less       # Home page styles
│   │   ├── about.tsx        # About page
│   │   ├── about.less       # About page styles
│   │   └── posts/           # Blog post pages
│   │       ├── index.tsx    # Posts list page
│   │       ├── index.less   # Posts list styles
│   │       ├── post.tsx     # Single post page
│   │       └── post.less    # Single post styles
```

## License

This project is licensed under the MIT License.
