import React from 'react';
import '../Styles/TagComponent.css';
import TagIcon from '../Icons/TagIcon'; 

function TagComponent({ text, onClick, isActive }) {
  return (
    <div
      className={`tag ${isActive ? 'active' : ''}`}
      onClick={() => onClick(text)}
      tabIndex={-1}
    >
      <span className="icon">
        <TagIcon className='tag-icon-class'/> 
      </span>
      <span className="text">{text}</span>
    </div>
  );
}


export default TagComponent;
