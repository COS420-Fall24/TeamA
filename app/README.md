# Job Searching App

## Overview

This is a website made in React that allows users to discover job postings, request mentors, and connect with potential employers

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Building the App](#building-the-app)
- [Running the App](#running-the-app)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. Install the dependencies:

   ```bash
   npm install
   ```
## Building the app
To build the app, you can execute the following command:
```bash
npm run build
```
This will compile the React interface into a single webpack bundle that can be included as a JavaScript module in the browser.

## Running the App
To begin development on the application, you should run the following commands in order:

```bash
npm run watch
npm run dev
```

This will watch for changes to the React script to restart the building process and start the server using Nodemon, which automatically restarts the server when file changes are detected. The app will be accessible at http://localhost:3000.

You will also need a JSON file called "firebaseCredentials.json" containing the Firebase account credentials. Reach out to Jake over Discord for a copy of this.
