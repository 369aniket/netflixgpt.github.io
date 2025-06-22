import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Header from './Header';

const Admin = () => {
  const navigate = useNavigate();
  const initialFormData = {
    movieName: '',
    discription: '',
    director: '',
    writter: '',
    story: '',
    producer: '',
    starCast: '',
    music: '',
    production: '',
    distributer: '',
    release: '',
    country: '',
    language: '',
    duration: '',
    budget: '',
    collection: '',
    poster: '',
    trailerUrl: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [posterType, setPosterType] = useState('url');
  const [movies, setMovies] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchMovies = async () => {
    try {
      const res = await fetch('http://localhost:8000/users');
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      console.error('Error fetching movies:', err);
      alert('Error fetching movies: ' + err.message);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, poster: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleEdit = (movie) => {
    setFormData(movie);
    setPosterType(movie.poster.startsWith('data:') ? 'file' : 'url');
    setEditingId(movie.id);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/users/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete movie');
      fetchMovies();
    } catch (err) {
      console.error('Error deleting movie:', err);
      alert('Error deleting movie: ' + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `http://localhost:8000/users/${editingId}`
      : 'http://localhost:8000/users';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to submit');
      alert(`Movie ${editingId ? 'updated' : 'added'} successfully!`);
      setFormData(initialFormData);
      setPosterType('url');
      setEditingId(null);
      fetchMovies();
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Error: ' + err.message);
    }
  };

  const GoHome = () => {
    navigate('/browse');
  };

  return (
    <>
      <div className="container mx-auto p-6 max-w-4xl bg-white dark:bg-gray-900 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Admin Panel</h1>

        <div className="flex justify-between mb-6">
          <button
            onClick={GoHome}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow"
          >
            Go To Home
          </button>
        </div>

        <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
          {Object.entries(initialFormData).map(([key]) => (
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200" key={key}>
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
              <input
                name={key}
                value={formData[key] || ''}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </label>
          ))}

          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="posterType"
                value="url"
                checked={posterType === 'url'}
                onChange={() => setPosterType('url')}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Use Poster URL</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="posterType"
                value="file"
                checked={posterType === 'file'}
                onChange={() => setPosterType('file')}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Upload Poster File</span>
            </label>
          </div>

          {posterType === 'url' ? (
            <label className="block">
              Poster URL:
              <input
                name="poster"
                value={formData.poster}
                onChange={handleChange}
                placeholder="https://example.com/poster.jpg"
                className="mt-1 w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </label>
          ) : (
            <label className="block">
              Upload Poster:
              <input
                type="file"
                accept="image/*"
                onChange={handlePosterChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </label>
          )}

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded shadow"
          >
            {editingId ? 'Update' : 'Submit'}
          </button>
        </form>

        <hr className="my-8 border-gray-300 dark:border-gray-600" />

        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Movie List</h2>
        <ul className="space-y-4">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <li
                key={movie.id}
                className="flex justify-between items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm"
              >
                <div className="text-gray-800 dark:text-white">
                  <strong>{movie.movieName}</strong> <span className="text-sm text-gray-500">(ID: {movie.id})</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(movie)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded shadow"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(movie.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-700 dark:text-gray-300">No movies available</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Admin;

