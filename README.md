<h1 align="center">Leboncoin backend</h1>

## Server

**Dependencies**

- Node.js
- Express
- Express-formidable
- Mongoose
- Cloudinary
- Stripe
- Crypto-js
- Uid2
- Cors
- Dotenv

**Architecture**

- Route offer:

  - create offer in mongoDB database
  - get offer from mongoDB database with limit
  - search offer in mongoDB database

- Route user :

  - signup : create crypted password and token, both are saved in mongoDB database
  - login : decrypted password

- Route pay :
  - verify stripeToken
  - stripe charges created
  - save paiement in mongoDB database

## Running the project

Clone this repository :

```
git clone https://github.com/LilaGuill/leboncoin-backend.git
cd leboncoin-backend
```

Install packages :

```
npm install
```

When installation is complete, run the project with:

```
npx nodemon index.js
```

## Client

- React
- HTTP request with axios (get, post)
- Hooks (useState, useEffect)
- React Router Dom
- Handle Cookies
- React stripe elements

## Overview

  <p align="center">
    <img width="500" src="https://github.com/LilaGuill/leboncoin-frontend/blob/master/public/screen.png" alt="capture-1">
  </p>

<p align="center">
  Demo:<a href="https://todolist-react-lg.netlify.com/" target="_blank"> https://todolist-react.netlify.com</a>
</p>

## Leboncoin Client

<a href="https://github.com/LilaGuill/leboncoin-frontend">https://github.com/LilaGuill/leboncoin-frontend</a>

## Deployment

- Client deployed with Netlify
- Server deployed with Heroku
- MongoDb database hosted on Mlab

## Contact

<a href="https://www.linkedin.com/in/lila-guillermic-66542476/" target="_blank">My Linkedin Profil</a>
