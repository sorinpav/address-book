# Address Book Project

## Netlify link for deployed version: [https://findeer.netlify.com](https://findeer.netlify.com)

This project is meant to: 

* Store, show, update and delete the user's contacts
* Search for these contacts (filter them)


## Tech stack behind it: 

The project is a Fullstack Contact Keeper Web App.

The Backend is done with Express. Persistent storage is achieved by MongoDB.

It uses React on the Front-End, and it's been bootstrapped with `create-react-app`. 
In case you want to document yourself about how to start a project in React, here's a [link](https://reactjs.org/docs/create-a-new-react-app.html)

The project is using the context API. 
For larger projects, I recommend using Redux instead. 


### The contextAPI is used as follows: 

Each used context is written in 3 files: 

1. ...Context => Where the context is initialised
1. ...State => Where all the methods used are declared
1. ...Reducer => Where all the payloads sent from the methods are handled 

In this case, `...` represents any Context Name (i.e. for the alert context, we have AlertContext, AlertState, AlertReducer)

### To run the project, please execute the `Available Scripts` in the order shown.

## Available Scripts

To run the project, you need to execute: 

### `npm install` 

This installs all the dependencies needed for the project

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will auto reload if you make edits.
