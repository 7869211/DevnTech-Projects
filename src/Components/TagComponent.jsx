import React from 'react';
import '../Styles/TagComponent.css';
import TagIcon from '../Icons/TagIcon'; 

function TagComponent({ text, onClick, isActive }) {
  const getTagClass = () => {
    switch (text.toLowerCase()) {
      case 'languages':
        return 'tag languages-tag';
      case 'build':
        return 'tag build-tag';
      case 'design':
        return 'tag design-tag';
      case 'cloud':
        return 'tag cloud-tag';
      default:
        return 'tag';
    }
  };

  return (
    <div
      className={`${getTagClass()} ${isActive ? 'active' : ''}`}
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
