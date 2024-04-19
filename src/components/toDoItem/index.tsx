import { useState } from "react";
import { IItem } from "../../models/item";

interface ITodoItem {
  item: IItem;
  //   manager
  handleCheck: (e: any, id: string) => void;
  handleDelete: (id: string) => void;
  handleEdit: (value: string, id: string) => void;
}

export function ToDoItem({
  item,
  handleCheck,
  handleDelete,
  handleEdit,
}: ITodoItem) {
  const [editMode, setEditMode] = useState(false);

  const [tempValue, setTempValue] = useState("");
  const handleSave = (id: string) => {
    if (editMode) {
      handleEdit(tempValue, id);
    } else {
      setTempValue(item.description);
    }

    setEditMode(!editMode);
  };

  const handleCancel = () => {
    setEditMode(!editMode);
    setTempValue("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setTempValue(value);
  };

  return (
    <>
      <div
        key={item.id}
        style={{
          display: "flex",
          gap: ".3rem",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <input
          type="checkbox"
          checked={item.state}
          onChange={(e) => handleCheck(e, item.id)}
          style={{ width: "15px", height: "15px" }}
        />

        <div style={{ textDecoration: item.state ? "line-through" : "none" }}>
          {item.description}
        </div>

        <button
          onClick={(e) => {
            handleDelete(item.id), setEditMode(false);
          }}
        >
          Delete
        </button>

        <button onClick={() => handleSave(item.id)}>
          {editMode ? "Salvar" : "Editar"}
        </button>
      </div>
      {editMode ? (
        <div>
          <input value={tempValue} onChange={handleChange} />
          <button onClick={handleCancel}>X</button>
        </div>
      ) : null}
    </>
  );
}
