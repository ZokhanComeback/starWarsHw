const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.get('/:heroId', function(req, res, next) {
  let personName = '';

  const reduceFilms = (films) => {
    return `<ul class="films">${films.map(f => `<li>${f.title}<span>${f.date}</span></li>`).join('')}<ul>`;
  };

  const getFilms = (heroName, films, callback) => {
    const filmsArr = [];
    const getFilm = (index) => {
      axios.get(films[index])
        .then(result => {
          const filmData = {
            title: result.data.title,
            date: result.data.release_date
          }
          filmsArr.push(filmData);
          if (
            index + 1 === films.length
          ) {
            callback(heroName, reduceFilms(filmsArr))
          } else {
            getFilm(index + 1);
          }
        })
    }

    getFilm(0);
  }

  const render = (name, films) => {
    res.render('hero', {name, films});
  }

  axios.get(`https://swapi.dev/api/people/${req.params.heroId}/`)
    .then(result => {
      const {name, films} = result.data;
      getFilms(name, films, render);
    })
});

module.exports = router;
