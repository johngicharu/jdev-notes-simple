import React, { Component } from "react";
import ReactQuill from "react-quill";

export class AddNote extends Component {
  state = {
    text: "",
    title: "",
    _id: ""
  };

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

  handleTextChange = value => {
    this.setState({ text: value });
  };

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

  handleCancel = e => {
    e.preventDefault();
    this.props.onCancel(true);
  };

  onEdit = (e, id) => {
    e.preventDefault();
    this.props.onEdit(id);
  };

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
            <div style={{ marginBottom: "1em" }} className="right">
              <button
                style={{ marginRight: "1em" }}
                data-action="edit"
                className="purple btn"
                onClick={e => this.onEdit(e, selectedNote._id)}
              >
                <i className="material-icons">edit</i>
              </button>
              <button
                style={{ marginRight: "2em" }}
                data-action="delete"
                className="btn pink"
                onClick={e => this.onDelete(e, selectedNote._id)}
              >
                <i className="material-icons">delete</i>
              </button>
              {editing && (
                <>
                  <button
                    style={{ marginRight: "1em" }}
                    type="submit"
                    className="btn indigo waves-light waves-effect"
                  >
                    <i className="material-icons">check</i>
                  </button>
                  <button
                    type="button"
                    onClick={this.handleCancel}
                    className="btn pink waves-light waves-effect"
                  >
                    <i className="material-icons">cancel</i>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="row editor-row">
            <div className="main-editor">
              <ReactQuill
                readOnly={!editing}
                value={this.state.text}
                onChange={this.handleTextChange}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddNote;
