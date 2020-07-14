To use this code for a clinic ensure you are on the starter-code branch and then work through the following.


* define getMovies function using `fs.readFileSync(moviePath).toString()`

* create root route sending "Welcome to the BMDB"

* create new route for get action
  - define movie as an object with empty values
  - send the movie object in the render

* create show page
  - use getMovies
  - use .find and req.params.movieTitle
  - conditionally render the show or a 404

* create index
  - use getMovies
  - render with movies:movies

* create post for `"/bad movie-remakes"`
  - create movie using req.body.attr
  - conditonal to ensure attrs are present

  
# bad-movie-remake-clinic
