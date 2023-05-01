*pokemon-sta*

# **Pokemon Search Them All**

Welcome to the `Pokemon Search Engine`! This app allows you to search for `Pokemon` by typing a search string into the search field. When you click on a search result, a popup appears with more information about the `Pokemon`.

## Installation
To install the app, please follow these steps:

- Clone the repo.
- Run `pnpm i`. If you don't have pnpm installed, you can install it using `npm install -g pnpm`.
- Run `pnpm dev`.
- Navigate to `http://localhost:5173/`.
- To run tests, execute `pnpm test`.

## Features
The app provides the following features:

- You can search for `Pokemon` by typing a search string into the search field.
- Clicking on a search result will show you more information about the `Pokemon`.
- There are two types of requests:
  1. FE Results Filtering radio button - The results of the search will be filtered on the front-end side, matching with the search string.
  2. BE Results Filtering radio button - The response results received from the back-end are already sorted using regex.
- There is a delay on each input (debounce) to prevent multiple requests.
- The search starts with the third letter of the search string.
- All `Pokemon` names can be obtained using the FE Results Filtering radio button after typing any three characters of the search string and then deleting them. Note that this won't work with the other type of search.


## Design and Development
For this app, I used the `GraphQL API` and `Apollo` client. I chose these technologies because of their caching feature, which allows for a minimum number of requests to the server and faster app performance compared to using pure `REST-like API` requests. For the UI library, I used `Chakra UI`, which is flexible and provides everything we need to facilitate the development process. I used `Vite` as the app builder because it is a fast and modern way to develop React applications. For testing, I used Playwright and React Testing Library. The app took approximately 8 hours to complete.

## Future Improvements
There are several potential improvements I could make to the app in the future:

- I could add more tests.
- Refactoring the components would be nice.
- I could highlight the text in each list of items found using a library like `Mark.js`.
- Text input validation could be helpful.
- I could add lazy loading or pagination to handle larger lists of `Pokemon` and improve app performance.