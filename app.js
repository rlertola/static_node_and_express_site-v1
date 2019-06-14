const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('public'));
app.set('view engine', 'pug');

const { projects } = require('./data.json');

// Main route; goes to the index page that shows all project thumbnails.
const templateData = { projects };
app.get('/', (req, res) => {
  res.render('index', templateData);
});

// About route.
app.get('/about', (req, res) => {
  res.render('about');
});

// Each project page, e.g., /project2.
// When project thumbnails are clicked it gets routed to one of the project pages.
app.get('/project:id', (req, res, next) => {
  let { id } = req.params;
  if (id > 0 && id <= projects.length) {
    id -= 1;
    const { image_urls } = projects[id];
    const projTemplateData = { id, image_urls, projects };
    res.render('project', projTemplateData);
  } else {
    next();
  }
});

// // Error handling. When site is put in that doesn't exist, routes to custom error page.
app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = `Whoops, you got a ${
    err.status
  } error. That means the page you're looking for doesn't exist. Please try again.`;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

let port = process.env.PORT;
if (port == null || port == '') {
  port = 8000;
}
app.listen(port);
