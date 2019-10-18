import React from "react";
import "./App.css";
import uuid from "uuid";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min";
import Editor from "./components/Editor";
import Sidenav from "./components/Sidenav";

class App extends React.Component {
  state = {
    notes: [],
    selectedNote: null,
    editing: false,
    sort: "",
    addingNote: false
  };

  // Lifecyle Methods

  componentDidMount() {
    if (window.localStorage.getItem("jdev_notes")) {
      this.setState({
        notes: JSON.parse(window.localStorage.getItem("jdev_notes"))
      });
    } else {
      window.localStorage.setItem(
        "jdev_notes",
        JSON.stringify(this.state.notes)
      );
    }

    // Init side nav component
    document.addEventListener("DOMContentLoaded", function() {
      const elem = document.querySelector(".sidenav");
      const options = {
        edge: "left"
      };
      M.Sidenav.init(elem, options);
    });
  }

  componentDidUpdate() {
    window.localStorage.setItem("jdev_notes", JSON.stringify(this.state.notes));
  }

  // Create Methods

  createNewNote = e => {
    e.preventDefault();
    const note = {
      _id: uuid.v4(),
      title: "",
      text: ""
    };
    const notes = [note, ...this.state.notes];
    this.setState({ selectedNote: note, notes, editing: true });
  };

  // Note Update Methods

  updateNotes = selectedNote => {
    const notes = [...this.state.notes];

    notes.map(note => {
      if (note._id === selectedNote._id) {
        if (selectedNote.title.trim() === "") {
          return alert("Please add a title to your note");
        }
        if (selectedNote.text.trim() === "") {
          if (window.confirm("Are you sure you want to save an empty note?")) {
            note.text = selectedNote.text;
          }
        }
        return note;
      }
      return note;
    });

    this.setState({ notes, selectedNote, editing: false });
  };

  // Note Delete Methods

  // Delete Single Note
  handleDelete = id => {
    const notes = [...this.state.notes];
    if (window.confirm("Are you sure? This cannot be undone")) {
      this.setState({ notes: notes.filter(note => note._id !== id) });
    }
  };

  // Delete All Notes
  handleDeleteAll = e => {
    e.preventDefault();
    if (window.confirm("Are you sure? This cannot be undone")) {
      this.setState({ notes: [] });
    }
  };

  // Updating Note

  handleEditing = id => {
    this.setState({
      editing: true,
      selectedNote: this.state.notes.filter(note => note._id === id)[0]
    });
  };

  handleCancel = check => {
    if (check) {
      this.setState({ editing: false });
    }
  };

  handleUpdateTitle = (id, value) => {
    const notes = [...this.state.notes];
    notes.map(note => {
      if (note._id === id) {
        note.title = value;
        return note;
      }
      return note;
    });
    this.setState({ notes });
  };

  // Note Selection

  handleSelectNote = id => {
    let selectedNote;
    this.state.notes.map(note => {
      if (note._id === id) {
        selectedNote = note;
        return note;
      }
      return note;
    });
    // const instance = M.Sidenav.getInstance(document.querySelector(".sidenav"));
    // instance.close();
    this.setState({
      selectedNote,
      editing: false
    });
  };

  // Sorting Notes

  sortNotes = e => {
    this.setState({ sort: e.target.value });
  };

  render() {
    const { notes, selectedNote, editing, sort } = this.state;

    return (
      <div className="container">
        <div className="row main">
          <div className="col s12">
            <Sidenav
              onDeleteAll={this.handleDeleteAll}
              onCreateNewNote={this.createNewNote}
              onSortNotes={this.sortNotes}
              selectedNote={selectedNote}
              onAction={this.onAction}
              notes={this.state.notes}
              editing={editing}
              onUpdateTitle={this.handleUpdateTitle}
              onSelect={this.handleSelectNote}
              onDelete={this.handleDelete}
              sort={sort}
            />

            <Editor
              editing={editing}
              onEdit={this.handleEditing}
              onCancel={this.handleCancel}
              selectedNote={selectedNote}
              onDelete={this.handleDelete}
              notes={notes}
              updateNotes={this.updateNotes}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
