# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
=======
# Ecommerce Website (Next Game)

A Ecommerce website built with MERN stack. MongoDB used for the backend with Nodejs and Express to store user data for authentication, purchases, wishlist and user data.

React Router used for navigation. 

## Home Page and Browser Catalog

![App Screenshot](https://imgur.com/QGVOk0E.png)

![App Screenshot](https://imgur.com/X4QelnH.png)

> User can favorite a product to wishlist by clicking on a empty heart.

**Favorite (Mongoose Schema):**

```
{
        id:{
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
            unique: false
        },
        price: {
            type: Number,
            required: true,
            unique: false
        },
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Account'
        }
}

```

## Login/Signup Page

![App Screenshot](https://imgur.com/QckamzV.png)

![App Screenshot](https://imgur.com/VS3hKlP.png)

> User can signup by clicking **Sign Up** and opening the sing up section
> If the user already has an account, it's possible to just login by 
> the login tab and then **Sign In**.

**Account (Mongoose Schema):**

```
{
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  isLogged: {
    type: Boolean,
    required: false,
    unique: false,
    default: false,
  },
  cart: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Cart",
    },
  ],
  wishlist: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Wishlist"
    }
  ]
}
```
>>>>>>> 50ff871da34c8c9698caf8060128bf277db8fdfa
