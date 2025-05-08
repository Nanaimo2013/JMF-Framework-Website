# JMF Framework Website

<div align="center">

[![License](https://img.shields.io/github/license/nanaimo2013/jmf-framework-website?style=for-the-badge)](LICENSE)
[![Release](https://img.shields.io/github/v/release/nanaimo2013/jmf-framework-website?style=for-the-badge)](https://github.com/nanaimo2013/jmf-framework-website/releases)
[![Docker Pulls](https://img.shields.io/docker/pulls/nanaimo2013/jmf-framework-website?style=for-the-badge)](https://github.com/nanaimo2013/jmf-framework-website/pkgs/container/jmf-framework-website)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fjmf-framework.org&style=for-the-badge&label=Website)](https://jmf-framework.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Pterodactyl](https://img.shields.io/badge/Pterodactyl-Compatible-16CBD2?style=for-the-badge)](https://pterodactyl.io/)

</div>

<p align="center">
  <img src="src/assets/jmf-logo.png" alt="JMF Framework Logo" width="180" />
</p>

This is the official website for the JMF Framework, an open-source modern development framework for building full-stack web applications.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Development](#development)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
  - [Building for Production](#building-for-production)
  - [Running with Docker](#running-with-docker)
- [Deployment Options](#deployment-options)
  - [Standard Deployment](#standard-deployment)
  - [Pterodactyl Deployment](#pterodactyl-deployment)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Automatic Updates](#automatic-updates)
- [Security](#security)
- [Performance](#performance)
- [Browser Support](#browser-support)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## ✨ Features

- 🎨 Modern UI design with responsive layouts
- 📚 Information about the framework, its features, and capabilities
- 📖 Documentation section with guides and API references
- 💾 Download page with version history and platform-specific builds
- 👥 About page with information about the team and project
- 📞 Contact page with form and FAQs
- 📜 Terms of Service and Privacy Policy

## 🛠️ Technology Stack

- ![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white) React 18
- ![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?style=flat-square&logo=typescript&logoColor=white) TypeScript
- ![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=flat-square&logo=vite&logoColor=white) Vite
- ![React Router](https://img.shields.io/badge/React_Router-Latest-CA4245?style=flat-square&logo=react-router&logoColor=white) React Router for navigation
- ![CSS3](https://img.shields.io/badge/CSS3-Modern-1572B6?style=flat-square&logo=css3&logoColor=white) CSS for styling
- ![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white) Docker for containerization

## 💻 Development

### Prerequisites

- ![Node.js](https://img.shields.io/badge/Node.js-v16+-339933?style=flat-square&logo=node.js&logoColor=white) Node.js (v16+)
- ![npm](https://img.shields.io/badge/npm-Latest-CB3837?style=flat-square&logo=npm&logoColor=white) npm or yarn

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

## 🚀 Deployment Options

### Standard Deployment

The website can be deployed to any static hosting service like:
- ![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Supported-181717?style=flat-square&logo=github&logoColor=white) GitHub Pages
- ![Netlify](https://img.shields.io/badge/Netlify-Supported-00C7B7?style=flat-square&logo=netlify&logoColor=white) Netlify
- ![Vercel](https://img.shields.io/badge/Vercel-Supported-000000?style=flat-square&logo=vercel&logoColor=white) Vercel
- ![AWS](https://img.shields.io/badge/AWS_S3_+_CloudFront-Supported-232F3E?style=flat-square&logo=amazon-aws&logoColor=white) AWS S3 + CloudFront

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

## 🌐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Base URL for API endpoints | - |
| `SERVER_PORT` | Port for the web server | 80 |
| `GIT_REPO` | Git repository URL for auto-updates | - |
| `PTERODACTYL` | Enable Pterodactyl-specific optimizations | false |

## 📁 Project Structure

```
/src
  /assets         # Static assets like images
  /components     # Reusable UI components
  /pages          # Page components
    /Home
    /Documentation
    /Download
    /About
    /Contact
    /Legal
  /styles         # CSS files
  /utils          # Utility functions
  /context        # React context providers
  /hooks          # Custom React hooks
  App.tsx         # Main app component
  main.tsx        # Entry point
```

## 🔄 Automatic Updates

The project is configured with GitHub Actions workflows to:
1. Build and test on every push to the main branch
2. Create releases and publish Docker images when a tag is pushed

To automatically update your deployment:
1. Create a new tag: `git tag v1.0.0 && git push --tags`
2. The workflow will build, create a release, and publish the Docker image
3. Pull the latest image: `docker pull ghcr.io/nanaimo2013/jmf-framework-website:latest`

## 🔒 Security

- The website uses HTTPS by default
- All dependencies are regularly updated to address security vulnerabilities
- Content Security Policy (CSP) is implemented
- Security headers are properly configured

## ⚡ Performance

- Optimized bundle size
- Code splitting and lazy loading
- Image optimization
- Caching strategies
- CDN-friendly

## 🌍 Browser Support

| Browser | Supported Versions |
|---------|-------------------|
| Chrome | Latest 2 versions |
| Firefox | Latest 2 versions |
| Safari | Latest 2 versions |
| Edge | Latest 2 versions |
| Opera | Latest 2 versions |

## ❓ Troubleshooting

### Common Issues

1. **Port conflicts**: If port 80 is already in use, you can change the port by setting the `SERVER_PORT` environment variable.
2. **Docker permission issues**: You might need to run Docker with sudo or add your user to the Docker group.
3. **Auto-updates not working**: Make sure the Git repository URL is correctly set and the container has internet access.

For more troubleshooting, please open an issue on GitHub.

## 👥 Contributing

[![Contributors](https://img.shields.io/github/contributors/nanaimo2013/jmf-framework-website?style=for-the-badge)](https://github.com/nanaimo2013/jmf-framework-website/graphs/contributors)
[![Issues](https://img.shields.io/github/issues/nanaimo2013/jmf-framework-website?style=for-the-badge)](https://github.com/nanaimo2013/jmf-framework-website/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/nanaimo2013/jmf-framework-website?style=for-the-badge)](https://github.com/nanaimo2013/jmf-framework-website/pulls)

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

We welcome all contributions! Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## 📄 License

[![License](https://img.shields.io/github/license/nanaimo2013/jmf-framework-website?style=for-the-badge)](LICENSE)

This project is licensed under the [MIT License](LICENSE).

## 👨‍💻 Author

This framework is maintained by [nanaimo2013](https://github.com/nanaimo2013).

---

<div align="center">

Built with ❤️ for the JMF Framework community

[![GitHub Stars](https://img.shields.io/github/stars/nanaimo2013/jmf-framework-website?style=for-the-badge)](https://github.com/nanaimo2013/jmf-framework-website/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/nanaimo2013/jmf-framework-website?style=for-the-badge)](https://github.com/nanaimo2013/jmf-framework-website/network/members)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/nanaimo2013?style=for-the-badge)](https://github.com/sponsors/nanaimo2013)

</div>
