# TECL API

## Setup

Use npm to install all the required packages for the project

```bash
npm install
```

Make a copy of the env.example file and rename it to .env. This file is used to store all environment variables.

We are using PostgreSQL for this project, so install it through their installer or through Homebrew. Edit the .env file to have the proper database url.

## Usage

```bash
npm run dev # runs a development server
npm run test # runs all of the tests for the project
npm run build # transpiles the project into the /build folder
npm run start # runs the project from the /build folder
```

## Prisma

Prisma is the ORM used in this project. All of our tables are in the prisma.schema file in the prisma folder. Read their documentation to understand how to edit or add tables. The following is the commands to use when making changes to our tables:

```bash
npx prisma migrate dev # applies new migrations to local db, also used for creating a new migration
npx prisma db push # push the changes from the schema file to the db
npx prisma studio # view database tables in browser
```
