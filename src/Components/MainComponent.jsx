import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './SearchBar';
import ResultItems from './ResultItems';
import LoadingIcon from '../Icons/LoadingIcon';  
import TagComponent from './TagComponent';
import '../Styles/Main.css';
import NoResultsIcon from '../Icons/NoResultsIcon';


function MainComponent() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showTime, setTime] = useState('');

  const tags = [
    { text: 'Languages' },
    { text: 'Build' },
    { text: 'Design' },
    { text: 'Cloud' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setTime(date.getHours() + ': ' + date.getMinutes() + ':' + date.getSeconds());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchResults = useCallback(async (term) => {
    if (!term) {
      setNoResults(true);
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setNoResults(false);
    try {
      const response = await fetch(`https://frontend-test-api.digitalcreative.cn/?no-throttling=false&search=${term}`);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();

      if (Array.isArray(data) && data.length === 0) {
        setResults([]);
        setNoResults(true);
      } else if (Array.isArray(data)) {
        setNoResults(false);
        setResults(data);
      } else {
        console.error('Unexpected API response format:', data);
        setResults([]);
        setNoResults(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setNoResults(true);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const debounceFetchResults = useCallback(
    debounce((term) => {
      if (term) {
        fetchResults(term);
      }
    }, 300),
    [fetchResults]
  );

  useEffect(() => {
    debounceFetchResults(searchTerm);
  }, [searchTerm, debounceFetchResults]);

  const handleTagClick = (tagText) => {
    setSearchTerm(tagText);
  };

  return (
    <div className="main">
      <div className="main-container">
        <div className="search-bar-container">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="tags-container">
            {tags.map((tag, index) => (
              <TagComponent key={index} text={tag.text} onClick={handleTagClick} />
            ))}
          </div>
        </div>

        {loading && (
          <div className="loading-icon">
            <LoadingIcon className="loading-icon" />
          </div>
        )}

        {noResults && !loading && (
          <div className="no-results-container">
            <NoResultsIcon />
            <div className="footer-message">
              <p>Something wrong happened but this is not your fault :)</p>
            </div>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="footer-message">
            <p>{results.length} results </p>
          </div>
        )}

        {loading && (
          <div className="footer-message">
            <p>Searching...</p>
          </div>
        )}

        <ResultItems results={results} />
      </div>

      <div className="timeShow">
        <p>{showTime}</p>
      </div>
    </div>
  );
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export default MainComponent;