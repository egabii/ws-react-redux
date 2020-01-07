# Watching exchange rate of bitcoin
This application shows data and allows the user to interact, without refreshing the page, and depending in the backend websocket.
The application can be split in two part
Frontend - react-redux SPA, which consume resources from a API, and keep up to date with bitcoin exchange rate
Backend - express + socket.io API that fetches currencies which you can exchanges with bitcoins from [currencies](https://blockchain.info/ticker) and the rate from here [Exchange rate](https://blockchain.info/tobtc?currency=USD&value=500)

# CLIENT SIDE
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Folder Structure
Within source folder (/src) you will find

```
src
└── assets                  ** here we keep saving static svg and images that we could use in our app
└── components              ** keep all the presentational components here 
└── containers              ** keep all stateful components and/or connectec components (connect to redux)
└── providers               ** keep services and helpers here so you can keep actionCreators simple as much as possible
└── state                   ** here come the app reducers and actions, as well as the store configuration
|       └── actions
|       └── reducers
|       └── store.js
└── app.js
└── app.module.css
└── index.js
└── serviceWorker.js
└── setupTests.js
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

# SERVER SIDE
### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test` (pending TO-DO )