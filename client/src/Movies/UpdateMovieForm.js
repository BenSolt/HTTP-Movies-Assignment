import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
    id: Date.now(),
    title: '',
    director: '',
    metascore: '',
    stars: [],
  }


const UpdateMovieForm = props => {
    const [movie1, setMovie1] = useState(initialMovie);
    const changeHandler = ev => {
      ev.persist();
      let value = ev.target.value;
      if (ev.target.name === 'price') {
        value = parseInt(value, 10);
      }
      setMovie1({
        ...movie1,
        [ev.target.title]: value
      });
    };
  
    useEffect(() => {
    
      if (props.items.length > 0) {
        const newMovie = props.items.find(
          thing => `${thing.id}` === props.match.params.id
        );
        setMovie(newMovie);
      }
    }, [props.items, props.match.params.id]);
  
    const handleSubmit = e => {
      // PUT request
      e.preventDefault();
      axios
        .put(`http://localhost:5000/movies/${movie.id}`, movie)
        .then(res => {
          props.updateMovies(res.data);
          props.history.push('/item-list');
        })
        .catch(err => console.log(err));
    };
  
    // loading state if we don't have data yet
    if (props.items.length === 0) {
      return <h2>Loading data...</h2>;
    }
  
    return (
      <div>
        <h2>Update Item</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            onChange={changeHandler}
            placeholder="title"
            value={movie.title}
          />
          <div className="baseline" />
  
          <input
            type="text"
            name="director"
            onChange={changeHandler}
            placeholder="director"
            value={movie.director}
          />
          <div className="baseline" />
  
          <input
            type="number"
            name="metascore"
            onChange={changeHandler}
            placeholder="metascore"
            value={movie.metascore}
          />
          <div className="baseline" />
  
          <input
            type="string"
            name="stars"
            onChange={changeHandler}
            placeholder="movie stars"
            value={movie.stars}
          />
          <div className="baseline" />
  
        
          />
          <div className="baseline" />
  
          <button className="md-button form-button">Update</button>
        </form>
      </div>
    );
  };
  
  export default UpdateMovieForm;