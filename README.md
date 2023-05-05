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
- Note: If API doesn't respond, please open the `/src/config/env.ts` file and set `IS_MOCK_API` to true in order to see the mock data.

## Features
The app provides the following features:

- You can search for `Pokemon` by typing a search string into the search field.
- Clicking on a search result will show you more information about the `Pokemon`.
- There are two types of requests:
  1. FE Results Filtering radio button - The results of the search will be filtered on the front-end side, matching with the search string.
  2. BE Results Filtering radio button - The response results received from the back-end are already sorted using regex.
- There is a delay on each input (debounce) to prevent multiple requests.
- The search starts with the third letter of the search string.


## Design and Development
For this app, I used the `GraphQL API` and `Apollo` client. I chose these technologies because of their caching feature, which allows for a minimum number of requests to the server and faster app performance compared to using pure `REST-like API` requests. The disadvantage of such approach with using `GraphQL` may be that, let's imagine, we already use `REST` on the backend, so developers may not be comfortable to build a `GraphQL` layer between the existing API and the frontend and redirect existing endpoints and responses with data and types to this layer. But the work on the construction of this layer will pay off with the advantages of `GraphQL` in the future.
For the UI library, I used `Chakra UI`, which is flexible and provides everything we need to facilitate the development process. The downside of this UI library is that it is based on `Tailwind` and uses internal library abbreviations or terms to define any `CSS` properties and values, which can be confusing. But using a cheat sheet listing these predefined library names and the supported values they receive can be helpful during development.
For the components styling I used CSS Module stylesheets as it is convenient way to describe style rules for components and has no intersections with other styles.
I used `Vite` as the app builder because it is a fast and modern way to develop `React` applications. The disadvantage of this application builder may be that it does not provide standard support for unit tests compared to `CRA`, so you have to install the desired test library manually and write a couple of lines in the configuration files.
For testing, I used `Playwright` and `React Testing Library`. The app took approximately 8 hours to complete.

## Future Improvements
There are several potential improvements I could make to the app in the future:

- App authorization can be added.
- I could add more tests.
- The page with list of favorites can be implemented.
- I could highlight the text in each list of items found using a library like `Mark.js`.
- Text input validation could be helpful.
- The comparison page can be created for comparison `Pokemons`.
- Routing to particular `Pokemon` by ID can be added to be able to access any pokemon by the link.
- I could add lazy loading or pagination to handle larger lists of `Pokemon` and improve app performance.
- The virtualization of long lists could be helpful here as well in order to increase the app performance while displaying the list with a lot of response data. For example I can use `react-window` library for this purpose.
- The button to display the list of all existing `Pokemons` might be useful as well. It will require the performance improvements techniques mentioned above to display the list with all the results.
