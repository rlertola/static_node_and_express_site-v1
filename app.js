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

// app.get('/project', (req, res) => {
//   res.render('project', templateData);
// });

app.get('/:id', (req, res) => {
  const { id } = req.params;
  const { image_urls } = projects[id];
  const projTemplateData = { id, image_urls, projects };
  res.render('project', projTemplateData);
});


app.listen(3000, () => {
  console.log('The application is running on 3000')
});
