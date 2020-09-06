import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFilm} from '@fortawesome/free-solid-svg-icons';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import './autocomplete.css';

class AutoComplete extends Component {
  constructor(props){
    super(props);
    this.state = {
      movies: [],
      text: '',
      searchResults: false
    }
  }

  componentDidMount(searchTerm){
    const urlString = `${process.env.REACT_APP_MOVIEDB_API_URL}/3/search/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`;
    fetch(urlString)
      .then(response => response.json())
      .then(data => {
        this.setState({
          movies: data.results.slice(0,8),
          searchResults: true
        });
      });
  }
  
  searchChangeHandler(event){
    const searchTerm = event.target.value;
    this.setState({
      movies: [], 
      text: searchTerm
    }, () => {
      if (searchTerm.length >= 3) {
        this.componentDidMount(searchTerm);
      } else if (searchTerm.length >= 1) {
        this.setState({searchResults: true})
      } else {
        this.setState({
          movies: []
        })
      } 
    });
  }

  selectedSuggestion(value){
    this.setState({
        text: value,
        movies: [],
        searchResults: false
    });
  }

  renderSearchResults() {
    if (this.state.searchResults) {  
      return <div className="results-block">
        <div className="results-box">
          <FontAwesomeIcon icon={faFilm} size="lg" className="film-icon" />
          <div className="input-box">
            <input value={this.state.text} 
              onChange={this.searchChangeHandler.bind(this)}
            />
            <p className="placeholder">Enter a movie name</p>
          </div>
        </div>
        <div className="movies-box">
          <ul className="list">
            {this.state.movies.map((movie, index) =>
              <div key={index}>
                <div key={movie.id}>
                  <li onClick={() => this.selectedSuggestion(movie.title)}>{movie.title}</li>
                  <p>{movie.vote_average} Rating, {movie.release_date}</p>
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="main-background">
        <div className="header">
          <form>
            <div className="search-block">
              <div className="text-box">
                <FontAwesomeIcon icon={faFilm} size="lg" className="fa-film" />
                <input value={this.state.text} 
                  onChange={this.searchChangeHandler.bind(this)}
                  onClick={() => this.setState({searchResults: false})}
                  placeholder="Enter movie name"
                />
              </div>
              <div className="search-logo">
                <div className="square">
                  <FontAwesomeIcon icon={faSearch} size="2x" className="search-icon" />
                </div>
              </div>
            </div>       
            <div>
              {this.renderSearchResults()}
            </div>
          </form>
          
        </div>
        <div className="body-block"></div>
      </div>
    );
  }
}

export default AutoComplete;
