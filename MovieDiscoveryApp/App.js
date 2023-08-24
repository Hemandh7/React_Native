import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, ScrollView } from 'react-native';

const API_KEY = 'f25c1b0a';
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const searchMovies = async () => {
    try {
      const response = await fetch(`${API_URL}&s=${query}`);
      const data = await response.json();
      console.log(data);
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchMovieDetails = async (imdbID) => {
    try {
      const response = await fetch(`${API_URL}&i=${imdbID}`);
      const data = await response.json();
      setSelectedMovie(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for movies..."
        value={query}
        onChangeText={(text) => setQuery(text)}
      />
      <Button title="Search" onPress={searchMovies} />

      <ScrollView style={styles.moviesContainer}>
        {movies.map((movie) => (
          <View key={movie.imdbID} style={styles.movieItem}>
            <Image style={styles.moviePoster} source={{ uri: movie.Poster }} />
            <Text style={styles.movieTitle}>{movie.Title}</Text>
            <Button title="View Details" onPress={() => fetchMovieDetails(movie.imdbID)} />
          </View>
        ))}
      </ScrollView>

      {selectedMovie && (
        <View style={styles.movieDetails}>
          <Image style={styles.moviePoster} source={{ uri: selectedMovie.Poster }} />
          <Text style={styles.movieTitle}>{selectedMovie.Title}</Text>
          <Text>{selectedMovie.Year}</Text>
          <Text>{selectedMovie.Plot}</Text>
          <Text>{selectedMovie.imdbRating}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  moviesContainer: {
    marginTop: 16,
  },
  movieItem: {
    marginBottom: 16,
  },
  moviePoster: {
    width: 100,
    height: 150,
  },
  movieTitle: {
    fontWeight: 'bold',
    marginTop: 8,
  },
  movieDetails: {
    marginTop: 16,
    alignItems: 'center',
  },
});
