import React, { useState, useEffect } from 'react';
import Loading from './Loading'; // Assuming Loading component is defined

const BookDetails = ({ isbn }) => {
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);

  useEffect(() => {
    setLoading(true);

    async function fetchBookDetails() {
      try {
        const response = await fetch(`http://localhost:5005/book-details/${isbn}`);
        const data = await response.json();

        if (response.ok) {
          setBook(data);
        } else {
          console.error('Failed to fetch book details:', data.error);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setLoading(false);
      }
    }

    fetchBookDetails();
  }, [isbn]);

  if (loading) return <Loading />;

  if (!book) return <div>Book not found.</div>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p>Authors: {book.authors}</p>
      <p>Publish Date: {book.published_date}</p>
      <p>Description: {book.description}</p>
      <p>Page Count: {book.pageCount}</p>
      <p>Categories: {book.categories}</p>
      <img src={book.thumbnail} alt="Book Cover" />
      <p>Preview Link: <a href={book.preview_link} target="_blank" rel="noopener noreferrer">{book.preview_link}</a></p>
      <p>Info Link: <a href={book.info_link} target="_blank" rel="noopener noreferrer">{book.info_link}</a></p>
      <p>Canonical Link: <a href={book.canonical_link} target="_blank" rel="noopener noreferrer">{book.canonical_link}</a></p>
    </div>
  );
};

export default BookDetails;
