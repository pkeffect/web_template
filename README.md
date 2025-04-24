# Web Template

A lightweight, dockerized web template with hot-reloading for rapid development, featuring both dark and light themes with GitHub-inspired design.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Docker](https://img.shields.io/badge/docker-compatible-green.svg)
![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)

## Features

- **Dark & Light Themes**: Toggle between themes with persistent preferences
- **GitHub-Inspired UI**: Modern header with search, dropdowns, and notifications
- **Loading Screen**: Smooth page load experience with animated loading indicator
- **Hot Reloading**: Instant browser refresh on code changes
- **Modular Architecture**: Separated HTML, CSS, and JavaScript files
- **Component Library**: Ready-to-use UI components like buttons, cards, and alerts
- **Docker Integration**: Containerized for consistent development environments
- **Responsive Layout**: Mobile-friendly design with adaptive components
- **Utility Classes**: Comprehensive set of helper classes for rapid styling

## Quick Start

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/pkeffect/web-template.git
   cd web-template
   ```

2. Start the Docker container:
   ```bash
   docker compose up -d
   ```

3. Access the website:
   ```
   http://localhost:8080
   ```

## Development

The project is set up with hot-reloading, so any changes to the files in the `src` directory will automatically trigger a browser refresh.

### Project Structure

```
web-template/
├── src/
│   ├── index.html              # Main index page
│   ├── templates/              # Template components
│   │   ├── base.html           # Base HTML template
│   │   ├── header.html         # Header component
│   │   └── footer.html         # Footer component
│   ├── css/
│   │   ├── main.css            # Main shared styles
│   │   ├── dark-theme.css      # Dark theme styles
│   │   ├── light-theme.css     # Light theme styles
│   │   ├── components.css      # UI component styles
│   │   ├── utilities.css       # Utility classes
│   │   └── loading.css         # Loading screen styles
│   ├── js/
│   │   ├── main.js             # Main JavaScript functionality
│   │   ├── theme.js            # Theme switching logic
│   │   └── loading.js          # Loading screen manager
│   ├── img/                    # Images directory
│   │   └── icons/              # SVG icons
│   └── favicon.svg             # Site favicon
├── docker-compose.yml          # Docker Compose configuration
├── Dockerfile                  # Docker container configuration
└── README.md                   # Project documentation
```

### Docker Commands

- **Start container**: `docker compose up -d`
- **View logs**: `docker compose logs -f`
- **Stop container**: `docker compose down`
- **Rebuild container**: `docker compose up -d --build`

## Themes

### Theme Switching

The template includes a complete dark/light theme system:

- **Theme Toggle**: Click the sun/moon icon in the header to switch themes
- **Persistence**: User preferences are saved in localStorage
- **System Preference**: Defaults to the user's OS preference if no saved preference
- **CSS Variables**: All colors and styles are managed through CSS custom properties

### Customizing Themes

To adjust theme colors, modify the CSS variables in:
- `src/css/dark-theme.css` - For dark theme colors
- `src/css/light-theme.css` - For light theme colors

## Components

The template includes a variety of pre-styled components:

- **Buttons**: Primary, secondary, danger, and outline variants
- **Cards**: Content containers with optional headers
- **Alerts**: Success, error, and warning notifications
- **Form Elements**: Inputs, selects, and labels
- **Navigation**: Header nav, dropdowns, and mobile menu
- **Hero Section**: Large title section for landing pages
- **Feature Lists**: Icon + content list items

## Loading Screen

The template includes a loading screen that:

- Shows immediately when the page begins loading
- Displays a spinner animation and progress bar
- Tracks and reports loading progress of resources
- Fades out smoothly when content is ready
- Prevents showing partially loaded content

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
