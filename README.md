# Bouncing Balls Exercise

The exercise was developed using React and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
For the purpose of animating the bouncing balls, two React components are being used - Animator and Canvas.
 
The toplevel component is the _Animator_ whose responsibility is to control the creation and animation of the moving objects.

The Animator component renders the _Canvas_ component, whose responsibility is simply to draw the objects on a HTML5 canvas element.

The movement physics of the animated objects is implemented inside the _Ball_ class. 
This class calculates the movement adjustments (deltas) in each frame based on a starting position and velocity of the ball. 
The ball class is also responsible for drawing it's outline on the canvas.

The Animator could easily animate other types of objects (images, rectangles, etc), as long as they implement the draw 
and move methods.

Collision detection between multiple moving objects is implemented in the _CollisionDetector_ class. The collision detector 
works on the basis of splitting the canvas into a grid, each cell sized as the diameter of the moving object. The collision detector 
stores the presence of the moving objects into the cells of the grid. This way when a moving object changes its position, we can check 
if the grid already contains an object on that position. If so, it means that a collision has occurred and the velocities of both 
objects is changed accordingly. 

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
