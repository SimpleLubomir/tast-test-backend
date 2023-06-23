# Express backend for test task

Fully functioning backend with MongoDB, mongoose, all body and query validators

## Starting guide

There are two ways of running project: via docker and manual

### Via Docker

Go to root page of project and run docker compose up using last version of docker

```bash
docker compose up
```

### Manual

```bash
npm install
## or
yarn install
```

Copy .env.example to .env file and fill in with values:

- PORT (default is `3000`)
- MONGO_CONNECTION (like mongodb://`<url to running mongodb>`/`<database>`) (needed to store data and sessions)
- SECRET (using for session - cookie generation)

Then run `yarn start` or `npm run start`

## Notes

Using needed external libraties like express-validator, express-session, etc. to make to fully functional and protected
in short time
