import React from "react";
import "./App.css";
import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
import uuid from "uuid";
import M from "materialize-css";

class App extends React.Component {
  state = {
    notes: [],
    selectedNote: null,
    editing: false,
    sort: "",
    addingNote: false
  };

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

  handleDelete = id => {
    const notes = [...this.state.notes];
    if (window.confirm("Are you sure? This cannot be undone")) {
      this.setState({ notes: notes.filter(note => note._id !== id) });
    }
  };

  updateNotes = selectedNote => {
    const notes = [...this.state.notes];

    notes.map(note => {
      if (note._id === selectedNote._id) {
        note.text = selectedNote.text;
        return note;
      }
      return note;
    });

    this.setState({ notes, selectedNote, editing: false });
  };

  handleDeleteAll = e => {
    e.preventDefault();
    if (window.confirm("Are you sure? This cannot be undone")) {
      this.setState({ notes: [] });
    }
  };

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
      selectedNote
    });
  };

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

  sortNotes = e => {
    this.setState({ sort: e.target.value });
  };

  render() {
    const { notes, selectedNote, editing, sort } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <ul id="slide-out" className="sidenav sidenav-fixed">
              <div className="header col s12">
                <h4>
                  Notes
                  {notes.length !== 0 && (
                    <button
                      onClick={this.handleDeleteAll}
                      title="Delete All"
                      className="btn-floating right red"
                    >
                      <i className="material-icons">delete</i>
                    </button>
                  )}
                </h4>
                <button
                  onClick={this.createNewNote}
                  style={{ width: "100%" }}
                  className="btn indigo"
                >
                  Add Note
                </button>
                <div className="form-input">
                  <input
                    onChange={this.sortNotes}
                    type="search"
                    name="filter"
                    id="filter"
                    value={this.state.sort}
                    placeholder="Search"
                  />
                </div>
              </div>

              <Notes
                selectedNote={selectedNote}
                onAction={this.onAction}
                notes={this.state.notes}
                editing={editing}
                onUpdateTitle={this.handleUpdateTitle}
                onSelect={this.handleSelectNote}
                onDelete={this.handleDelete}
                sort={sort}
              />
            </ul>

            <div className="editor">
              <header className="row">
                <a
                  style={{ margin: "1em", color: "black" }}
                  href="!#"
                  data-target="slide-out"
                  className="right sidenav-trigger"
                >
                  <i className="material-icons">menu</i>
                </a>
              </header>
              {selectedNote ? (
                <AddNote
                  editing={editing}
                  onEdit={this.handleEditing}
                  onCancel={this.handleCancel}
                  selectedNote={selectedNote}
                  onDelete={this.handleDelete}
                  notes={notes}
                  updateNotes={this.updateNotes}
                />
              ) : (
                <div className="row">
                  <h6>Select/Add note to start</h6>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
