# Futuristic 3D Portfolio

This is a personal portfolio website featuring an interactive 3D interface with a futuristic sphere that serves as the main navigation element.

## Features

- Interactive 3D sphere for navigation
- Sections for: About Me, Projects, Work, Videos, Blog, Socials, and Search
- Vim-like keyboard controls (h/l to navigate, j/k to scroll)
- Responsive design for both mobile and desktop
- Smooth animations and transitions

## Tech Stack

- React
- TypeScript
- ThreeJS / React Three Fiber
- TailwindCSS
- Vite
- Bun runtime

## Development

### Prerequisites

- [Bun](https://bun.sh/) (for package management and runtime)
- [Git](https://git-scm.com/)

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/futuristic-portfolio.git
   cd futuristic-portfolio
   ```

2. Install dependencies
   ```bash
   bun install
   ```

3. Run the development server
   ```bash
   bun run dev
   ```

4. Open your browser at `http://localhost:5173`

## Keyboard Controls

- `h` - Navigate left
- `l` - Navigate right
- `j` - Scroll down (within a section)
- `k` - Scroll up (within a section)
- `Enter` - Select section
- `Escape` - Exit section

## Mobile Controls

- Swipe left/right to navigate between sections
- Tap on the section to select it
- Use the bottom navigation buttons for additional control

## Building for Production

```bash
bun run build
```

## License

[MIT](LICENSE)
