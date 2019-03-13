import React from 'react';

const Suggestions = (props) => {
    const options = props.movies.map(movie => (
            <div key={movie.id}>
                <li key={movie.id} onClick={() => this.selectedSuggestion(movie.title)}>{movie.title}</li>
                <p>{movie.vote_average} Rating, {movie.release_date}</p>
            </div>
    ))
    return <ul className="list">{options}</ul>
}

export default Suggestions;
