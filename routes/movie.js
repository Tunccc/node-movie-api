var express = require('express');
var router = express.Router();
const Movie = require('../models/Movie')
/* GET users listing. */

// imdb score Top10 List
router.get('/getAll', (req,res)=>{
  const promise = Movie.find({}).limit(10).sort({imdb_score:1});
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
})

router.get('/getAll', (req,res)=>{
  const promise = Movie.find({});
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
})

router.get('/between/:start_year/:end_year', (req,res)=>{
  const { start_year, end_year} = req.params;
  const promise = Movie.find({
    year: { "$gte": parseInt(start_year), "$lte":parseInt(end_year)}
  });
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
})

router.get('/getAll/:movie_id',(req,res,next)=>{
  const promise = Movie.findById(req.params.movie_id);

  promise.then((movie)=>{
    if(!movie)
    next({message: 'The movie was not found',code:99});
      res.json(movie);
  }).catch((err)=>{
    res.json(err);
  });
});

router.put('/getAll/:movie_id',(req,res,next)=>{
  const promise = Movie.findByIdAndUpdate(
    req.params.movie_id,
    req.body,
    {
      new:true
    }
    );

  promise.then((movie)=>{
    if(!movie)
    next({message: 'The movie was not found',code:99});
      res.json(movie);
  }).catch((err)=>{
    res.json(err);
  });
});

router.delete('/getAll/:movie_id',(req,res,next)=>{
  const promise = Movie.findByIdAndRemove(req.params.movie_id);

  promise.then((movie)=>{
    if(!movie)
    next({message: 'The movie was not found',code:99});
      res.json({status: 1});
  }).catch((err)=>{
    res.json(err);
  });
});

router.post('/post', function(req, res, next) {
  const {title, imdb_score,category,country, year}= req.body;
  
  const movie = new Movie({
    title,
    imdb_score,
    category,
    country,
    year
  })
  // movie.save((err,data) => {
  //   if(err)
  //   res.json(err)

  //   res.json(data)
  // })
  const promise = movie.save();
  promise.then((data)=>{
    res.json(data)
  }).catch((err)=>{
    res.json(err)
  })

});

module.exports = router;
