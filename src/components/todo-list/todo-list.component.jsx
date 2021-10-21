import React from "react";
import "./todo-list.styles.scss";

import Task from "../task/task.component";
import moment from "moment";

class TodoListContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      searchName: "",
    };
  }

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const {
      taskList,
      toggleCheckBox,
      removeFromList,
      removeAllChecked,
      updateList,
    } = this.props;
    const { searchName } = this.state;
    const displayList = taskList
      .filter((task) => task.name.includes(searchName.trim()))
      .sort(function (a, b) {
        if (moment(a.duedate).isBefore(b.today)) return -1;
        else if (moment(a.duedate).isAfter(b.today)) return 1;
        else return 0;
      });
    return (
      <div className="todo-list-container">
        <h2 className="todo-list-heading">Todo List</h2>
        <input
          className="txt-search"
          name="searchName"
          type="text"
          maxLength="50"
          placeholder="Search..."
          value={searchName}
          onChange={this.handleChange}
        />
        {displayList.map(({ id, ...otherProps }) => (
          <Task
            key={id}
            id={id}
            {...otherProps}
            toggleCheckBox={toggleCheckBox}
            removeFromList={removeFromList}
            updateList={updateList}
          />
        ))}
        {taskList.some((item) => item.checked === true) && (
          <div className="bulk-action-container">
            <p className="text-bulk">Bulk Action: </p>
            <button type="button" className="btn-done">
              Done
            </button>
            <button
              type="button"
              className="btn-remove"
              onClick={removeAllChecked}
            >
              Remove
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default TodoListContainer;
