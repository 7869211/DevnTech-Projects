import React from 'react';
import '../Styles/ResultItems.css';
import VectorIcon from '../Icons/VectorIcon';

const ResultItems = ({ results }) => {
  const handleInteraction = (event, url) => {
    if (event.type === 'click' || event.key === 'Enter') {
      window.open(url, '_blank');
    }
  };

  return (
    <>
    <div className="result-items">
      {results.length > 0 ? (
        results.map((item, index) => (
          <div
            key={index}
            className="result-item"
            tabIndex={0}
            onKeyDown={(event) => handleInteraction(event, item.url)}
            onClick={(event) => handleInteraction(event, item.url)}
            role="button"
            aria-label={`Open details for ${item.title}`}
          > 
            <img src={item.image} alt={item.title} />
            <div className="result-item-content">
              <div className="result-item-header">
                <h3>{item.title}</h3>
              </div>
              <p className="description-para">{item.description}</p>
            </div>
            <div className='vector-icon'>
            <VectorIcon />
            </div>
          </div>
        ))
      ) : (
        <p className="no-results-message">No results found</p> 
      )}
    </div>
    </>
  );
};

export default ResultItems;
