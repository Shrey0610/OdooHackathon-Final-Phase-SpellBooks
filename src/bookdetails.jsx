import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function fetchBookDetails() {
      try {
        const response = await fetch(`http://localhost:5005/book-details/${id}`);
        const data = await response.json();
        console.log(data);

        if (response.ok) {
          const {
            title,
            authors,
            published_date,
            description,
            pageCount,
            categories,
            thumbnail,
            preview_link,
            info_link,
            canonical_link
          } = data;

          const newBook = {
            title: title,
            authors: authors,
            description: description,
            pageCount: pageCount,
            categories: categories,
            cover_img: thumbnail,
            preview_link: preview_link,
            info_link: info_link,
            canonical_link: canonical_link
          };

          setBook(newBook);
        } else {
          setBook(null);
          console.error('Failed to fetch book details:', data.error);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setLoading(false);
      }
    }

    fetchBookDetails();
  }, [id]);

  if (loading) return <Loading />;

  return (
    <section className='book-details'>
      <div className='container'>
        <button type='button' className='flex flex-c back-btn' onClick={() => navigate("/book")}>
          <FaArrowLeft size={22} />
          <span className='fs-18 fw-6'>Go Back</span>
        </button>

        <div className='book-details-content grid'>
          <div className='book-details-img'>
            <img src={book?.cover_img || coverImg} alt="cover img" />
          </div>
          <div className='book-details-info'>
            <div className='book-details-item title'>
              <span className='fw-6 fs-24'>{book?.title}</span>
            </div>
            <div className='book-details-item description'>
              <span>{book?.description}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Authors: </span>
              <span>{book?.authors}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Published Date: </span>
              <span>{book?.published_date}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Page Count: </span>
              <span>{book?.pageCount}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Categories: </span>
              <span>{book?.categories}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Preview Link: </span>
              <span><a href={book?.preview_link} target="_blank" rel="noopener noreferrer">{book?.preview_link}</a></span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Info Link: </span>
              <span><a href={book?.info_link} target="_blank" rel="noopener noreferrer">{book?.info_link}</a></span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Canonical Link: </span>
              <span><a href={book?.canonical_link} target="_blank" rel="noopener noreferrer">{book?.canonical_link}</a></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
