/** Global definitions for developement **/

// for JSON loader
declare module '*.json' {
  const object: any;
  export = object;
}

// for style loader
declare module '*.css' {
  const styles: any;
  export = styles;
}

// for redux devtools extension
interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(args?: any): any;
}
