import React from "react";
import AddNote from "./AddNote";

const Editor = props => {
  const {
    editing,
    onEdit,
    onCancel,
    selectedNote,
    onDelete,
    notes,
    updateNotes
  } = props;
  return (
    <div className="editor">
      <header className="row">
        <div className="right">
          <a
            style={{ margin: "1em", color: "black" }}
            href="!#"
            data-target="slide-out"
            className="sidenav-trigger"
          >
            <span className="indigo-text">View Notes</span>
            <i className="material-icons">list</i>
          </a>
        </div>
      </header>
      {selectedNote ? (
        <AddNote
          editing={editing}
          onEdit={onEdit}
          onCancel={onCancel}
          selectedNote={selectedNote}
          onDelete={onDelete}
          notes={notes}
          updateNotes={updateNotes}
        />
      ) : (
        <>
          <div className="info_text small">
            Click
            <a
              href="!#"
              data-target="slide-out"
              className="sidenav-trigger indigo-text"
            >
              View Notes
            </a>
            Above to Start
          </div>
          <div className="info_text large">
            Let's Begin by Adding a Note Shall We?
          </div>
        </>
      )}
    </div>
  );
};

export default Editor;
