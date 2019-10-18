import React from "react";

class Note extends React.Component {
  onUpdateTitle = (e, id) => {
    this.props.onUpdateTitle(id, e.target.value);
  };

  onSelect = (e, id) => {
    if (
      e.target.classList.contains("btn-floating") ||
      e.target.parentElement.classList.contains("btn-floating")
    ) {
      this.props.onDelete(id);
    } else if (!e.target.classList.contains("title")) {
      this.props.onSelect(id);
    }
  };

  onDelete = (e, id) => {
    e.preventDefault();
    this.props.onDelete(id);
  };

  removeHTMLTags = str => {
    return str.replace(/<[^>]*>?/gm, "");
  };
  render() {
    const { note, selectedNote } = this.props;

    return (
      <li
        onClick={e => this.onSelect(e, note._id)}
        className={`collection-item ${note === selectedNote &&
          "indigo lighten-2 selected"}`}
      >
        <div className="input-field note-title">
          <input
            style={{
              margin: "0",
              borderBottomColor: `${
                note === selectedNote ? "white" : "transparent"
              }`,
              fontSize: "1.2em"
            }}
            defaultValue={note.title}
            type="text"
            required
            name="title"
            id="title"
            onChange={e => this.onUpdateTitle(e, note._id)}
          />
        </div>
        <div className="secondary-content">
          <button onClick={e => this.onDelete} className="btn-floating pink">
            <i className="material-icons">delete</i>
          </button>
        </div>
        <p className="text">
          {this.removeHTMLTags(note.text).substring(0, 100)}
          ...
        </p>
      </li>
    );
  }
}

export default Note;
