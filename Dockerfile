FROM node:22.17.1-slim
WORKDIR /app

COPY . .
RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN pnpm build

EXPOSE 8080
CMD ["pnpm", "start", "--port", "8080"]
