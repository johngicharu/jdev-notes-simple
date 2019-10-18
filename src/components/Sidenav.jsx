import React from "react";
import Notes from "./Notes";

const Sidenav = props => {
  const {
    onDeleteAll,
    onCreateNewNote,
    onSortNotes,
    selectedNote,
    onAction,
    notes,
    editing,
    onUpdateTitle,
    onSelect,
    onDelete,
    sort
  } = props;

  return (
    <ul id="slide-out" className="sidenav sidenav-fixed">
      <div className="header col s12">
        <h4>
          Notes
          {notes.length !== 0 && (
            <button
              onClick={onDeleteAll}
              title="Delete All"
              className="btn-floating right red"
            >
              <i className="material-icons">delete</i>
            </button>
          )}
        </h4>
        <button
          onClick={onCreateNewNote}
          style={{ width: "100%" }}
          className="btn indigo"
        >
          Add Note
        </button>
        <div className="form-input">
          <input
            onChange={onSortNotes}
            type="search"
            name="filter"
            id="filter"
            value={sort}
            placeholder="Search"
          />
        </div>
      </div>

      <Notes
        selectedNote={selectedNote}
        onAction={onAction}
        notes={notes}
        editing={editing}
        onUpdateTitle={onUpdateTitle}
        onSelect={onSelect}
        onDelete={onDelete}
        sort={sort}
      />
    </ul>
  );
};

export default Sidenav;
