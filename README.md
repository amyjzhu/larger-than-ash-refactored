# larger-than-ash

Run `npm run configure` the first time. Then `npm run build` and then open index.html in a browser.
To test, `npm run test`.

If you don't need both Chrome and Firefox, go into the `karma.config.js` and remove `karma-firefox-launcher` from "plugins" and `firefox` from "browsers" (or `karma-chrome-launcher` and `chrome`).

## Questions

### Why should we run `npm run configure` instead of `npm install`?
Because you also need to install `browserify` globally (this converts server-side code into client-side so you can run the program in your browser.

### Why are we using Karma and Jasmine rather than Mocha and Chai?
Karma is a test runner that supports testing in browsers. Mocha is not particularly well-suited for that.

### How does this program even work?
The typescript is transpiled to javascript, then browserified into a single javascript file. The index.html then loads the combined file.
