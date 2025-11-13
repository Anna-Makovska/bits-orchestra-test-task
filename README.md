Demo WishList

Small demo CRUD application for managing a personal wish list.
Built with React + TypeScript, Context API and a fake REST API powered by json-server.

Tech stack

React (functional components, hooks)

TypeScript

React Router

Context API for global data

CSS Modules for styling

json-server as fake REST API

Prerequisites

Node.js (LTS)

npm

Installation

Clone repo and install dependencies:

git clone <repo-url>
cd <repo-folder>
npm install

Running the app locally

The project uses a fake REST API, so you need two terminals.

1. Start fake API
npm run api


API runs at:

http://localhost:3001/wishes

2. Start React app

Open a second terminal:

npm run dev


Then open:

http://localhost:5173

Available scripts

npm run dev – start Vite dev server

npm run build – build production bundle

npm run preview – preview production build

npm run api – run json-server with db.json