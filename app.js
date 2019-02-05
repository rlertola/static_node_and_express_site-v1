const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('public'));
app.set('view engine', 'pug');

const { projects } = require('./data.json');

let templateData = { projects };
app.get('/', (req, res) => {
  res.render('index', templateData);
})

app.get('/about', (req, res) => {
  res.render('about');
})

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
})

app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  err.message = `Whoops, you got a ${err.status} error. That means the page you're looking for doesn't exist. Please try again.`;
  next(err);
})

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
})

app.listen(3000, () => {
  console.log('The application is running on 3000')
});
