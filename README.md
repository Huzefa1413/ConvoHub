# ConvoHub

ConvoHub is a social media platform where users can sign up, log in, create posts, view profiles, and interact with other users. Built with React, Firebase, and various other technologies, ConvoHub aims to provide a seamless social networking experience.

## Demo

[Live Demo](fakebook-e256d.web.app/)

## Key Features

- User Authentication (Sign Up, Log In, Log Out)
- Create and manage posts (text and images)
- View and update profile
- Real-time updates of posts and users
- Responsive design

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed
- Firebase project set up
- Cloudinary account (for image uploads)

## Installation

1. Clone the repository

   ```sh
   git clone https://github.com/Huzefa1413/ConvoHub.git
   cd ConvoHub
   ```

2. Install dependencies

   ```sh
   npm install
   ```

## Usage

1. Start the development server

   ```sh
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`

## Deployment

To deploy your app to Firebase Hosting, follow these steps:

1. Install Firebase CLI if you haven't already

   ```sh
   npm install -g firebase-tools
   ```

2. Log in to Firebase

   ```sh
   firebase login
   ```

3. Initialize Firebase in your project

   ```sh
   firebase init
   ```

   - Select Hosting and press Enter
   - Select your Firebase project
   - Choose `build` as the public directory
   - Configure as a single-page app by typing `y`

4. Build your React app

   ```sh
   npm run build
   ```

5. Deploy to Firebase

   ```sh
   firebase deploy
   ```

## Technologies Used

- React
- Firebase Authentication
- Firebase Firestore
- Firebase Hosting
- Cloudinary
- Axios
- Formik
- Yup
- SweetAlert
- Moment.js

## Acknowledgments

- [Firebase Documentation](https://firebase.google.com/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
