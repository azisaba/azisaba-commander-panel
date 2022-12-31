FROM node:18.12.0 AS Builder

WORKDIR /app

# fetch packages
COPY package*.json ./
COPY yarn.lock ./
RUN yarn

# copy files for build
COPY pages/ ./pages/
COPY components/ ./components/
COPY public/ ./public/
COPY styles/ ./styles/
COPY types/ ./types/
COPY utils/ ./utils/
COPY tsconfig.json .
COPY next.config.js .

RUN yarn build

FROM node:18.12.0-alpine AS Runner

WORKDIR /app

COPY --from=Builder /app/package.json ./
COPY --from=Builder /app/node_modules/ ./node_modules/
COPY --from=Builder /app/.next/ ./.next/

EXPOSE 3000

CMD ["yarn", "start"]