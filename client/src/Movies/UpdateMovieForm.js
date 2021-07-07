import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
    // id: Date.now(),
    title: '',
    director: '',
    metascore: '',
    // stars: [],
  }


const UpdateMovieForm = props => {
    const [movie, setMovie] = useState(initialMovie);
    const changeHandler = e => {
      e.persist();
      let value = e.target.value;
    //   if (e.target.name === 'title') {
    //     value = parseInt(value, 10);
    //   }
      setMovie({
        ...movie,
        [e.target.name]: value
      });
    };
  
    useEffect(() => {
    
        axios
        .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
        .then(res => setMovie(res.data))
        .catch(err => console.log(err.response));
         console.log(props.match.params.id)

    }, [ props.match.params.id]);
  
    const handleSubmit = e => {
      // PUT request
      e.preventDefault();
      console.log(movie)
      axios
        .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        
        .then(res => {
        //   props.updateMovies(res.data);
          props.history.push('/');
        })
        .catch(err => console.log(err));
    };

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

    // loading state if we don't have data yet

    // if (props.movies.length === 0) {
    //   return <h2>Loading data...</h2>;
    // }

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
    return (
      <div  className='inputform'>
        <h2>Update Movie</h2>
        <form onSubmit={handleSubmit}>
          <input className='input'
            type="text"
            name="title"
            onChange={changeHandler}
            placeholder="title"
            value={movie.title}
          />
          <div/>
  
          <input className='input'
            type="text"
            name="director"
            onChange={changeHandler}
            placeholder="director"
            value={movie.director}
          />
          <div/>
  
          <input className='input'
            type="number"
            name="metascore"
            onChange={changeHandler}
            placeholder="metascore"
            value={movie.metascore}
          />
          <div/>
  
          {/* <input className='input'
            type="string"
            name="stars"
            onChange={changeHandler}
            placeholder="movie stars"
            value={movie.stars}
          /> */}

          <div/>
  
          <button className="md-button form-button">Update</button>
        </form>
      </div>
    );
  };
  
  export default UpdateMovieForm;