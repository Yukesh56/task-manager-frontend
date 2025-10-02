import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import ProjectForm from '../components/CreateProjectForm';
import {fetchProjectService, createProjectService} from '../services/projectService'
import '../styles/dashboard.css';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try{
        const token = localStorage.getItem('authToken');
        const res = await fetchProjectService(token, "project/getprojects")
        setProjects(res);
    }
    catch(err){
        toast.error(err.message || "SomeThing Went Wrong please try again after some time")
    }
  };

  const handleAddProject = async (projectData) => {
    try{
        const token = localStorage.getItem('authToken');
        await createProjectService(projectData,token, "project/createproject")
        toast.success("Project creation Successful")
        fetchProjects();
    }
    catch(err){
        toast.error(err.message || "Project creation failed")
    }
    finally {
        setShowForm(false);
        fetchProjects();
    }
    
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Your Projects</h2>
        <button onClick={() => setShowForm(!showForm)}>+ Add Project</button>
      </div>
      {showForm && <ProjectForm onSubmit={handleAddProject} />}
      <div className="project-grid">
        {projects.map(proj => (
          <ProjectCard 
            key={proj.project_id} 
            project={proj} 
            onProjectUpdated={fetchProjects} 
            onProjectDeleted={fetchProjects}
            onProjectClick={() => navigate(`/project/${proj.project_id}`, { state: { projectName: proj.name } })}
          />
        ))}
      </div>
      {projects.length == 0 ? <div className='no-records'>
        {projects.length == 0 ? <h1 >No projects found</h1> : null}
      </div> : null}
      <ToastContainer 
        position="top-right"    
        autoClose={3000}        
        hideProgressBar={true}  
        newestOnTop={false}  
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        pauseOnFocusLoss
        style={{ marginTop: "50px" }}
      />
    </div>
  );
};

export default Dashboard;
