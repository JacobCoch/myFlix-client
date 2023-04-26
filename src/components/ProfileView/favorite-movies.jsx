import React from 'react';

export const FavoriteMovies = ({ favoriteMovieList }) => {
  return (
    <div>
      <h2>Favorite Movies</h2>
      {favoriteMovieList.map((movies) => {
        return (
          <div key={movies._id}>
            <img src={movies.ImagePath} />
            <Link to={`/movies/${movies._id}`}>
              <h4>{movies.Title}</h4>
            </Link>
            <Button onClick={() => handleRemove(movies._id)}>
              Remove from list
            </Button>
          </div>
        );
      })}
    </div>
  );
};
