# Employee Dashboard (frontend-only) written in Angular.js
This repository is meant to serve as part 1 of assignment related to Angular. 

### Folder Structure
```bash
➜  employee-dashboard git:(main) ✗ tree -I node_modules
.
├── angular.json
├── db.json
├── dist
│   └── employee-dashboard
│       ├── 3rdpartylicenses.txt
│       ├── browser
│       │   ├── favicon.ico
│       │   ├── index.csr.html
│       │   ├── index.html
│       │   ├── main-QCIAJMIJ.js
│       │   └── styles-Q2ZAXKP7.css
│       ├── prerendered-routes.json
│       └── server
│           ├── angular-app-engine-manifest.mjs
│           ├── angular-app-manifest.mjs
│           ├── assets-chunks
│           │   ├── index_csr_html.mjs
│           │   ├── index_html.mjs
│           │   ├── index_server_html.mjs
│           │   └── styles-Q2ZAXKP7_css.mjs
│           ├── chunk-L2MVFUKD.mjs
│           ├── chunk-N3SI5I4Q.mjs
│           ├── chunk-RHDGF2TI.mjs
│           ├── chunk-T55IDOPT.mjs
│           ├── index.server.html
│           ├── main.server.mjs
│           ├── polyfills.server.mjs
│           └── server.mjs
├── package.json
├── package-lock.json
├── public
│   └── favicon.ico
├── README.md
├── src
│   ├── app
│   │   ├── app.config.server.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.server.ts
│   │   ├── app.routes.ts
│   │   ├── app.spec.ts
│   │   ├── app.ts
│   │   ├── components
│   │   │   ├── employee-form
│   │   │   │   ├── employee-form.css
│   │   │   │   ├── employee-form.html
│   │   │   │   ├── employee-form.spec.ts
│   │   │   │   └── employee-form.ts
│   │   │   └── employee-list
│   │   │       ├── employee-list.css
│   │   │       ├── employee-list.html
│   │   │       ├── employee-list.spec.ts
│   │   │       └── employee-list.ts
│   │   ├── models
│   │   │   └── employee.interface.ts
│   │   ├── pipes
│   │   │   └── date-format.pipe.ts
│   │   └── services
│   │       └── employee.service.ts
│   ├── index.html
│   ├── main.server.ts
│   ├── main.ts
│   ├── material-theme.scss
│   ├── server.ts
│   └── styles.css
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json

15 directories, 53 files
```
**Purpose:** To learn how `angular.js` works. This is just a simple frontend application that would be used as the UI for part 2 of the assignment with `java`, `springboot` (REST APIs). Angular is an amazing tool when it comes to polyglot projects (_the projects that use multiple languages_). 

#### How to run this?
Clone the repository and run `npm install` followed by `ng serve` (_make sure you have installed `@angular/cli`_). The project should be visible on `PORT:4200`. 

#### Design philosophy used: Material v3
