# 362-Project-Group-4

Realtor Instagram Clone

### Using npm

Make sure you have Node.js and npm installed

```bash
> node -v
> npm -v
```

If it isn't installed, then install it through nvm ([Windows](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows#install-nvm-windows-nodejs-and-npm), [Linux/MacOS](https://github.com/nvm-sh/nvm#installing-and-updating))

In the repo folder run

```bash
> npm install
```

Then start up the dev server. It should automatically open [http://localhost:3000](http://localhost:3000).

```bash
> npm start
```

### Using Docker (Recommended)

Make sure you have Docker installed

```
> docker -v
```

If it isn't installed, install Docker ([Windows](https://docs.docker.com/desktop/install/windows-install/), [Linux](https://docs.docker.com/desktop/install/linux-install/), [MacOS](https://docs.docker.com/desktop/install/mac-install/))

In the repo folder run

```bash
> docker-compose up
```

And now go to [http://localhost:3000](http://localhost:3000)

#### Commands

| Command          | Description                           |
| ---------------- | ------------------------------------- |
| `npm install`    | Install the dependencies              |
| `npm start`      | Start a dev server with HMR           |
| `npm run build`  | Build minified bundles ready for prod |
| `npm run lint`   | Lints files with ESLint               |
| `npm run format` | Formats files using prettier          |
