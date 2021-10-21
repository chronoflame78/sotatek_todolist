import "./App.css";
import TodoListContainer from "./components/todo-list/todo-list.component";
import NewTaskContainer from "./components/new-task/new-task.component";
import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      taskList: [],
    };
  }

  componentDidMount() {
    const taskList = JSON.parse(localStorage.getItem("taskList"));
    if (!taskList || taskList.length === 0) return;
    this.setState({
      taskList: taskList,
    });
  }

  componentDidUpdate() {
    const { taskList } = this.state;
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }

  addToList = (task) => {
    const { taskList } = this.state;

    this.setState({
      taskList: [...taskList, task],
    });
  };

  updateList = (task) => {
    const { taskList } = this.state;
    const newTaskList = [...taskList];
    for (const item of newTaskList) {
      if (item.id === task.id) {
        item.name = task.name;
        item.description = task.description;
        item.duedate = task.duedate;
        item.priority = task.priority;
        break;
      }
    }
    this.setState({
      taskList: newTaskList,
    });
  };

  removeFromList = (id) => {
    const { taskList } = this.state;

    let newTaskList = taskList.filter((item) => item.id !== id);

    this.setState({
      taskList: newTaskList,
    });
  };

  removeAllChecked = () => {
    const { taskList } = this.state;

    let newTaskList = taskList.filter(
      (item) => !item.checked || item.checked === false
    );

    this.setState({
      taskList: newTaskList,
    });
  };

  toggleCheckBox = (id) => {
    const { taskList } = this.state;
    const newTaskList = [...taskList];
    for (const task of newTaskList) {
      if (task.id === id) {
        task.checked = !task.checked;
        break;
      }
    }
    this.setState({
      taskList: newTaskList,
    });
  };

  render() {
    const { taskList } = this.state;

    return (
      <div className="container">
        <NewTaskContainer taskList={taskList} addToList={this.addToList} />
        <TodoListContainer
          taskList={taskList}
          toggleCheckBox={this.toggleCheckBox}
          removeFromList={this.removeFromList}
          removeAllChecked={this.removeAllChecked}
          updateList={this.updateList}
        />
      </div>
    );
  }
}

export default App;
