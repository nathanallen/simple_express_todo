##Simple Express Todo

Although not a very practical solution, this learning application demonstrates how one could build a full-CRUD "Todo Style App" using jQuery, front-end templating, and a REST API.

For a more advanced, Single Page App version: please see the `single_page_app branch`.

## Requirements
- Use RESTful API conventions, respond with JSON.
- CRUD routes for all todo resources.

### Arbitrary Limitations
- No Database (only active memory)
- No backend-rendering / EJS.
- No Single Page App (for simplicity) (see the `single_page_app` branch!)

**Frontend Tools**  
- jQuery
- underscore templating

**Backend Tools**  
- express
- path
- body-parser
- method-override

## Setup
Make sure to install npm & bower packages:
``` bash
npm install
bower install
```

To run the server:
``` bash
node index.js
```

or

``` bash
nodemon
```

Then open your browser to `localhost:3000/`.
