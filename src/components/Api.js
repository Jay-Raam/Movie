// f0e7999bbd220478be9bfa7512d31ec5
import React, { useState, useEffect } from "react";
import "./api.css";

const Api = () => {
  const [apiKey] = useState("f0e7999bbd220478be9bfa7512d31ec5");
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchMovies = async (searchQuery) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchNewMovies = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchNewMovies();
  }, [apiKey]);

  const handleSearch = () => {
    searchMovies(query);
  };

  const handleMovieClick = async (movie) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
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
        <button className="btn" onClick={handleSearch}>
          <span className="btn-text-one">Search</span>
          <span className="btn-text-two">your Movie</span>
        </button>
      </div>
      {error && (
        <p style={{ color: "black" }} className="error">
          {error}
        </p>
      )}
      <div className="flex">
        {loading ? (
          <div className="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleMovieClick(movie)}
              className="movies-container"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : "https://via.placeholder.com/200x200"
                }
                alt={movie.title}
                className="gal-1"
              />

              <h2 className="gal-2">{movie.title}</h2>
            </div>
          ))
        )}
      </div>
      {selectedMovie && (
        <div className="modal-container">
          <div
            className="modal-content"
            style={{
              backgroundImage: `linear-gradient(rgb(0 0 0 / 41%), rgb(0 0 0 / 85%)), url('https://image.tmdb.org/t/p/w500/${selectedMovie.backdrop_path}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backdropFilter: "blur(10px)",
            }}
          >
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2 className="gal-2">{selectedMovie.title}</h2>
            <img
              src={
                selectedMovie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`
                  : "https://via.placeholder.com/200x200"
              }
              alt={selectedMovie.title}
              className="gal-4"
            />

            <p className="gal-5">
              {selectedMovie.original_language.toUpperCase()}
            </p>
            <p className="gal-3">{selectedMovie.overview}</p>
            <p className="gal-3">{selectedMovie.release_date} </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Api;
