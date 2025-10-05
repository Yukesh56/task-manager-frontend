// src/components/ProjectDetail.jsx
import { useEffect, useState } from "react";
import {toast} from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {createTaskService, updateTaskService, deleteTaskService, getTasksByProjectService} from "../services/taskService";
import "../styles/ProjectDetail.css";
import CreateTaskForm from "./CreateTaskForm";

const ProjectDetail = () => {
  const navigate = useNavigate();
  const { projectId } = useParams(); // Access the params
  const location = useLocation();                  // Access the navigation state
  const { projectName } = location.state || {}; // Assigning the stateto projectName
  const [tasks, setTasks] = useState([]); 
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editTask, setEditTask] = useState(null);


  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  // Method to get the tasks for the respective project
  const fetchTasks = async () => {
    const endpoint = `task/${projectId}`;
    const data = await getTasksByProjectService(endpoint, token);
    setTasks(data || []); 
  };

  // Method will get invoked when user clicks on save or update the task
  const handleTaskSave = async (taskData) => {
    try{
      if (editTask) {
        // Update existing task
        const endpoint = `task/${editTask.task_id}`;
        await updateTaskService(endpoint, taskData, token);
        toast.success("Task Updated successfully")
      } else {
        // Create new task
        const endpoint = `task/create`;
        const payload = { ...taskData, project_id: parseInt(projectId) };
        await createTaskService(payload, token, endpoint);
        toast.success("Task created successfully")
      }
      setShowTaskForm(false);
      setEditTask(null);
      fetchTasks();
    }
    catch(error){
        if(error){
          toast.error("Failed to create the new task")
        }
    }
    finally{
      setShowTaskForm(false);
      setEditTask(null);
      fetchTasks();
    }
    
  };

  /* Method gets invoked when user clicks on the edit button in the 
  task card which will set the state of showTaskForm to true and 
  assign the task to the statevariable editTask */
  const handleEditClick = (task) => {
    setEditTask(task);
    setShowTaskForm(true);
  };

  // Method will get invoked when user clicks on the delete button in the task card.
  const handleDeleteClick = async (taskId) => {
    try{
      if (window.confirm("Are you sure you want to delete this task?")) {
        const endpoint = `task/${taskId}`;
        await deleteTaskService(endpoint, token);
        toast.success("Task deleted successfully")
        fetchTasks();
      }
    }
    catch(error){
        if(error){
          toast.error("Failed to create the new task")
        }
    }
    finally{
      fetchTasks()
    }
  };

  return (
    <div className="project-detail-container">
      <div className="header">
        <h2 onClick={()=> navigate("/dashboard")} style={{cursor:"pointer"}}>← {projectName}</h2>
        <button className="add-task-btn" onClick={() => setShowTaskForm(true)}>
          + Create Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="no-tasks">No tasks found</div>
      ) : (
        <div className="tasks-grid">
          {tasks.map((task) => (
            <div key={task.task_id} className="task-card">
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p><strong>Due:</strong> {task.due_date ? task.due_date.split("T")[0] : "N/A"}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
              <div className="card-actions">
                <button className="edit-btn" onClick={() => handleEditClick(task)}>Edit</button>
                <button onClick={() => handleDeleteClick(task.task_id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showTaskForm && (
        <CreateTaskForm
          onClose={() => { setShowTaskForm(false); setEditTask(null); }}
          onSave={handleTaskSave}
          initialData={editTask}
        />
      )}
    </div>
  );
};

export default ProjectDetail;
