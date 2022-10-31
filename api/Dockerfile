# Builder stage
FROM node:16-alpine AS base
LABEL version="1.0"
LABEL description="This is the base docker image for KidBlur backend"

WORKDIR /home/node/app

COPY ["package.json", "package-lock.json", "./"]
COPY prisma ./prisma/


RUN npm install
COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build


