import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
    id: Date.now(),
    title: '',
    director: '',
    metascore: '',
    stars: [],
  }

//   id: 5,
//   title: 'Tombstone',
//   director: 'George P. Cosmatos',
//   metascore: 89,
//   stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],

const UpdateMovieForm = props => {
    const [movie, setMovie] = useState(initialMovie);
    const changeHandler = ev => {
      ev.persist();
      let value = ev.target.value;
      if (ev.target.name === 'price') {
        value = parseInt(value, 10);
      }
      setItem({
        ...item,
        [ev.target.name]: value
      });
    };
  
    useEffect(() => {
      // only set the state if we have data from the api
      // Solves refresh race condition
      if (props.items.length > 0) {
        const newItem = props.items.find(
          thing => `${thing.id}` === props.match.params.id
        );
        setItem(newItem);
      }
    }, [props.items, props.match.params.id]);
  
    const handleSubmit = e => {
      // PUT request
      e.preventDefault();
      axios
        .put(`http://localhost:3333/items/${item.id}`, item)
        .then(res => {
          props.updateItems(res.data);
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
            name="name"
            onChange={changeHandler}
            placeholder="name"
            value={item.name}
          />
          <div className="baseline" />
  
          <input
            type="number"
            name="price"
            onChange={changeHandler}
            placeholder="Price"
            value={item.price}
          />
          <div className="baseline" />
  
          <input
            type="string"
            name="imageUrl"
            onChange={changeHandler}
            placeholder="Image"
            value={item.imageUrl}
          />
          <div className="baseline" />
  
          <input
            type="string"
            name="description"
            onChange={changeHandler}
            placeholder="Description"
            value={item.description}
          />
          <div className="baseline" />
  
          <input
            type="string"
            name="shipping"
            onChange={changeHandler}
            placeholder="Shipping"
            value={item.shipping}
          />
          <div className="baseline" />
  
          <button className="md-button form-button">Update</button>
        </form>
      </div>
    );
  };
  
  export default UpdateMovieForm;