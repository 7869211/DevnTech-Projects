import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './SearchBar';
import ResultItems from './ResultItems';
import LoadingIcon from '../Icons/LoadingIcon';  
import TagComponent from './TagComponent';
import '../Styles/Main.css';
import NoResultsIcon from '../Icons/NoResultsIcon';
import SearchingResults from '../Icons/SearchingResults';
import TimeShow from '../Components/TimeShow';

function MainComponent() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showTime, setTime] = useState('');
  const [isError, setError] = useState(false);
  const [searching, setSearching] = useState(false);
  const [abortController, setAbortController] = useState(null);

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
    // Abort controller
    const abortcontroller = new AbortController();
    const { signal } = abortcontroller;
    setAbortController(abortcontroller); 

    if (term.trim() === '') {
      setResults([]);
      setLoading(false);
      setSearching(true);
      setNoResults(false);
      setError(false);
      return;
    }
  
    setLoading(true);
    setNoResults(false);
    setError(false);
    setSearching(false);
  
    try {
      const response = await fetch(
        `https://frontend-test-api.digitalcreative.cn/?no-throttling=false&search=${term}`,
        { signal }
      );
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      const data = await response.json();
  
      if (Array.isArray(data) && data.length === 0) {
        setResults([]);
        setNoResults(true);
        setError(true);
      } else if (Array.isArray(data)) {
        setNoResults(false);
        setResults(data);
      } else {
        console.error('Unexpected API response format:', data);
        setResults([]);
        setNoResults(true);
        setError(true);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted');
      } else {
        console.error('Error fetching data:', error);
      }
      setNoResults(true);
      setResults([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const debounceFetchResults = useCallback(
    debounce((term) => {
      fetchResults(term);
    }, 300),
    [fetchResults]
  );

  useEffect(() => {
    if (abortController) {
      abortController.abort(); 
    }
    setResults([]);
    debounceFetchResults(searchTerm);
  }, [searchTerm, debounceFetchResults]);

  const handleTagClick = (tagText) => {
    setSearchTerm(tagText);
  };

  const containerClassName = results.length > 3 ? 'main-container' : 'main-container reduced-height';

  return (
    <div className="main">
      <div className={containerClassName}>
        <div className="search-bar-container">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} isError={isError} />
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
              <p>No Results</p>
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

        {searching && (
          <div className="searching-icon">
            <SearchingResults />
            <div className="footer-message">
              <p>no results</p>
            </div>
          </div>
        )}

        <ResultItems results={results} />
      </div>

      <TimeShow time={showTime} />
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
