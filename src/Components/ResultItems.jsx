import React from 'react';
import '../Styles/ResultItems.css';
import VectorIcon from '../Icons/VectorIcon';

const ResultItems = ({ results }) => {
  const handleTabButton = (event, url) => {
    if (event.key === 'Enter' || event.key === 'click') {
      window.open(url, '_blank');
    }
  };

  const handleClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="result-items">
      {results.length > 0 ? (
        results.map((item, index) => (
          <div
            key={index}
            className="result-item"
            tabIndex={0}
            onKeyDown={(event) => handleTabButton(event, item.url)}
            onClick={() => handleClick(item.url)}
            role="button"
            aria-label={`Open details for ${item.title}`}
          >
            <img src={item.image} alt={item.title} />
            <div className="result-item-content">
              <div className="result-item-header">
                <h3>{item.title}</h3>
                <VectorIcon />
              </div>
              <p className="description-para">{item.description}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="hidden"></p> 
      )}
    </div>
  );
};

export default ResultItems;
