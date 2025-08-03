# RSS React App: State Management and Context API

## Getting Started

Ensure you have the following installed on your machine:

- [**Node.js**](https://nodejs.org/) (v18 or later recommended)
- [**npm**](https://www.npmjs.com/)

## Installation

Clone the repository and install the dependencies:

`git clone git@github.com:irinaboiko/RSS-REACT2025Q3.git`

`git checkout app-state-management`

`npm install`

## Running the App in Development

To start the development server:

`npm run dev`

## State Management

The application uses **Redux (with Redux Toolkit)**. Redux logic (store, slices, etc.) is located in the `src/store` folder.

## Running Tests

The project uses **Vitest** for testing and **@testing-library/react** for rendering components in tests.

To run all tests:

`npm test`

To run tests with coverage report:

`npm run test:coverage`

Coverage results will be printed in the terminal and saved in the `coverage/` folder.

## Code Quality

### Linting

Run ESLint to check for code issues:

`npm run lint`

### Formatting

Run Prettier to auto-format your code:

`npm run format:fix`
