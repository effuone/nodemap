# Nodemap

## Introduction

Nodemap is an AI-driven SaaS platform for creating visual learning paths. It allows users to select a topic to generate a node-based map for study, drawing inspiration from visual representations similar to roadmap.sh.

## Link to the demo
https://www.youtube.com/watch?v=8zhhIKet7QE&t=1s

## Technical Stack

### Backend

- **Technologies**: Node.js, Nest.js
- **AI Integration**: OpenAI library for content generation.
- **Job Queueing**: Redis with Nest.js BullMQ for managing background tasks.

### Frontend

- **Technologies**: React with Vite.js or Next.js
- **Visualization**: d3.js for force-directed graph representations.
- **UI Components**: @shadcn/ui for customizable UI elements.

## Features

1. **Personal Roadmaps**: Users can generate, customize, and track progress on their learning paths, marking topics as "Completed," "In Process," or "Done."
2. **Sharing Functionality**: Enables users to share their personal roadmaps.
3. **Curated Roadmaps**: Access to a list of popular roadmaps created by the community.

## Setup

1. **Clone Repository**: `git clone https://github.com/effuone/nodemap`.
2. **Install Dependencies**: Run `yarn install` in both API and Web directories.
3. **Environment Configuration**: Rename `.env.example` to `.env` in both api and web directories to update it with your development settings.
4. **Prepare services**: Run `docker-compose -f docker-compose.dev.yml up -d` to run a Docker container with PostgreSQL and Redis databases.
4. **Apply migrations**: Run `npx prisma db push` in API directory to apply Prisma migrations.
5. **Start application**: Execute `yarn start:dev` in API directory and "yarn dev" in web directory to launch the application.
