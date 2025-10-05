// src/components/CreateTaskForm.jsx
import React, { useState, useEffect } from "react";
import {toast, ToastContainer} from 'react-toastify';
import "../styles/CreateTaskForm.css";

const CreateTaskForm = ({ onClose, onSave, initialData }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    due_date: "",
    status: "yet to start",
    priority: "medium",
  });


  useEffect(() => {
    if (initialData) {
      setTask({
        title: initialData.title || "",
        description: initialData.description || "",
        due_date: initialData.due_date ? initialData.due_date.split("T")[0] : "",
        status: initialData.status || "yet to start",
        priority: initialData.priority || "medium",
      });
    }
  }, [initialData]);

  // Onchange method gets invoked when user changes the value in the task form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  // Method invokes to validate the data when user clicks on the save button 
  const handleSaveClick = () => {
    if (!task.title.trim()) {
      toast.warning("Title is required");
      return;
    }
    onSave(task);
  };

  return (
    <div className="task-form-overlay">
      <div className="task-form-container">
        <h3>{initialData ? "Update Task" : "Create New Task"}</h3>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Due Date</label>
          <input
            type="date"
            name="due_date"
            value={task.due_date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="status" value={task.status} onChange={handleChange}>
            <option value="yet to start">Yet to Start</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select name="priority" value={task.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="button-group">
          <button className="save-btn" onClick={handleSaveClick}>
            {initialData ? "Update" : "Save"}
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskForm;
