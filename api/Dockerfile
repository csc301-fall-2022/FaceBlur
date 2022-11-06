# Builder stage
# https://github.com/prisma/prisma/issues/7755
FROM node:16-alpine as build

LABEL version="1.0"
LABEL description="This is the base docker image for KidBlur backend"

WORKDIR /home/node/app

COPY package*.json ./

COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./

RUN npm install --force
COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]

