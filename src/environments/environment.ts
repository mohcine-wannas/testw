// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:9000/tawassol/api/',
  firebase: {
    apiKey: 'AIzaSyB2KYPjG91qb7A_GqaX0OWop3BJuUlgp2U',
    authDomain: 'tawassol-4e2dc.firebaseapp.com',
    databaseURL: 'https://tawassol-4e2dc.firebaseio.com',
    projectId: 'tawassol-4e2dc',
    storageBucket: 'tawassol-4e2dc.appspot.com',
    messagingSenderId: '964483682372'
  }
};
