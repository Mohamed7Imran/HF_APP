import React, { useState, useEffect } from 'react';
import './KanbanDialog.css';

interface KanbanDialogProps {
  data: any;
  model: any;
}

const KanbanDialogFormTemplate: React.FC<KanbanDialogProps> = (props) => {
  const [formData, setFormData] = useState(props.data || {});

  useEffect(() => {
    setFormData(props.data || {});
  }, [props.data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value
    }));
    // Update the data in the parent component
    if (props.data) {
      props.data[name] = value;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="kanban-dialog-container">
      <form className="kanban-dialog-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="entryno">Entry No:</label>
          <input
            type="text"
            id="entryno"
            name="entryno"
            value={formData.entryno || ''}
            onChange={handleChange}
            placeholder="Enter Entry Number"
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="wrkcat">Work Category:</label>
          <input
            type="text"
            id="wrkcat"
            name="wrkcat"
            value={formData.wrkcat || ''}
            onChange={handleChange}
            placeholder="Enter Work Category"
          />
        </div>

        <div className="form-group">
          <label htmlFor="worktype1">Status:</label>
          <select
            id="worktype1"
            name="worktype1"
            value={formData.worktype1 || ''}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="Ordinary">To Do</option>
            <option value="InProgress">In Progress</option>
            <option value="Testing">Review</option>
            <option value="Close">Done</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="asgby_name">Assigned By:</label>
          <input
            type="text"
            id="asgby_name"
            name="asgby_name"
            value={formData.asgby_name || ''}
            onChange={handleChange}
            placeholder="Enter Assignee Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="asgdt">Assigned Date:</label>
          <input
            type="date"
            id="asgdt"
            name="asgdt"
            value={formData.asgdt || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            placeholder="Enter Description"
            rows={4}
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority || ''}
            onChange={handleChange}
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="duedate">Due Date:</label>
          <input
            type="date"
            id="duedate"
            name="duedate"
            value={formData.duedate || ''}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};

export default KanbanDialogFormTemplate;
