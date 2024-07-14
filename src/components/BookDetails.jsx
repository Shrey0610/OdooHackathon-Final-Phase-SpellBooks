import React, { useState } from 'react';
import axios from 'axios';

const BookDetails = () => {
  const [query, setQuery] = useState('');
  const [bookDetails, setBookDetails] = useState(null);
  const [error, setError] = useState(null);

  const fetchBookDetails = async () => {
    try {
      // Fetching book details based on query (book name or ISBN)
      const detailsResponse = await axios.get(`http://localhost:5005/book-details/${query}`);
      setBookDetails(detailsResponse.data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch book details');
      setBookDetails(null);
    }
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchBookDetails();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter Book Name or ISBN"
          required
        />
        <button type="submit">Fetch Book Details</button>
      </form>
      {error && <p>{error}</p>}
      {bookDetails && (
        <div>
          <h2>{bookDetails.title}</h2>
          <p>Authors: {bookDetails.authors}</p>
          <p>Published Date: {bookDetails.published_date}</p>
          <p>Description: {bookDetails.description}</p>
          <p>Page Count: {bookDetails.pageCount}</p>
          <p>Categories: {bookDetails.categories}</p>
          {bookDetails.thumbnail && <img src={bookDetails.thumbnail} alt="Book Thumbnail" />}
          <p>Preview Link: <a href={bookDetails.preview_link} target="_blank" rel="noopener noreferrer">{bookDetails.preview_link}</a></p>
          <p>Info Link: <a href={bookDetails.info_link} target="_blank" rel="noopener noreferrer">{bookDetails.info_link}</a></p>
          <p>Canonical Link: <a href={bookDetails.canonical_link} target="_blank" rel="noopener noreferrer">{bookDetails.canonical_link}</a></p>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
