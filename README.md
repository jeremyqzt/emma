# Emma Gists App

This is an sample app for the searching and favouriting git gists.

Favourited gists are only persisted locally.

## Running The Application

There are 2 different ways to run the application

### Option 1 - Using Docker

```
docker compose up
```

This runs the application in a container at: [http://localhost:3000](http://localhost:3000)

### Option 2 - Using Dev

```
npm install # Only required the first time
npm start
```

This runs the application at: [http://localhost:3000](http://localhost:3000)


## Tests
React Testing Library is used for testing. In the project root, run the following:

```
npm test
```

## Retrospectives
This is where I reflect on the project and determine what could have gone better/Implemented differently

 * Better paging support - for the sake of breverity, I omitted paging from the octokit API call (but production wise, it should page for performance reasons)
 * Better error handling - this application has some cases for error handling (i.e. 404 or no gists) and interprets them for the user but this could be more robust
 * `SyntaxHighlighter` state updates - I wish I could have picked a better library for rendering gist content. This library particularily has issues with state updates after unmount. (I've tried a few alternatives but a common issue was slow unmounting, so I ultimately came back to this one)

