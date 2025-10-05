import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ProjectForm = ({ onSubmit, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  /* Method which will pass the name and description of the projectData
  when user clicks on the save button */
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name.trim()){
      toast.warning("Title is a required field")
      return
    }
    onSubmit({ name, description });
    setName('');
    setDescription('');
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      <div className="project-container">
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className='btn-submit'>Save</button>
        <img onClick={onClose} className='img-close' alt='close' src='https://img.icons8.com/?size=100&id=52134&format=png&color=000000'></img>
      </div>
      

      
      
    </form>
  );
};

export default ProjectForm;
