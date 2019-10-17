import React from "react";
import Note from "./Note";

const Notes = props => {
  const {
    notes,
    selectedNote,
    sort,
    onSelect,
    onUpdateTitle,
    onAction,
    onDelete
  } = props;

  return (
    <div className="notes">
      {notes.length !== 0 && (
        <ul className="collection">
          {notes
            .filter(note => {
              let reg = new RegExp(sort, "i");
              return reg.test(note.title);
            })
            .map(note => (
              <Note
                onSelect={onSelect}
                selectedNote={selectedNote}
                key={note._id}
                note={note}
                onUpdateTitle={onUpdateTitle}
                onAction={onAction}
                onDelete={onDelete}
              />
            ))}
        </ul>
      )}
    </div>
  );
};

export default Notes;
