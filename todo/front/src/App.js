import React, { Component } from "react";
import TaskModal from "./components/NewTaskModal";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        id: "",
        Title: "",
        Details: "",
        Create_date: "",
        Complete_date: "",
        Task_complete: false
      },
      TODO_list: []
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://localhost:6362/api/TODO/")
      .then(res => this.setState({ TODO_list: res.data }))
      .catch(err => console.log(err));
  };

  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          Complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.TODO_list.filter(
      item => item.Task_complete === viewCompleted
    );

    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          Title={item.Title}
        >
          {item.Title}
        </span>
        <span>
          <button
            onClick={() => this.viewItem(item)}
            className="btn btn-info mr-2"
          >
            {" "}
            View{" "}
          </button>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            {" "}
            Edit{" "}
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete{" "}
          </button>
        </span>
      </li>
    ));
  };
  toggle = () => {
    this.setState({ TaskModal: !this.state.TaskModal });
  };

  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:6362/api/TODO/${item.id}/`,item)
        .then(res => this.refreshList());
      return;
    }
    axios
      .post("http://localhost:6362/api/TODO/", item)
      .then(res => this.refreshList());
  };

  handleDelete = item => {
    axios
      .delete(`http://localhost:6362/api/TODO/${item.id}/`)
      .then(res => this.refreshList());
  };
  createItem = () => {
    const item = { Title: "", Details: "", Create_date: "", Complete_date: "", Task_complete: false };
    this.setState({ activeItem: item, TaskModal: !this.state.TaskModal });
  };

  editItem = item => {
      this.setState({ activeItem: item, TaskModal: !this.state.TaskModal });
  };

  viewItem = item => {
    axios
      .get(`http://localhost:6362/api/TODO/${item.id}/`)
      this.setState({ activeItem: item, TaskModal: !this.state.TaskModal });
  }

  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">TODO App</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary">
                  Add Task
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.TaskModal ? (
          <TaskModal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  } 
}
export default App;