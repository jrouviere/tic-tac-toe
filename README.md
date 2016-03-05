# Tic-Tac-Toe


## Setup

```bash
# install webpack dev server
npm install -g webpack webpack-dev-server

# install dependencies
npm install

# run tests
npm test

# run webpack dev server
npm run serve
```


## Design

This demo is built with ES6 and React. ES6 code is transpiled to ES5 by Babel with a simple Webpack configuration.

Files breakdown:
* index.html: a straightforward html page to load the javascript app
* style.css: page styling with flexbox, cross and circle are rendered with utf-8 characters
* main.js: all view and UI of the game
* game.js: game business logic
* ai.js: basic decision making for the computer player
* test.js: unit tests built with mocha


## Screenshot

[[https://github.com/jrouviere/tic-tac-toe/blob/master/screenshot.png|alt=tictactoe]]
