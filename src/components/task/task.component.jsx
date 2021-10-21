import React from "react";
import "./task.styles.scss";
import AddUpdateForm from "../add-update-form/add-update-form.component";

class Task extends React.Component {
  constructor() {
    super();
    this.state = {
      isShowing: false,
    };
  }
  handleShowDetail = () => {
    const { isShowing } = this.state;

    this.setState({
      isShowing: !isShowing,
    });
  };

  render() {
    const {
      id,
      name,
      checked,
      description,
      priority,
      duedate,
      toggleCheckBox,
      removeFromList,
      updateList,
    } = this.props;
    const { isShowing } = this.state;

    return (
      <div>
        <div className="task-container">
          <input
            type="checkbox"
            className="done-check-box"
            checked={checked}
            onChange={() => toggleCheckBox(id)}
          />
          <p className="task-name">{name}</p>
          <button
            type="button"
            className="btn-detail"
            onClick={this.handleShowDetail}
          >
            Detail
          </button>
          <button
            type="button"
            className="btn-remove"
            onClick={() => removeFromList(id)}
          >
            Remove
          </button>
        </div>
        {isShowing && (
          <div className="form-container">
            <AddUpdateForm
              id={id}
              name={name}
              description={description}
              duedate={duedate}
              priority={priority}
              isAddNew={false}
              updateList={updateList}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Task;
