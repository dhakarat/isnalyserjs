# What is the `isnalyserjs`?
Islamic scholars model the transmission of Ḥadīth texts using isnād graphs. Nodes represent people transmitting texts and edges denote transmissions of texts between transmitters. Traditionally, such graphs are drawn by hand. As isnād graphs can become really large, this task can be very tedious. The `isnalyserjs` is a simple tool to automate the drawing of isnād graphs. Moreover, our proposed application allows users to interactively inspect their data.

# How can I make changes?

The code intended to be easy to work with and is rather simple. Here, we'll go over some prerequisites, an overview, and implement an example feature together.

## Data structure - Transmitters and Transmissions

Before making any changes, here is a quick introduction to the structure of the data. Each isnād should be defined in a *transmitters* file and a *transmissions* file. The folder `example_data/` contains two examples that might be helpful. Rows in the *transmissions* file define nodes. Columns are *Name* (determines node label), *dAH* (denotes transmitter's death data and is used to determine graph layout), and *Origin* (denotes city of origin of a transmitter and is displayed in the info box). *Name* and *dAH* are mandatory.  Names serve as identifiers and are used to describe transmissions in the *transmissions* file. Here, every row defines a transmission/edge between two transmitters. Mandatory columns thus are *From* and *To*. Further information can be given in the columns *FileName* (denotes text and determines edge label) and *TransmissionType* (determines edge style).

## What should I consider when making changes?

For the development of the `isnalyserjs`, we used the `gitflow` workflow. Each new feature or bugfix is initiated as a new branch and only merged into the development branch once completed. Once enough features have amassed, a release branch can be started. This workflow allows for a transparent development process. For any further development, we recommend sticking to `gitflow`. A detailed introduction to `gitflow` can be found [here](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).

## Where should I make the changes?
The source code is distributed over three files: `index.html`, `app.js`, and `style.css`. The application layout, buttons, third party libraries, and meta information is defined in `index.html`. This file defines what a user sees. So if you introduce any new functionality that should be directly controlled by a user (i.e. through a button, slider, ...), it should be called there. The code for such a functionality itself should be defined in `app.js`. This is really where the 'machinery' of the `isnalyserjs` can be found. So if you have some feature, you would like to add to the `isnalyserjs`, write it down in `Javascript` and put it there. Finally, there is the `style.css`. This is strictly for defining visual aspects of the user interface.

## Implementing an example feature together
Here, we'll go through the steps of introducing a new feature to the `isnalyserjs` together. Our feature will be callable by a user through pushing a button and will print something to the console, when called.

- Start from `dev` and initiate a new feature branch with `git flow feature start amazingnewfeature`. Make sure to replace `amazingnewfeature` with a more descriptive name (although I'm sure that you're new feature is amazing).

- Go to `app.js` and define the functions etc. that you need. Let's say, your feature only requires a single function, called `amazingFunction`. Make sure to summarize its purpose in a doc string.
```js
    function amazingFunction() {
      /** Printing to console. */
      console.log('Hi there...')
    }
```
*Quick tip: make sure that the [cache is disabled](https://stackoverflow.com/questions/5690269/disabling-chrome-cache-for-website-development) when debugging you're code. It is often enabled by default. We mainly use the chromium browser as it offers nice developer tools.*

- If you want users to be able to use your `amazingfunction`, you can create a button in `index.html`. For our example the code might look like this:
```html
    <div> <input type="submit" value="Example" onclick="amazingFunction()" /></div>
```

- Before the next step, make sure to test your feature sufficiently and have clean, commented code. Now, we merge the feature branch into the development branch. With `gitflow` this is done with `git flow feature finish amazingnewfeature`.

Congratulations! You have successfully implemented a feature to the `isnalyserjs`. However, please make sure that it is something more useful than what we have just done.

# Organization

Every user is encouraged to be a developer, and more importantly, every developer is encourage to be a user at this point. The development of the `isnalyserjs` is intended to be transparent. To keep it this way, please stick to these conventions. We are aware that this means organizational overhead but we are convinced that it not only helps with transparency but also with staying organized.

## Git

To keep user-developer interaction transparent, we encourage everyone to use **issues**, **pull requests**, and **milestones** as means of communicating bugs, feature requests, and releases. If changes in the code directly address an issue, please mention it in the commit message and flag issues accordingly. Releases are flagged as milestones and should be described through a bunch of features. Setting milestones in advance is a good opportunity to formalize a future release. 

## Documentation

Documentation is in-line. Make sure that any changes you make are properly commented. The purpose of functions should be summarized in a docstring. Any piece of code that is not self-explanatory should be explained with a comment.