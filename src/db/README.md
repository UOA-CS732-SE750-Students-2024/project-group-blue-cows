## Technologies

This documentation would explain what Drizzle and Neon is as well as how to this folder operates to get the code connected to the database.

Drizzle is a TypeScript ORM (Object RelationaL Mapper) that allows us to write TypeScript code to directly interact with our database instead of having to painfully write raw SQL. Drizzle is lightweight in nature which results in it being really fast when in comparison to other ORM's like Prisma in terms of performance. Drizzle also provides multiple drivers that allows us to connect to any database of our choice which in our case we using the Neon driver. Below is the documentation to Drizzle ORM

https://orm.drizzle.team/

Neon is a fully managed serverless Postgres with a generous free tier. The benefit of using Neon is that we do not have to spin up our own Docker container to run PostgreSQL database locally and then having to figure out the challenges and cost of hosting this database for our production environment.Think of Neon as something equivalent to MongoDB Cloud Atlas or Firestore but in PostgreSQL.Below is the documentation for Neon.

https://neon.tech/docs/introduction

## Getting Started

We define our Schema in the schema.ts file. There is an example schema already in the file. Upon writing our schema, navigate to the root directory where our package.json file is located and run the yarn scripts below in sequence

```bash
yarn db:generate
yarn db:migrate
```

The first script would generate our TypeScript schema into SQL code which will be located in the migrations folder using drizzle-kit. Below is the official documentation for drizzle-kit

https://orm.drizzle.team/kit-docs/overview

An example of a migration can be found in this folder. The second script would then migrate our SQL schema to Neon database using the migrate.ts file. To simplify this process, there is also another yarn script which runs both of these commands simulatenously.

```bash
yarn db
```

Additionally, there is a third script called seed.ts would automatically populate the database with some data. To perform this action, run the following yarn script. Not this script is merely there to populate the database and to test the database with some dummy data. We will not be running this script otherwise.

```bash
yarn db:seed
```

Finally, the config.ts is where the configuration file is for the neon database that allows us to export the database and perform queries against the database in drizzle syntax. To use the database and schema, visit the db.ts file inside of the src/app/lib which shows an example of how to query the database.
