# svelte boilerplate

This is a simple svelte and firebase project. It can be run locally by connecting to firebase emulators.

_Note that you will need to have [Node.js](https://nodejs.org) and [Firebase CLI](https://firebase.google.com/docs/cli) installed._

## Get started

Install the dependencies...

```bash
npm install
```

... and start [Firebase emulators](https://firebase.google.com/docs/rules/emulator-setup) (only firestore is used):

```bash
firebase emulators:start --only firestore
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:8080](http://localhost:8080). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

## Building and running in production mode

Before building for production, you need to comment out this line from `src/Firebase.ts` to instruct the app to connect to the production Firebase project instead of local emulators (ideally, this should be setup as an environment variable):

```bash
connectFirestoreEmulator(database, "localhost", 8079);
```

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).

## Deploying to the web

### With [Firebase Hosting](https://firebase.google.com/docs/hosting/quickstart)

From within your project folder:

```bash
npm run build
firebase deploy --only hosting
```

### With [Vercel](https://vercel.com)

Install `vercel` if you haven't already:

```bash
npm install -g vercel
```

Then, from within your project folder:

```bash
cd public
vercel deploy --name my-project
```

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```
