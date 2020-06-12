# To Do App

An app for working around to do, and performing some other actions on them. The user can add a todo, mark them complete, unmark them while setting them incomplete again or removing them.


## To get started:

1. Install [NodeJS](http://www.nodejs.org)
2. Download this repo
3. Open the command line of your choice and cd to a sample directory within this repo on your machine
4. `npm install` - Installs packages
5. `npm start` - Builds the project and launch a lite web server (webpack-dev-server).
6. Navigate to [http://localhost:5000/](http://localhost:5000/) if your browser doesn't open automatically.


## Scripts

In the project directory, try running:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

The page will reload if you make edits.

### `npm test`

Launches the test runner.<br>


## Technical Details

The project has been developed using React and Hooks functionality. The data is persistent i.e the data is not lost even after refreshing the page.<br>
The app also has test suite for unit testing. This has been implemented by using Jest and React-testing-library.


## Future Scope Of Improvement

The project can be extended through better handling of todos to relate them to date added such that the user can check when the todo note was created. Also, the functionality to select multiple todos at a time and to apply a particular action on all the selected ones can be added.


