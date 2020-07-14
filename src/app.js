import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'
import hbsMiddleware from 'express-handlebars'
import fs from 'fs'
import { fileURLToPath } from 'url';

const app = express()

// view engine setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "../views"))
app.engine(
  "hbs",
  hbsMiddleware({
    defaultLayout: "default",
    extname: ".hbs"
  })
)
app.set("view engine", "hbs")

app.use(logger("dev"))
app.use(express.json())

app.use(express.static(path.join(__dirname, "../public")))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const moviePath = path.join(__dirname, "../movies.json")

const getMovies = () => {
  const fileContents = fs.readFileSync(moviePath).toString()
  return JSON.parse(fileContents)
}

app.get("/", (req, res) => {
  res.send("Bad Movie DataBase")
})

app.get('/bad-movie-remakes/new', (req, res) => {
  res.render('badMovieRemakes/new')
})

app.post('/bad-movie-remakes', (req, res) => {
  let movie = { title: req.body.title, description: req.body.description}
  let movies = getMovies()
  movies.push(movie)
  fs.writeFileSync(moviePath, JSON.stringify(movies))
  res.redirect('/bad-movie-remakes')
})

app.get('/bad-movie-remakes/:movieTitle', (req, res)  => {
  let movies = getMovies()
  let movie = movies.find((movie) => {
    return movie.title === req.params.movieTitle
  })
  if (movie) {
    res.render('badMovieRemakes/show', { movie: movie })
  }else{
    res.status(404).send('CANNOT FIND MOVIE')
  }
})

app.get('/bad-movie-remakes', (req, res) => {
  let movies = getMovies()
  res.render('badMovieRemakes/index', { movies: movies })
})

app.listen(3000, "0.0.0.0", () => {
  console.log("Server is listening...")
})

export default app
