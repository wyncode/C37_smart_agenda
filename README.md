# Final Project

## Setup

- `git clone` this repo
- `cd` into it.
- `yarn install`
- `cd client && yarn install`
- `cp .env.sample .env`

## Available build commands

- `yarn dev`: Runs BOTH your Express.JS and React developer environment locally at the same time. Any logs coming from Express will be prefaced with `[0]`, any logs from `create-react-app` will be prefaced with `[1]`.
- `yarn server`: Runs JUST your Express.JS server.
- `yarn client`: Runs JUST your front-end React app.

Open [http://localhost:3000](http://localhost:3000) to view your local React app in the browser. The page will reload if you make edits.

## To deploy

NOTE: Heroku specifically runs `npm start`, so don't remove that from your package.json file.

- `heroku create your-app-name`
- `heroku config:set MONGODB_URL=<insertYourAtlasDbUri>`
- `git push heroku master`

############################################
## Setup backend

- install MongoDB
- install Mongoose
- install Express


# Packages:

Run backend and frontend at same time
- install concurrently

Validate strings 
- install validator

To encrypt passwords 
- install bcryptjs

Authorization
- install jsonwebtoken

To upload images
- install multer

To process and resize image
- install sharp

For styling
- install react-bootstrap

For dates/times
- install moment

For map feature
- install mapbox-gl 
