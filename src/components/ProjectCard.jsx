import React, { useState } from 'react';
import { deleteProjectService, updateProjectService } from '../services/projectService';
import {toast} from 'react-toastify';
import showConfirmToast from '../utils/toasts';

const ProjectCard = ({ project, onProjectUpdated, onProjectDeleted,onProjectClick }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);

  //Method to update the project
  const handleupdate = async () => {
      try{
          const token = localStorage.getItem('authToken');
          await updateProjectService({name, description},token, `project/${project.project_id}`)
          toast.success("Project updation Successful")
          setIsEditing(false);
          onProjectUpdated();
      }
      catch(err){
          toast.error(err.message || "Project updation failed")
      }
      
      
  };

  //Method to update the project
  const handledelete = async () => {
  const token = localStorage.getItem("authToken");

  showConfirmToast("Are you sure you want to delete this project?", async () => {
    try {
      await deleteProjectService(token, `project/${project.project_id}`);
      toast.success("Project Deletion Successful");
      onProjectDeleted();
    } catch (err) {
      toast.error(err.message || "Project delete failed");
    }
  });
};
  return (
    <div className="project-card">
      {isEditing ? <>
          <h5 className='project-card-heading'>Name</h5>
          <input value={name} onChange={e => setName(e.target.value)} className='project-card-input' />
          <h5 className='project-card-heading'>Description</h5>
          <textarea  rows="6" cols="25" value={description} onChange={e => setDescription(e.target.value)} className='project-card-input'></textarea>
          <div className="card-actions">
              <button className="update-btn" onClick={handleupdate}>Update</button>
              <button onClick={() => setIsEditing(false)} className="delete-btn">Cancel</button>
          </div>
          
      </> : <>
        <h5 className='project-card-heading'>Project Name</h5>
        <h4>{project.name}</h4>
        <h5 className='project-card-heading'>Project Description</h5>
        <p className='project-card-description'>{project.description}</p>
        <div className="card-actions">
            <button className="view-btn" onClick={onProjectClick} style={{ cursor: "pointer" }}>View</button>
          <div>
              <button onClick={() => setIsEditing(true)} className="edit-btn">Edit</button>
              <button className="delete-btn" onClick={handledelete}>Delete</button>
          </div>
          
        </div>
      </>}
    </div>
  );
};

export default ProjectCard;
