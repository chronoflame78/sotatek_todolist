import React from "react";
import "./add-update-form.styles.scss";
import moment from "moment";
import { v4 } from "uuid";

class AddUpdateForm extends React.Component {
  constructor(props) {
    super(props);

    const { name, description, duedate, priority } = props;

    this.state = {
      name: name || "",
      description: description || "",
      duedate: duedate || moment(new Date()).format("YYYY-MM-DD"),
      priority: priority || "normal",
      errorMessage: "",
      isUpdated: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { addToList, isAddNew, id, updateList } = this.props;
    const { name, description, duedate, priority, isUpdated } = this.state;

    if (isUpdated) return;

    const today = moment(new Date()).format("YYYY-MM-DD");

    if (!name || name.trim() === "") {
      this.setState({
        errorMessage: "Task title is required!",
      });
      return;
    }

    //CHECK IF DUE DATE IS BEFORE CURRENT DATE
    if (moment(duedate).isBefore(today)) {
      this.setState({
        errorMessage: "Due date must not be in the past!",
      });
      return;
    }

    //ADD NEW TASK TO LIST OR UPDATE CURRENT TASK
    if (isAddNew) {
      const newTask = {
        id: v4(),
        name,
        description,
        duedate,
        priority,
      };

      addToList(newTask);

      this.setState({
        name: "",
        description: "",
        duedate: moment(new Date()).format("YYYY-MM-DD"),
        priority: "normal",
        errorMessage: "",
      });
    } else {
      const currentTask = {
        id,
        name,
        description,
        duedate,
        priority,
      };

      updateList(currentTask);

      this.setState({
        isUpdated: true,
      });
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value, isUpdated: false });
  };

  render() {
    const { name, description, duedate, priority, errorMessage, isUpdated } =
      this.state;
    const { isAddNew } = this.props;
    return (
      <form className="add-update-form" onSubmit={this.handleSubmit}>
        {errorMessage && <div className="alert">{errorMessage}</div>}
        <input
          className="txtName"
          name="name"
          type="text"
          maxLength="50"
          placeholder="Add new task..."
          value={name}
          onChange={this.handleChange}
          required
        />
        <label className="custom-label">Description</label>
        <textarea
          className="txt-description"
          name="description"
          value={description}
          onChange={this.handleChange}
        ></textarea>
        <div className="date-and-priority">
          <div className="group">
            <label className="custom-label">Due Date</label>
            <input
              className="due-date-input"
              name="duedate"
              type="date"
              value={duedate}
              onChange={this.handleChange}
            />
          </div>
          <div className="group">
            <label className="custom-label">Priority</label>
            <select
              className="priority-combobox"
              name="priority"
              id="priority-cmb"
              value={priority}
              onChange={this.handleChange}
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <button
          className={isUpdated ? "btmUpdated" : "btnAddUpdate"}
          type="button"
          onClick={this.handleSubmit}
        >
          {isAddNew && "Add"}
          {!isAddNew && !isUpdated && "Update"}
          {!isAddNew && isUpdated && "Updated"}
        </button>
      </form>
    );
  }
}

export default AddUpdateForm;
