import React, { Component } from "react";
import ReactQuill from "react-quill";
import icon from "../icon.png";

export class AddNote extends Component {
  state = {
    text: "",
    title: "",
    _id: ""
  };

  // Lifecycle

  componentDidMount() {
    const { text, title, _id } = this.props.selectedNote;
    this.setState({ text, title, _id });
  }

  componentDidUpdate(nextProps) {
    if (this.props.selectedNote._id !== nextProps.selectedNote._id) {
      const { text, title, _id } = this.props.selectedNote;
      this.setState({ text, title, _id });
    }
  }

  // OnChange Event

  handleTextChange = value => {
    this.setState({ text: value });
  };

  // Submit Note

  handleSubmit = e => {
    e.preventDefault();
    let selectedNote;
    this.props.notes.map(note => {
      if (note._id === this.state._id) {
        note.text = this.state.text;
        selectedNote = note;
        return note;
      }
      return note;
    });

    this.props.updateNotes(selectedNote);
    this.props.onCancel(true);
  };

  // Cancel Editing

  handleCancel = e => {
    e.preventDefault();
    this.props.onCancel(true);
  };

  // Change to edit mode

  onEdit = (e, id) => {
    e.preventDefault();
    this.props.onEdit(id);
  };

  // Delete Note

  onDelete = (e, id) => {
    e.preventDefault();
    this.props.onDelete(id);
  };

  render() {
    const { selectedNote, editing } = this.props;

    return (
      <div className="editor-container row">
        <form onSubmit={this.handleSubmit} className="col s12">
          <div className="row actionBtns">
            <div className="left">
              <a
                href="https://johngicharu.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-floating logo"
                title="My Portfolio"
              >
                <img src={icon} alt="johngicharu.dev" />
              </a>
            </div>
            <div className="right">
              <button
                style={{ marginRight: "1em" }}
                data-action="edit"
                className="purple btn-floating"
                onClick={e => this.onEdit(e, selectedNote._id)}
              >
                <i className="material-icons">mode_edit</i>
              </button>
              <button
                style={{ marginRight: "2em" }}
                data-action="delete"
                className="btn-floating pink"
                onClick={e => this.onDelete(e, selectedNote._id)}
              >
                <i className="material-icons">delete</i>
              </button>
              {editing && (
                <>
                  <button
                    style={{ marginRight: "1em" }}
                    type="submit"
                    data-action="save"
                    className="btn-floating indigo waves-light waves-effect"
                  >
                    <i className="material-icons">check</i>
                  </button>
                  <button
                    type="button"
                    data-action="cancel"
                    onClick={this.handleCancel}
                    className="btn-floating pink waves-light waves-effect"
                  >
                    <i className="material-icons">cancel</i>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="row editor-row">
            <ReactQuill
              readOnly={!editing}
              value={this.state.text}
              onChange={this.handleTextChange}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default AddNote;
