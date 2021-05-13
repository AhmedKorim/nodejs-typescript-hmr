# Nodejs HMR boilerplate

### overview

Speed up your nodejs development with webpack HMR, and incremental builds

## Get started

### Run it

```bash
# clone the project
git clone https://github.com/ahmedkorim/nodejs-typescript-hmr

cd nodejs-typescript-hmr
# install packages using yarn
yarn
# run webpack to compile the project
# This should work on the background and once you change a file the changes will applied directly
yarn webpack
# run the app one debug mode
yarn start:hmr
#  or run it via nodejs directly
node ./dist/bin.js

```

### Side Effects

```typescript
  if (module.hot) {
	module.hot.accept()
	console.log('Restarting the app🔃');
	module.hot.dispose(async () => {
		// do side effects
		// close the http server for instance
		await app.asyncClose()
		console.log('App started 🔥🔥');
	})
}
await app.asyncListen(PORT)

```

## features

- Hot Module replacement
- Single output file for easy deployment
- Typescript
- Debugging
- Logger

## todos

- [ ] Add examples for express application
- [ ] Add docker deployment/ github actions
