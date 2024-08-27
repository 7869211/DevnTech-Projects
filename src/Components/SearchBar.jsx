import React from 'react';
import '../Styles/SearchBar.css';
import SearchIcon from '../Icons/SearchIcon';

const SearchBar = ({ searchTerm, setSearchTerm, isError }) => {
  return (
    <div className={`search-bar ${isError ? 'error' : ''}`}>
      <span className="search-icon">
        <SearchIcon />
      </span>
      <input
        type="text"
        className="search-input"
        placeholder="Search technologies we use at DC..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
  
};

export default SearchBar;
