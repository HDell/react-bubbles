import React, { useState } from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is it saved right now?
    // console.log(colorToEdit);
    axiosWithAuth().put('api/colors/' + colorToEdit.id, colorToEdit)
      .then((res) => {
        updateColors(colors.map((col) => {
            if (col.id === colorToEdit.id) {
                return colorToEdit;
            }
            return col;
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

    const addColor = e => {
        e.preventDefault();
        axiosWithAuth().post('api/colors', colorToAdd)
            .then((res) => {
                console.log(colorToAdd);
                updateColors([...colors, colorToAdd]);
                setColorToAdd(initialColor);
            })
            .catch((err) => {
                console.log(err);
            });
    };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth().delete('api/colors/'+color.id)
        .then((res) => {
          updateColors(colors.filter((col) => col.id !== color.id));
        })
        .catch((err) => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/*<div className="spacer" />*/}
      {/* stretch - build another form here to add a color */}
        <form onSubmit={addColor}>
            <legend>add color</legend>
            <label>
                color name:
                <input
                    onChange={e =>
                        setColorToAdd({
                            ...colorToAdd,
                            id: colors.length+1,
                            color: e.target.value })
                    }
                    value={colorToAdd.color}
                />
            </label>
            <label>
                hex code:
                <input
                    onChange={e =>
                        setColorToAdd({
                            ...colorToAdd,
                            id: colors.length+1,
                            code: { hex: e.target.value }
                        })
                    }
                    value={colorToAdd.code.hex}
                />
            </label>
            <div className="button-row">
                <button type="submit">add</button>
            </div>
        </form>
    </div>
  );
};

export default ColorList;
