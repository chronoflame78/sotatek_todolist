import React from "react";
import "./new-task.styles.scss";
import AddUpdateForm from "../add-update-form/add-update-form.component";
const NewTaskContainer = ({ addToList }) => (
  <div className="new-task-container">
    <h2 className="new-task-heading">New Task</h2>
    <AddUpdateForm addToList={addToList} isAddNew={true} />
  </div>
);

export default NewTaskContainer;
