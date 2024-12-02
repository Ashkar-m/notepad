import React from 'react';
import { Link } from 'react-router-dom';

const AddButton = () => {
  return (
    <div>
        <Link to="/note/new" className="floating-button">
            +
        </Link>
      
    </div>
  )
}

export default AddButton;
