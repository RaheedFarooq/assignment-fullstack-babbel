# Babbel Assignment Fullstack [ Raheed Farooq ]
This is a Fullstack implementation of Babbel Email Guesser Assignment.

## Project Overview

### Server Implementation

The server-side implementation consists of two main endpoints:

1. **GET /email**
   - Parameters: `firstName`, `lastName`, `domain`
   - Functionality:
     - Checks for existing "colleague" users in the same domain
     - If a colleague exists:
       - Extracts the email address format
       - Creates the current user's email based on this format
     - If no colleague is found:
       - Returns both variations of possible email formats for user selection
     - Returns an `isNew` property to indicate if the domain is new to our system
     - This information is used by the client-side to determine the user flow

2. **POST /email**
   - Body: `fullName`, `email`
   - Functionality:
     - Inserts the new user's email address into our JSON database

### Client Implementation

The client-side features an onboarding flow:

1. Collects user information:
   - First Name
   - Last Name
   - Company Domain

2. Calls the GET /email endpoint to attempt email generation

3. If email address is found:
   - Displays a success screen with:
     - Generated email address
     - Full Name
     - Domain

4. If domain is new to the system:
   - Presents user with two email format options
   - User selects preferred format
   - Calls POST /email endpoint to store new user data
   - Displays a success screen with:
     - Generated email address
     - Full Name
     - Domain
   - This allows the system to recognize the new domain in future requests

### Testing

- A test file for controller functions is located in the `__tests__` folder (server directory)
- Tests cover:
  - Happy path scenarios
  - Implementation errors
  - Validation errors

Note: Due to time constraints, comprehensive testing for all functions and files was not possible. The existing tests aim to demonstrate the testing approach and thought process.

### Potential Improvements

1. **Server-side Database Enhancement**
   - Implement a proper database system
   - Improve JSON data structure:
     - Use email address as the primary identifier instead of full name
     - This allows for multiple organization memberships per person

2. **Prevent Data Overrides**
   - Current system may overwrite existing data if full names match
   - Implement checks to prevent unintended data loss

3. **Client-side State Management**
   - While not necessary for the current scope, a robust state management solution should be considered for future scaling.

4. **.env file**
   - To make this project production ready, we can add an .env file in the client and the server side. This env file would then contain all the necessary information like the PORT_NUMBER, BASE_PATH ( on the client side ), or API keys that we might need. 


## Technologies Used

- Frontend: [React, Typescript]
- Backend: [Node.js, Express, Typescript]
- Database: [JSON data]
- Test: [Jest]

## How to Run the setup

### Server-side (Backend)

1. From the root of the project, navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   yarn install
   ```

3. Start the development server:
   ```
   yarn dev
   ```

4. Start the production server (optional):
   ```
   yarn start
   ```

5. Run tests:
   ```
   yarn test
   ```

### Client-side (Frontend)

1. From the root of the project, navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   yarn install
   ```

3. Start the development server:
   ```
   yarn dev
   ```

4. Build for production (optional):
   ```
   yarn build
   ```

Note: Make sure you have Node.js and Yarn installed on your system before running these commands.

## Project Structure
### Client-side (Frontend)

- `client/`: The root directory for all frontend-related code.
  - `src/`: The source code directory for the React application.
    - `api/`: Api layer to interact with the Server.
    - `components/`: Page components and shared components folder.
    - `hooks/`: Custom Hooks (e.g., useUserData).
    - `pages/`: Layout components for the pages.
    - `theme/`: Universal theme folder for the application.
    - `constants.ts`: Application Constants.
    - `types.ts`: Application Type Definitions.
    - `main.tsx`: Entry point for the React application.
  - `package.json`: Defines the project dependencies and scripts for the frontend.
  - `README.md`: Documentation specific to the frontend part of the project.

### Server-side (Backend)

- `server/`: The root directory for all backend-related code.
  - `src/`: The source code directory for the Express.js application.
    - `__tests__/`: Test folder for backend unit tests.
    - `model.ts`: Database model file.
    - `controller.ts`: Controller functions for the APIs.
    - `types.ts`: Type Definitions for the backend.
    - `utils.ts`: Utility functions and helper methods used in the backend.
    - `data.json`: Temporary static data (treated as database).
    - `index.ts`: Express app setup and routes.
  - `package.json`: Defines the project dependencies and scripts for the backend.
  - `README.md`: Documentation specific to the backend part of the project.

- `README.md`: The main project documentation file, providing an overview of the entire fullstack application.



### Thanks and Best Wishes,
 Raheed Farooq

