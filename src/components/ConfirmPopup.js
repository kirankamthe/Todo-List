import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Form, Button } from "react-bootstrap";

export default function ConfirmPopup(props) {
  return (
    <div>
      <Dialog
        maxWidth="xl"
        open={props.popupOpen}
        onClose={props.handlePopupClose}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Delete Task
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ minWidth: "22em" }}>
            <Form.Label style={{ fontWeight: "bold", marginRight: 5 }}>
              Title:
            </Form.Label>
            {props.rowForDelete ? props.rowForDelete.title : ""}
            <br />
            Do you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handlePopupClose} variant="secondary">
            No
          </Button>
          <Button onClick={props.handlePopupDelete} variant="danger">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
