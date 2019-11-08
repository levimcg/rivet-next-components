# Rivet Next Components
Experimental components for the next version of Rivet.

## About
This repo uses a static site generator called [Eleventy](https://www.11ty.io/) to build the HTML for these components. Compiled CSS and JavaScript is in the `dist` folder.

Included is a live demo hosted on Github Pages for reference:

[**View Live Demo**](https://levimcg.github.io/rivet-next-components/)

## Repo structure
- `src` directory contains all of the uncompiled files (Sass, JavaScript, and HTML templates)
- `src/_includes` contains HTML partials that are used to build the header and footer. I've broken them up into smaller pieces/sub-components to help with readability since they are pretty complicated components. This includes an `icons` folder of SVGs that are included/inlined in the HTML.
- `src/js` Additional JavaScript components: 
    - `toggle` component that is currently used for menu toggles (header) where the stock Rivet dropdown isn't appropriate (eg. dropdown within a dropdown).
    - `sidenav` component
- `src/_data` - a JSON file that is used to generate the navigation structure for these mockups.
- `src/sass` - Sass source files for these new components that make use of [Rivet Sass variables](https://rivet.iu.edu/getting-started/sass/).

## Working with source file
To work with these source files make sure you have node.js and npm install on your local computer.

**Requires npm v5.2+**

```bash
node --version && npm --version
```

1. Clone this repo: `git clone https://github.com/levimcg/rivet-next-components.git`
1. Install dependencies using npm: `npm install`
1. Start local server and watch Sass, Nunjucks, and JavaScript files for changes: `npm run start`

