FROM node:20-alpine AS base
WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml* package-lock.json* yarn.lock* ./

RUN corepack enable && pnpm install --frozen-lockfile --prod=false

COPY . .

RUN pnpm run build

CMD ["node", "dist/index.js"]