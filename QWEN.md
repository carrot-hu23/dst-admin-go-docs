# Qwen Code Context for `dst-admin-go-docs`

This directory contains the documentation for the `dst-admin-go` project, built using VitePress.

## Project Overview

- **Purpose**: This project serves as the documentation site for `dst-admin-go`, a Don't Starve Together server management panel developed in Golang.
- **Technology**: It is a static site generated using [VitePress](https://vitepress.dev/), a Vue.js-powered static site generator.
- **Key Files**:
  - `package.json`: Contains project metadata and scripts for development and building.
  - `docs/.vitepress/config.mts`: Main VitePress configuration file.
  - `docs/index.md`: The homepage of the documentation site.
  - `docs/guide/`: Directory containing user guides (getting started, configuration, deployment, docker, nat-vps).
  - `docs/api/`: Directory containing API documentation.

## Building and Running

The `package.json` defines the following scripts for managing the documentation site:

- **Development Server**: `npm run docs:dev`
  - Starts a local development server with hot reloading. The site is typically accessible at `http://localhost:5173`.
- **Build for Production**: `npm run docs:build`
  - Generates the static site files in the `docs/.vitepress/dist` directory (or a similar output directory configured in `config.mts`).
- **Preview Production Build**: `npm run docs:preview`
  - Serves the production build locally for testing.

## Development Conventions

- **Documentation Source**: Markdown files located within the `docs/` directory are used as the source content.
- **Routing**: VitePress automatically generates routes based on the file structure within `docs/`. For example, `docs/guide/getting-started.md` is accessible at `/guide/getting-started`.
- **Configuration**: VitePress settings are managed in `docs/.vitepress/config.mts`.
- **Homepage**: The `docs/index.md` file uses a special frontmatter format to define the layout, hero section, and features for the VitePress default theme home page.
- **Guide Structure**: User guides are organized under the `docs/guide/` directory. Current guides include:
  - `getting-started.md`: Quick start guide.
  - `configuration.md`: Configuration instructions.
  - `deployment.md`: Deployment instructions.
  - `docker.md`: Docker deployment guide.
  - `nat-vps.md`: Guide for NAT VPS environments.
- **API Documentation**: API documentation is placed under the `docs/api/` directory.