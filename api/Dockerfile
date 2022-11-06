# Builder stage
FROM node:16-alpine AS base
LABEL version="1.0"
LABEL description="This is the base docker image for KidBlur backend"

WORKDIR /home/node/app

COPY package*.json ./

COPY prisma ./prisma/


RUN npm install
COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]

