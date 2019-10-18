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
        <a
          style={{ margin: "1em", color: "black" }}
          href="!#"
          data-target="slide-out"
          data-action="notes"
          className="right sidenav-trigger"
        >
          <i className="material-icons">menu</i>
        </a>
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
          }}
          className="valign-wrapper"
        >
          <h6>Select/Add note to start</h6>
        </div>
      )}
    </div>
  );
};

export default Editor;
