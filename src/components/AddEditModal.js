import { useEffect, useState } from "react";
import moment from "moment";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

function AddEditModal(props) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "none",
    dueDate: "",
    currentState: "Pending",
    createdAt: moment(new Date()).format("YYYY-MM-DD"),
  });
  const [titleError, setTitleError] = useState(false);
  const [descError, setDescError] = useState(false);

  const action = props.rowData.action;

  useEffect(() => {
    if (
      (props.rowData.data && props.rowData.action == "view") ||
      props.rowData.action == "edit"
    ) {
      setFormData({
        title: props.rowData.data.title,
        description: props.rowData.data.description,
        dueDate: props.rowData.data.dueDate,
        priority: props.rowData.data.priority,
        currentState: props.rowData.data.currentState,
        createdAt: props.rowData.data.createdAt,
      });
    }
  }, [props.rowData.data || props.rowData.action]);

  const clearFormData = () => {
    setFormData({
      title: "",
      description: "",
      dueDate: "",
      priority: "none",
      currentState: "Pending",
      createdAt: moment(new Date()).format("YYYY-MM-DD"),
    });
  };

  //save entered value and handle error
  const handleChange = (e) => {
    let label = e.target.name;
    let value = e.target.value;
    formData[label] = value;
    if (label == "title") setTitleError(false);
    if (label == "description") setDescError(false);
    setFormData({ ...formData });
  };

  //check title and description if available then submit ow show error message
  const handleSubmit = () => {
    if (validateForm()) {
      let editData = props.rowData.data;
      props.handleAddTask(formData, editData, () => {
        clearFormData();
      });
    }
  };

  const validateForm = () => {
    let errorArePresent = false;
    if (
      formData.title == "" ||
      (formData.title && formData.title.length < 10)
    ) {
      setTitleError(true);
      errorArePresent = true;
    }
    if (
      formData.description == "" ||
      (formData.description && formData.description.length < 10)
    ) {
      setDescError(true);
      errorArePresent = true;
    }
    return !errorArePresent;
  };

  return (
    <Modal centered show={props.showModal} onHide={props.handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="title"
              name="title"
              readOnly={action == "view"}
              value={formData.title}
              minLength={10}
              maxLength={140}
              onChange={handleChange}
            />
            {titleError && (
              <div className="error">
                Title should contain atleast 10 characters
              </div>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              readOnly={action == "view"}
              value={formData.description}
              name="description"
              placeholder="description"
              minLength={10}
              maxLength={500}
              onChange={handleChange}
            />
            {descError && (
              <div className="error">
                Description should contain atleast 10 characters
              </div>
            )}
          </Form.Group>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  readOnly={action == "view"}
                  value={formData.dueDate}
                  type="date"
                  onChange={handleChange}
                  name="dueDate"
                />
              </Form.Group>
            </Col>
            <Col style={{ pointerEvents: action == "view" ? "none" : "auto" }}>
              <Form.Group>
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.priority}
                  className="mr-sm-2"
                  id="inlineFormCustomSelect"
                  custom
                  onChange={handleChange}
                  name="priority"
                >
                  <option value="none">None</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      {action == "view" ? null : (
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleModalClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
}

export default AddEditModal;
