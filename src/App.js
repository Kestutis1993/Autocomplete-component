import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      movies: [],
      text: '',
      searchResults: false
    }
  }

  componentDidMount(searchTerm){
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=6151647ec82570f6d554e7709c136a36&language=en-US&query=" + searchTerm + "&page=1&include_adult=false";
    fetch(urlString).then(response => 
      response.json())
      .then(data => {
        console.log(data);
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
      text: searchTerm}, () => {
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

  handelSearchResults() {
    const {movies, searchResults} = this.state;
    if (searchResults) {  
      return <div>
        <div className="results_box">
          <i className="fas fa-film fa-lg" />
          <div className="input_box">
            <input value={this.state.text} 
              onChange={this.searchChangeHandler.bind(this)}
            />
            <p className="plcholder">Enter a movie name</p>
          </div>
        </div>
        <div className="movies_box">
          <ul className="list">
            {movies.map((movie, index) =>
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
      <div className="main_bckg">
        <div className="header">
          <form>
            <div>
              <div className="text_box">
                <i className="fas fa-film fa-lg" />
                <input value={this.state.text} 
                  onChange={this.searchChangeHandler.bind(this)}
                  onClick={() => this.setState({searchResults: false})}
                  placeholder="Enter movie name"
                />
              </div>
              <div className="search_box">
                <div className="square"><i className="fas fa-search fa-2x"></i></div>
              </div>
            </div>       
            <div>
              {this.handelSearchResults()}
            </div>
          </form>
        </div>
        <div className="body_block"></div>
      </div>
    );
  }
}

export default App;
