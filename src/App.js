import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      movies: [],
      text: '',
      // matches: []
    }
  }

  componentDidMount(searchTerm){
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=6151647ec82570f6d554e7709c136a36&language=en-US&query=" + searchTerm + "&page=1&include_adult=false";
    fetch(urlString).then(response => 
      response.json())
      .then(data => {
        console.log(data);
        // initialMovies = data.results.map((movie) => {
        //   console.log(initialMovies);
        //   console.log(movie);
        // return movie;
        this.setState({
          movies: data.results.slice(0,8)
        });
      });
  }
  
  searchChangeHandler(event){
    const searchTerm = event.target.value;
    // let matches = [];
    this.setState({
      movies: [], 
      text: searchTerm}, () => {
      if (searchTerm.length >= 3) {
        this.componentDidMount(searchTerm); 
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
        movies: []
    });
  }
  // renderSuggestions(){
  //     const {movies} = this.state;
  //     if (movies.length === 0){
  //         return null;  
  //     } 
  // }

  render() {
    const {movies} = this.state;
    return (
      <div className="header">
        <form style={{padding: '25px 25px 15px'}}>
          <div style={{display: 'inline'}}>
            <div className="textbox">
              <i className="fas fa-film fa-lg" />
              <input value={this.state.text} 
                onChange={this.searchChangeHandler.bind(this)}
                placeholder="Enter movie name"
              />
            </div>
            <div className="searchbox">
              <div className="square"><i className="fas fa-search fa-2x"></i></div>
            </div>
          </div>
           
          <div> 
            <ul className="list">
              {movies.map(movie =>
                <div key={movie.id}>
                  <li onClick={() => this.selectedSuggestion(movie.title)}>{movie.title}</li>
                  <p>{movie.vote_average} Rating, {movie.release_date}</p>
                </div>
              )}
            </ul>   
            {/* {this.renderSuggestions()} */}
          </div>
        </form>
      </div>
    );
  }
}

export default App;
