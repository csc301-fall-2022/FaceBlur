
FROM node:16-alpine as build


# A directory within the virtualized Docker environment
# Becomes more relevant when using Docker Compose later
WORKDIR /usr/src/app

# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./
COPY .env ./
COPY tsconfig.json ./

# Installs all node packages
RUN npm install --force

# Copies everything over to Docker environment
COPY . .

# Uses port which is used by the actual application
EXPOSE 8080

# Finally runs the application
# TODO: add prod serving option
CMD [ "npm", "run", "dev" ]
