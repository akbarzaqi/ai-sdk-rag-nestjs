# Vercel AI SDK + NestJS + Next.js

A monorepo showcasing AI-powered chat with tool calling using Vercel AI SDK, NestJS backend, and Next.js frontend.

## Architecture

- **Backend** (`apps/backend`): NestJS API with streaming chat endpoint and weather tool
- **Frontend** (`apps/web`): Next.js 16 app with AI SDK React for chat UI
- **Shared** (`packages/ui`): Shared React components (WeatherCard)
- **Config** (`packages/*`): Shared ESLint, TypeScript configs

## Features

- **Streaming Chat**: Real-time AI responses via Vercel AI SDK
- **Model Selection**: Choose any compatible model (default: `google/gemini-2.5-flash-lite`)
- **Tool Calling**: AI can call `getWeather` tool to fetch weather data
- **Weather Display**: Rich weather cards rendered in chat
- **Type-Safe**: Full TypeScript across monorepo

## Prerequisites

- Node.js 18+
- pnpm 9+
- API key for your chosen model provider (e.g., Google AI Studio for Gemini)

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment

**Backend** (`apps/backend/.env`):
```env
# Add your model provider API keys dan UI URL
UI_URL= your_ui_url
AI_GATEWAY_API_KEY= your_api_key
```

**Frontend** (`apps/web/.env`):
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Run Development

```bash
# Start all apps (backend on :3001, frontend on :3000)
pnpm dev

# Or individually:
pnpm --filter=backend dev
pnpm --filter=web dev
```

### 4. Open Application

## Usage

1. **Select Model**: Enter any Vercel AI SDK compatible model ID (e.g., `google/gemini-2.5-flash-lite`, `openai/gpt-4o`, `anthropic/claude-3-5-sonnet`)
2. **Chat**: Type messages - the AI responds in real-time
3. **Weather Queries**: Ask "What's the weather in Tokyo?" - AI calls the weather tool and displays a weather card

## API Endpoint

**POST** `/chat`
```json
{
  "messages": [{ "id": "1", "role": "user", "parts": [{ "type": "text", "text": "Hi" }] }],
  "model": "google/gemini-2.5-flash-lite"
}
```

Returns: Streaming UI Message format (text + tool results)

## Available Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `getWeather` | Get current weather for a location | `location: string` |

## Commands

```bash
# Build all
pnpm build

# Lint all
pnpm lint

# Format code
pnpm format

# Type check
pnpm check-types
```

## Project Structure

```
├── apps/
│   ├── backend/          # NestJS API
│   │   └── src/
│   │       └── chat/     # Chat module (controller, service, tools)
│   └── web/              # Next.js frontend
│       ├── app/          # App router pages
│       └── components/   # WeatherCard
└── packages/
    ├── ui/               # Shared React components
    ├── eslint-config/    # Shared ESLint config
    └── typescript-config/# Shared TS configs
```

## Extending Tools

Add new tools in `apps/backend/src/chat/tools.service.ts`:

```typescript
getNewTool() {
  return tool({
    description: 'Tool description',
    inputSchema: z.object({ param: z.string() }),
    execute: async ({ param }) => { /* implementation */ },
  });
}

getAllTools() {
  return {
    getWeather: this.getWeatherTool(),
    newTool: this.getNewTool(),
  };
}
```

