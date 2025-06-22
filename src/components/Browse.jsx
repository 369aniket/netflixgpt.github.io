import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';
import Header from './Header';
import Accordian from './accordion/Accordian';
import Footer from './Footer';

const Browse = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [accordionData, setAccordionData] = useState([]);
  const [playingMovie, setPlayingMovie] = useState(null);

  const fetchData = async () => {
    try {
      const [usersRes, accordionRes] = await Promise.all([
        fetch('http://localhost:8000/users'),
        fetch('http://localhost:8000/accordion'),
      ]);

      if (!usersRes.ok || !accordionRes.ok) {
        throw new Error('One or more requests failed');
      }

      const usersData = await usersRes.json();
      const accordionData = await accordionRes.json();

      setMovies(usersData);
      setAccordionData(accordionData);
    } catch (err) {
      console.error('Error fetching data:', err);
      alert('Error fetching data: ' + err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const goToAdmin = () => {
    navigate('/Admin');
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mt-12 text-center">Browse Movies</h1>
        <button
          onClick={goToAdmin}
          className="mb-4 bg-red-600  hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Go to Admin Panel
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.id}
                className="relative group border rounded-lg overflow-hidden shadow-lg bg-gray-900 text-white transition-all duration-300 hover:scale-105"
              >
                <img
                  src={movie.poster}
                  alt={movie.movieName}
                  className="w-full h-64 object-cover"
                />

                <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h2 className="text-lg font-bold">{movie.movieName}</h2>
                  <p className="text-sm">{movie.release}</p>
                  <p className="text-xs mt-1">{movie.discription.slice(0, 100)}...</p>
                  <button
                    className="mt-2 px-4 py-2 bg-red-600 text-sm rounded hover:bg-red-700"
                    onClick={() => setPlayingMovie(movie.trailerUrl)}
                  >
                    ▶️ Watch Trailer
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No movies available</p>
          )}
        </div>

        {/* Trailer Modal */}
        {playingMovie && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
            <div className="relative w-full max-w-4xl aspect-video">
              <ReactPlayer
                url={playingMovie}
                controls
                playing
                width="100%"
                height="100%"
              />
              <button
                className="absolute top-2 right-2 bg-white text-black px-2 py-1 rounded"
                onClick={() => setPlayingMovie(null)}
              >
                ✖
              </button>
            </div>
          </div>
        )}
      </div>

      <Accordian data={accordionData} />
      <Footer/>
    </>
  );
};

export default Browse;