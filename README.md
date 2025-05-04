# JMF Framework Website

This is the official website for the JMF Framework, an open-source modern development framework for building full-stack web applications.

## Features

- Modern UI design with responsive layouts
- Information about the framework, its features, and capabilities
- Documentation section with guides and API references
- Download page with version history and platform-specific builds
- About page with information about the team and project

## Technology Stack

- React 18
- TypeScript
- Vite
- React Router for navigation
- CSS for styling
- Docker for containerization

## Development

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Getting Started

1. Clone the repository:
```bash
git clone https://github.com/nanaimo2013/jmf-framework-website.git
cd jmf-framework-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

### Running with Docker

1. Build the Docker image:
```bash
docker build -t jmf-framework-website .
```

2. Run the container:
```bash
docker run -p 80:80 jmf-framework-website
```

3. Access the website at `http://localhost`

## Deployment Options

### Standard Deployment

The website can be deployed to any static hosting service like:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront

### Pterodactyl Deployment

This project includes support for deploying via the Pterodactyl game server panel.

#### Using the Pterodactyl Egg

1. Import the `egg-jmf-framework.json` into your Pterodactyl panel
2. Create a new server using the JMF Framework Website egg
3. Configure the server with the appropriate settings:
   - Server Port (default: 80)
   - Git Repository (optional for auto-updates)

#### Manual Installation

You can also use the provided install script:

```bash
curl -sSL https://raw.githubusercontent.com/nanaimo2013/jmf-framework-website/main/install.sh | bash
```

## Environment Variables

- `VITE_API_URL`: Base URL for API endpoints (if applicable)
- `SERVER_PORT`: Port for the web server (default: 80)
- `GIT_REPO`: Git repository URL for auto-updates (optional)
- `PTERODACTYL`: Enable Pterodactyl-specific optimizations (true/false)

## Project Structure

```
/src
  /assets         # Static assets like images
  /components     # Reusable UI components
  /pages          # Page components
    /Home
    /Documentation
    /Download
    /About
  /styles         # CSS files
  App.tsx         # Main app component
  main.tsx        # Entry point
```

## Automatic Updates

The project is configured with GitHub Actions workflows to:
1. Build and test on every push to the main branch
2. Create releases and publish Docker images when a tag is pushed

To automatically update your deployment:
1. Create a new tag: `git tag v1.0.0 && git push --tags`
2. The workflow will build, create a release, and publish the Docker image
3. Pull the latest image: `docker pull ghcr.io/nanaimo2013/jmf-framework-website:latest`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## License

[MIT License](LICENSE)

## Author

This framework is maintained by [nanaimo2013](https://github.com/nanaimo2013).

---

Built with ❤️ for the JMF Framework community
