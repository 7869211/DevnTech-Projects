import React from 'react';
import '../Styles/ResultItems.css';

const ResultItems = ({ results }) => {
  const handleTabButton = (event, url) => {
    if (event.key === 'Enter') {
      window.open(url, '_blank');
    }
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
            role="button"
            aria-label={`Open details for ${item.title}`}
          >
            <img src={item.image} alt={item.title} />
            <div className="result-item-content">
              <h3>{item.title}</h3>
              <p className="description-para">{item.description}</p>
            </div>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default ResultItems;
