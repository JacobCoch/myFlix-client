import { useState } from 'react';
import { MovieView } from '../MovieView/movie-view.jsx';
import { MovieCard } from '../MovieCard/movie-card.jsx';

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      _id: 1,
      Title: 'Inception',
      Description:
        'A thief, who steals corporate secrets through use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.',
      ImagePath:
        'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg',
      Genre: {
        Name: 'Action',
        Description:
          'Action movies are typically fast-paced and exciting with lots of explosions, car chases, gun fights, fist fights, and other types of physical violence.',
      },
      Director: {
        Name: 'Christopher Nolan',
        Bio: 'Christopher Edward Nolan is an English-American film director, screenwriter, producer, and editor. He is one of the highest-grossing directors in history, and among the most acclaimed.',
        Birth: '1970-07-30',
        Death: '',
      },
      Featured: true,
    },
    {
      _id: 2,
      Title: 'The Shawshank Redemption',
      Description: '',
      ImagePath:
        'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg',
      Genre: {
        Name: 'Drama',
        Description:
          'Drama movies are serious, emotional, and often contain a lot of deep and complex themes.',
      },
      Director: {
        Name: 'Frank Darabont',
        Bio: 'Frank Darabont is an American film director, screenwriter, and producer. He is best known for writing and directing The Shawshank Redemption, The Green Mile, and The Mist.',
        Birth: '1959-01-28',
        Death: '',
      },
      Featured: false,
    },
    {
      _id: 3,
      Title: 'Gladiator',
      Description: '',
      ImagePath:
        'https://en.wikipedia.org/wiki/Gladiator_(2000_film)#/media/File:Gladiator_(2000_film_poster).png',
      Genre: {
        Name: 'Action',
        Description:
          'Action movies are typically fast-paced and exciting with lots of explosions, car chases, gun fights, fist fights, and other types of physical violence.',
      },
      Director: {
        Name: 'Ridley Scott',
        Bio: 'Ridley Scott is an English film director and producer. Scott is known for his atmospheric, highly concentrated visual style and his use of special effects, in films such as Alien, Blade Runner, Thelma & Louise, and Gladiator.',
        Birth: '1937-11-30',
        Death: '',
      },
      Featured: false,
    },
    {
      _id: 4,
      Title: 'Pulp Fiction',
      Description: '',
      ImagePath:
        'https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg',
      Genre: {
        Name: 'Comedy',
        Description:
          'Comedy movies are light-hearted, humorous, and often contain witty dialogue.',
      },
      Director: {
        Name: 'Quentin Tarantino',
        Bio: '',
        Birth: '1963-03-27',
        Death: '',
      },
      Featured: false,
    },
  ]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div> The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
