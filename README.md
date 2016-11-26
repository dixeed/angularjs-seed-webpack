# AngularJS Seed project (webpack version)

This is a blank startup project for AngularJS 1.x using the components approach and webpack for the build chain.

## Roadmap
Here the list of functionalities that are currently available in this project seed:

- [ ] Generate sourcemap for development phase
- [ ] Minification for production
- [x] Dev server
- [ ] CSS loading
- [ ] SASS compiling
- [ ] ES2015 transpiling
- [ ] ESlint linting
- [ ] Hot Module Replacement
- [ ] Multi-module & lazy loading
- [ ] Unit tests

## Explanation
This section will contain some explanations about the different elements used in the build process and the reasons behind these choices.

### Plugins
#### webpack.DefinePlugin
Used to define global variables that are configured at compile time. For example we define a [`process.env.NODE_ENV`](webpack.config.js) variable which we can use in our code to make special actions depending on the environment the code is running in. More info see [here](http://webpack.github.io/docs/list-of-plugins.html#defineplugin).

#### HtmlWebpackPlugin
We use the [HtmlWebpackPlugin](https://github.com/ampedandwired/html-webpack-plugin) to generate the script/link tags into our [`app/index.html`](app/index.html) then writing the result into the `dist/` folder.

## License

This code is available under [MIT licence](LICENSE)
