import React, { Component } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import AddEditModal from "../components/AddEditModal";
import TabBar from "../components/TabBar";
import DataTable from "../components/DataTable";
import ConfirmPopup from "../components/ConfirmPopup";

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dummyList: [],
      todoList: [],
      showModal: false,
      rowData: { action: "", data: [] },
      popupOpen: false,
      rowForDelete: [],
      groupBy: "none",
    };
  }

  //close modal
  handleModalClose = () => {
    this.setState({ showModal: false, rowData: { action: "", data: [] } });
  };

  //show modal
  showModal = () => {
    this.setState({ showModal: true });
  };

  //close popover
  handlePopupClose = () => {
    this.setState({ popupOpen: false, rowForDelete: [] });
  };

  //tab bar change
  handleTabBarChange = (tab) => {
    let { dummyList } = this.state;
    let filterData = dummyList;
    if (tab != "All") {
      filterData = dummyList.filter((row) => row.currentState == tab);
    }

    this.setState({ todoList: filterData });
  };

  handleAddTask = (task, editData, callback) => {
    let { todoList } = this.state;
    //add task to todolist and close modal
    if (editData && editData.id) {
      todoList.map((list, i) => {
        if (list.id == editData.id) {
          todoList[i] = { id: editData.id, ...task };
        }
      });
    } else {
      todoList.push(task);
      task.id = new Date().getTime();
    }

    this.setState({ todoList, dummyList: todoList }, () => {
      callback();
    });
    this.handleModalClose();
  };

  //show row data in modal
  handleRowClick = (row) => {
    this.setState(
      {
        rowData: {
          action: "view",
          data: row,
        },
      },
      () => {
        this.showModal();
      }
    );
  };

  //handle edit task
  handleEditClick = (row) => {
    this.setState(
      {
        rowData: {
          action: "edit",
          data: row,
        },
      },
      () => {
        this.showModal();
      }
    );
  };

  //handle delete task
  handleDeleteClick = (task) => {
    this.setState({ rowForDelete: task, popupOpen: true });
  };

  //handle done click
  handleDoneClick = (task, reopen) => {
    let { todoList, dummyList } = this.state;
    if (todoList && todoList.length) {
      todoList.map((item, i) => {
        if (item.id == task.id) {
          todoList[i].currentState = reopen ? "Pending" : "Completed";
          dummyList[i].currentState = reopen ? "Pending" : "Completed";
        }
      });
    }
    this.setState({ todoList, dummyList });
  };

  //popover delete click
  handlePopupDelete = () => {
    let { todoList, dummyList, rowForDelete } = this.state;
    if (todoList && todoList.length) {
      todoList.map((item, i) => {
        if (item.id == rowForDelete.id) {
          todoList.splice(i, 1);
          dummyList.splice(i, 1);
        }
      });
    }
    this.setState({ todoList, dummyList }, () => {
      this.handlePopupClose();
    });
  };

  //calling on row header sort click
  handleSortData = (direction, sortKey) => {
    let sortData = this.state.todoList.sort((a, b) => {
      a[sortKey] = a[sortKey] ? a[sortKey] : "";
      b[sortKey] = b[sortKey] ? b[sortKey] : "";
      //data sorting based on due and created date
      if (sortKey == "dueby" || sortKey == "createdAt") {
        if (direction == "ascending") {
          return new Date(a[sortKey]) - new Date(b[sortKey]);
        } else {
          return new Date(b[sortKey]) - new Date(a[sortKey]);
        }
      } else {
        //otherthan duedate columns data sorting
        if (direction == "ascending") {
          if (a[sortKey].toUpperCase() > b[sortKey].toUpperCase()) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (a[sortKey].toUpperCase() < b[sortKey].toUpperCase()) {
            return 1;
          } else {
            return -1;
          }
        }
      }
    });
    this.setState({ todoList: sortData });
  };

  //seach in todo list
  handleSearch = (e) => {
    let { dummyList } = this.state;
    const searchableColumns = ["title", "description", "priority", "dueDate"];
    let query = e.target.value;
    let searchList = [];

    if (dummyList && dummyList.length) {
      searchList = dummyList.filter((row) =>
        searchableColumns.some(
          (column) =>
            row[column].toString().toLowerCase().indexOf(query.toLowerCase()) >
            -1
        )
      );
    }
    this.setState({ todoList: query ? searchList : dummyList });
  };

  handleGroupBy = (e) => {
    this.setState({ groupBy: e.target.value || "none" }, () => {
      this.groupBy(this.state.groupBy);
    });
  };

  //handle group by
  groupBy = (property) => {
    // let { dummyList } = this.state;
    // let data = dummyList.reduce((acc, obj) => {
    //   const key = obj[property];
    //   if (!acc[key]) {
    //     acc[key] = [];
    //   }
    //   // Add object to list for given key's value
    //   acc[key].push(obj);
    //   return acc;
    // }, {});
    // this.setState({ todoList: property == "none" ? dummyList : data });
  };

  render() {
    let { showModal, todoList, rowData } = this.state;

    return (
      <div>
        <Container>
          <Button className="add-btn" onClick={this.showModal}>
            <span>+ Add</span>
          </Button>
          <br />
          <br />
          <Row>
            <Col md={3}>
              <Form.Label>Group By</Form.Label>
              <Form.Control
                as="select"
                className="mr-sm-2"
                id="inlineFormCustomSelect"
                custom
                onChange={this.handleGroupBy}
              >
                <option value="none">None</option>
                <option value="createdAt">Created On</option>
                <option value="currentState">Pending On</option>
                <option value="priority">Priority</option>
              </Form.Control>
            </Col>
            <Col>
              <Form.Label>Search</Form.Label>
              <Form.Control
                placeholder="Search Tasks"
                onChange={this.handleSearch}
              />
            </Col>
          </Row>
          <br />
          <TabBar handleTabBarChange={this.handleTabBarChange} />
          <br />
          {todoList.length ? (
            <DataTable
              items={this.state.todoList}
              groupBy={this.state.groupBy}
              handleSortData={this.handleSortData}
              handleRowClick={this.handleRowClick}
              handleEditClick={this.handleEditClick}
              handleDeleteClick={this.handleDeleteClick}
              handleDoneClick={this.handleDoneClick}
            />
          ) : (
            <Row style={{ justifyContent: "center", marginTop: "2em" }}>
              <div>Data not found</div>
            </Row>
          )}
        </Container>
        <AddEditModal
          rowData={rowData}
          showModal={showModal}
          handleAddTask={this.handleAddTask}
          handleModalClose={this.handleModalClose}
        />
        <ConfirmPopup
          popupOpen={this.state.popupOpen}
          rowForDelete={this.state.rowForDelete}
          handlePopupClose={this.handlePopupClose}
          handlePopupDelete={this.handlePopupDelete}
        />
      </div>
    );
  }
}

export default ToDoList;
