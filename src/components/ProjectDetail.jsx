// src/components/ProjectDetail.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  createTaskService,
  updateTaskService,
  deleteTaskService,
  getTasksByProjectService,
} from "../services/taskService";
import "../styles/ProjectDetail.css";
import CreateTaskForm from "./CreateTaskForm";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const location = useLocation();                  // Access the navigation state
  const { projectName } = location.state || {};
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetchTasks();
    // console.log(projectId, projectName , "HI")
  }, [projectId]);

  const fetchTasks = async () => {
    const endpoint = `task/${projectId}`;
    const data = await getTasksByProjectService(endpoint, token);
    setTasks(data || []);
  };

  const handleTaskSave = async (taskData) => {
    if (editTask) {
      // Update existing task
      const endpoint = `task/${editTask.task_id}`;
      await updateTaskService(endpoint, taskData, token);
    } else {
      // Create new task
      const endpoint = `task/create`;
      const payload = { ...taskData, project_id: parseInt(projectId) };
      await createTaskService(payload, token, endpoint);
    }
    setShowTaskForm(false);
    setEditTask(null);
    fetchTasks();
  };

  const handleEditClick = (task) => {
    setEditTask(task);
    setShowTaskForm(true);
  };

  const handleDeleteClick = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const endpoint = `task/${taskId}`;
      await deleteTaskService(endpoint, token);
      fetchTasks();
    }
  };

  return (
    <div className="project-detail-container">
      <div className="header">
        <h2>{projectName}</h2>
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
                <button onClick={() => handleEditClick(task)}>Update</button>
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
