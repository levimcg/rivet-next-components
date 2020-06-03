# Rivet Next Components
Experimental components for the next version of Rivet. Included is a live demo hosted on Github Pages for reference:

- [**Top-level navigation (Global header)**](https://levimcg.github.io/rivet-next-components/)
- [**Second-level/sub navigation (Local header)**](https://levimcg.github.io/rivet-next-components/local-property.html)

## About
This repo uses a static site generator called [Eleventy](https://www.11ty.io/) to build the HTML for these components.

### Compiled assets
There are both minified and uncompressed version of the compiled assets in the `dist` folder.

### Implementation details
To use the header you'll need to

1. include a reference to the latest [**Rivet 1.x.x** CSS and JavaScript](https://rivet.iu.edu/components/#hosted-css-and-javascript) in your template.
1. Download and include a reference to the compiled CSS and JavaScript in the `dist` folder in this repo Eg. `path/to/your-static-assets/rivet-next-components.css`.
1. Add the markup for the header to your templates, including all appropriate data attribute/id combos. All of the partials/includes used to build the header markup can be [found in this folder](https://github.com/levimcg/rivet-next-components/tree/master/src/_includes/components/header).
1. Initialize the experimental JavaScript components included in the compiled `dist` folder in this repo.

Once you've included the references to the above compiled CSS and JS and written the markup for the header in your page, you should initialize the components _after_ the included reference to the compiled files somewhere near the closing tag of your main HTML template. You can see an example of this in the `base.njk` [template in this repo](https://github.com/levimcg/rivet-next-components/blob/b3ae045b6129d04996a818c44f93317d2fb23e51/src/_includes/layouts/base.njk#L49).

```html
<script src="https://assets.uits.iu.edu/javascript/rivet/latest/rivet.min.js"></script>
<script src="./js/rivet-next-components.js"></script>
<script>
    // Initialize Additional Javascript components
    RivetNext.toggle.init();
</script>
```

The main JS bundle in this repo is namespaced with `RivetNext`, so to initialize the experimental `toggle` component, you make a call to `Rivet.toggle.init();` before you can use it.

The `toggle` component is only used on the search toggle right now. The rest of the submenu navigation used the Rivet 1.x.x [Dropdown markup and JavaScript documented here](https://rivet.iu.edu/components/navigation/dropdown/).

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

