# What is the Isnalyserjs?
Islamic scholars model the transmission of Ḥadīth texts using isnād graphs. Nodes represent people transmitting texts and edges denote transmissions of texts between transmitters. Traditionally, such graphs are drawn by hand. As isnād graphs can become really large, this task can be very tedious. The `isnalyserjs` is a simple tool to automate the drawing of isnād graphs. Moreover, our proposed application allows users to interactively inspect their data.
# How can I make changes?

## What should I conider when making changes?

For the development of the `isnalyserjs`, we used the `gitflow` workflow. Each new feature or bugfix is initiated as a new branch and only merged into the development branch once completed. Once enough features have amassed, a release branch can be started. This workflow allows for a transparent development process. For any further development, we recommend to stick to `gitflow`. A detailed introduction to `gitflow` can be found [here](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).



## Where should I make the changes?
The source code is distributed over three files: `index.html`, `app.js`, and `style.css`. The application layout, buttons, third party libraries, and meta information is defined in `index.html`. This file defines what a user sees. So if you introduce any new functionality that should be directly controlled by a user (i.e. through a button, slider, ...), it should be called there. The code for such a functionality itself should be defined in `app.js`. This is really where the 'machinery' of the `isnalyserjs` can be found. So if you have some feature, you would like to add to the `isnalyserjs`, write it down in `Javascript` and put it there. Finally, there is the `style.css`. This is strictly for defining visual aspects of the user interface.

## Implementing an example feature together
Here, we'll go through the steps of introducing a new feature to the `isnalyserjs` together.

- Start from `dev` and initiate a new feature branch with `git flow feature start amazingnewfeature`. Make sure to replace `amazingnewfeature` with a more descriptive name (altough I'm sure that you're new feature is amazing).

- Go to `app.js` and define the functions etc. that you need. Let's say, your feature only requires a single function, called `amazingFunction`. Make sure to summarize its purpose in a doc string.
```js
    function amazingFunction() {
      /** Printing to console. */
      console.log('Hi there...')
    }
```

- If you want users to be able to use your `amazingfunction`, you can create a button in `index.html`. For our example the code might look like this:
```html
    <div> <input type="submit" value="Example" onclick="amazingFunction()" /></div>
```

- Before the next step, make sure to test your feature sufficiently and have clean, commented code. Now, we merge the feature branch into the development branch. With `gitflow` this is done with `git flow feature finish amazingnewfeature`.

Congratulations! You have successfully implemented a feature to the `isnalyserjs`. However, please make sure that it is something more useful than what we have just done.


# Organisation
