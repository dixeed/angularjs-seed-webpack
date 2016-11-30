# AngularJS Seed project (webpack version)

This is a blank startup project for AngularJS 1.x using the components approach and webpack for the build chain.

## Roadmap
Here the list of functionalities that are currently available in this project seed:

- [ ] Generate sourcemap for development phase
- [ ] Minification for production
- [x] Dev server
- [ ] JSON loading
- [x] CSS loading
- [x] SASS compiling
- [x] ES2015 transpiling
- [ ] ESLint linting
- [ ] Hot Module Replacement
- [ ] Multi-module & lazy loading
- [ ] Unit tests

## Explanation
This section will contain some explanations about the different elements used in the build process and the reasons behind these choices.

### ES2015+ support
This project is using [BabelJS](https://babeljs.io/) to enable the use of next generation JS without waiting on browsers support. We are using the [`latest`](http://babeljs.io/docs/plugins/preset-latest/) preset which regroups ES2015, ES2016 and ES2017 enhancements so far.
If you need to catch up on ES2015, you can find a quick run-through [right here](https://babeljs.io/docs/learn-es2015/).

### SASS
You can find a brief introduction to SASS on the official [website](http://sass-lang.com/guide) in case you need a reminder of the features it offers.

**TL;DR**:
* If you want to use a mixin: `@include mixinName(parameters);`.

#### File structure
[`_media-queries.scss`](app/commons/style/mixins/_media-queries.scss) regroups the media queries mixins used for responsive design. This is where the different breakpoint are defined in regards to the screen size and orientation.

[`_vendors.scss`](app/commons/style/mixins/_vendors.scss) is used for the CSS3 vendor specific prefixes.

[`bootstrap.scss`](app/commons/bootstrap.scss) is the SASS entry file as it gathers all the different files together.

### Plugins
#### webpack.DefinePlugin
Used to define global variables that are configured at compile time. For example we define a [`process.env.NODE_ENV`](webpack.config.js) variable which we can use in our code to make special actions depending on the environment the code is running in. More info see [here](http://webpack.github.io/docs/list-of-plugins.html#defineplugin).

#### HtmlWebpackPlugin
We use the [HtmlWebpackPlugin](https://github.com/ampedandwired/html-webpack-plugin) to generate the script/link tags into our [`app/index.html`](app/index.html) then writing the result into the `dist/` folder.

## License

This code is available under [MIT licence](LICENSE)
