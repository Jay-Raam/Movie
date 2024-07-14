import React, { useState, useEffect } from "react";
import { VscClose } from "react-icons/vsc";
import { LiaUserSolid } from "react-icons/lia";
import "./styles.css";

const MovieDetails = () => {
  const [movieName, setMovieName] = useState("");
  const [selectedMovieName, setSelectedMovieName] = useState([]);
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMovieData = async () => {
    setLoading(true);
    const apiKey = "b2101b20";
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${encodeURIComponent(
          movieName
        )}&apikey=${apiKey}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.Response === "False") {
        throw new Error(data.Error || "Movie not found");
      }
      setMovieData(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching data", error);
      setError(
        error.message || "Error fetching movie details. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const firstFetchMovieData = async () => {
      setLoading(true);
      const movieName = "Avengers"; // Example movie name for demonstration purposes. Replace with your desired movie name.
      const apiKey = "b2101b20";
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?t=${encodeURIComponent(
            movieName
          )}&apikey=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (data.Response === "False") {
          throw new Error(data.Error || "Movie not found");
        }
        console.log(data);
        setMovieData(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching data", error);
        setError(
          error.message ||
            "Error fetching movie details. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    firstFetchMovieData();
  }, []);

  const handleSearch = () => {
    if (movieName.trim() !== "") {
      fetchMovieData();
    }
  };

  const handlePosterClick = () => {
    setSelectedMovieName([movieData]);
  };
  const handleCloseClick = () => {
    setSelectedMovieName([]);
  };

  return (
    <div className="movie">
      <div className="container mx-auto my-0">
        <div className="form flex flex-col md:flex-row justify-center items-center gap-5 mt-5 mb-8">
          <input
            id="text"
            type="text"
            value={movieName}
            autoFocus={true}
            onChange={(e) => setMovieName(e.target.value)}
            placeholder="Movie Name..."
            name="input"
            className="border-black input px-[10px] py-[11px] text-xs bg-[#e8e8e8] border-2 rounded-[5px] w-[210px] focus:outline-none placeholder:text-black/25"
          />
          <button
            onClick={handleSearch}
            className="cursor-pointer transition-all bg-black text-white px-6 py-2 rounded-lg
border-black
border-b-[4px] hover:brightness-110 hover:scale-105
active:border-b-[2px] active:brightness-50 active:translate-y-[2px] w-[117px]"
          >
            Search
          </button>
        </div>
        {loading && (
          <div id="loader">
            <div className="ls-particles ls-part-1"></div>
            <div className="ls-particles ls-part-2"></div>
            <div className="ls-particles ls-part-3"></div>
            <div className="ls-particles ls-part-4"></div>
            <div className="ls-particles ls-part-5"></div>
            <div className="lightsaber ls-left ls-green"></div>
            <div className="lightsaber ls-right ls-red"></div>
          </div>
        )}
        {error && (
          <div className="text-[20px] text-center text-black mb-8">
            Error: {error}
          </div>
        )}
        {movieData && (
          <div className="data flex flex-col gap-3 max-w-[1200px] justify-center items-center mx-auto my-0 mb-6">
            <img
              src={movieData.Poster}
              alt={movieData.Title}
              onClick={handlePosterClick}
              className="cursor-pointer"
            />
            <h2
              onClick={handlePosterClick}
              className="cursor-pointer text-black"
            >
              {movieData.Title}
            </h2>
            {movieData.Actors && (
              <p className="mb-2 text-center">Actors: {movieData.Actors}</p>
            )}
            <p
              onClick={handlePosterClick}
              className="cursor-pointer text-black"
            >
              Director: {movieData.Director}
            </p>
          </div>
        )}
      </div>
      {selectedMovieName.length > 0 && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-lg overflow-y-auto w-full lg:w-[1200px] max-h-full">
            {selectedMovieName.map((selectedMovie) => (
              <div
                key={selectedMovie.imdbID}
                className="mb-8  flex items-center justify-center gap-3 flex-col"
              >
                <span
                  className="close absolute top-[14px] right-6 cursor-pointer xl:right-[19rem] xl:top-10"
                  onClick={handleCloseClick}
                >
                  <VscClose />
                </span>
                {selectedMovie.Poster && (
                  <img
                    src={selectedMovie.Poster}
                    alt="movie poster"
                    className="mb-4 rounded-lg shadow-md mt-3"
                  />
                )}
                <h2 className="text-xl font-bold mb-2 text-center">
                  {selectedMovie.Title}
                </h2>
                <p className="mb-2 text-center">
                  Director: {selectedMovie.Director}
                </p>
                {selectedMovie.Actors && (
                  <p className="mb-2 text-center">
                    Actors: {selectedMovie.Actors}
                  </p>
                )}
                {selectedMovie.Country && (
                  <p className="mb-2 text-center">
                    Country: {selectedMovie.Country}
                  </p>
                )}
                {selectedMovie.Released && (
                  <p className="mb-2 text-center">
                    Released: {selectedMovie.Released}
                  </p>
                )}
                {selectedMovie.BoxOffice && (
                  <p className="mb-2 text-center">
                    BoxOffice: {selectedMovie.BoxOffice}
                  </p>
                )}
                <div className="imdb mb-2 text-center flex justify-center items-center gap-3">
                  <p className="flex flex-col justify-center items-center gap-1">
                    <span>imdbRating</span>
                    {selectedMovie.imdbRating}
                  </p>
                  <p className="flex flex-col justify-center items-center gap-1">
                    <span>imdbVotes</span> {selectedMovie.imdbVotes}
                  </p>
                </div>
                {selectedMovie.Language && (
                  <p className="mb-2 text-center">
                    Language: {selectedMovie.Language}
                  </p>
                )}
                {selectedMovie.Metascore && (
                  <p className="mb-2 text-center">
                    Metascore: {selectedMovie.Metascore}
                  </p>
                )}
                {selectedMovie.Rated && (
                  <p className="mb-2 text-center">
                    Rated: {selectedMovie.Rated}
                  </p>
                )}
                {selectedMovie.Runtime && (
                  <p className="mb-2 text-center">
                    Runtime: {selectedMovie.Runtime}
                  </p>
                )}
                {selectedMovie.Type && (
                  <p className="mb-2 text-center">Type: {selectedMovie.Type}</p>
                )}
                {selectedMovie.Plot && (
                  <p className="mb-2 text-center">Plot: {selectedMovie.Plot}</p>
                )}
                <div className="rating mb-2 text-center flex justify-center items-center gap-3 flex-col md:flex-row">
                  {selectedMovie.Ratings &&
                    selectedMovie.Ratings.map((rating, index) => (
                      <div
                        key={index}
                        className="mb-1 flex justify-center items-start gap-2"
                      >
                        <span className="mt-1">
                          <LiaUserSolid />
                        </span>
                        <div className="flex flex-col justify-center items-center gap-3">
                          {rating.Source && (
                            <p className="font-bold">{rating.Source}</p>
                          )}
                          {rating.Value && <p>{rating.Value}</p>}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
