// f0e7999bbd220478be9bfa7512d31ec5
import React, { useState, useEffect } from "react";
import "./api.css";

const Api = () => {
  const [apiKey] = useState("f0e7999bbd220478be9bfa7512d31ec5");
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);

  const searchMovies = async (searchQuery) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const foundMovies = data.results || [];

      setMovies(foundMovies);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching movies. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchNewMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const newMovies = data.results || [];

        setMovies(newMovies);
        setError(null);
      } catch (error) {
        console.error("Error fetching new movies:", error);
        setError("Error fetching movies. Please try again later.");
      }
    };

    fetchNewMovies();
  }, [apiKey]);

  const handleSearch = () => {
    searchMovies(query);
  };

  const handleMovieClick = async (movie) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const detailedMovie = await response.json();
      setSelectedMovie(detailedMovie);
      setError(null);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setError("Error fetching movie details. Please try again later.");
    }
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="container">
      <h1 className="title">Movies</h1>
      <div className="search">
        <div className="input-feild">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="main"
            placeholder="Movie"
             autoFocus
          />
        </div>
        <button onClick={handleSearch} className="btn">
          Search
        </button>
      </div>
      {error && <p style={{ color: "black" }} className="error">{error}</p> }
      <div className="flex">
        {movies.map((movie) => (
          <div key={movie.id} onClick={() => handleMovieClick(movie)} className="movies-container">
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.title}
              className="gal-1"
            />
            <h2 className="gal-2">{movie.title}</h2>
            <p className="gal-3">{movie.release_date}</p>
          </div>
        ))}
      </div>
      {selectedMovie && (
        <div className="modal-container">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2 className="gal-2">{selectedMovie.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              className="gal-4"
            />
            <p className="gal-3">{selectedMovie.release_date}</p>
            <p className="gal-3">{selectedMovie.overview}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Api;
