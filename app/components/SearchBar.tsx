import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a patient by name"
        value={searchQuery}
        onChangeText={onSearchChange}
        placeholderTextColor="#666"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginTop: 20,
    marginBottom: 8,
    paddingHorizontal: 32,
  },
  searchInput: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default SearchBar;