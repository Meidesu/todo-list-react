import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ulid } from "ulidx";
import { IItem } from "./models/item";
import { ToDoItem } from "./components/toDoItem";

const database: IItem[] = [
  { id: "1213123", description: "essa é uma edescrição", state: false },
  { id: "7647321864", description: "ensinar para os garotinhos", state: false },
];

function App() {
  const [list, setlist] = useState<IItem[]>(database);
  const [input, setInput] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInput(value);
  };

  const handleClick = () => {
    if (input === "") {
      return;
    }

    const newItem: IItem = {
      id: ulid(),
      description: input,
      state: false,
    };

    const newList = [...list, newItem];

    setlist(newList);

    setInput("");
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const newList = list.map((item) => {
      if (item.id === id) {
        item.state = e.target.checked;
      }

      return item;
    });
    // console.log(newLlist[index].state);
    setlist(newList);
  };

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    const newList = list.filter((item) => item.id !== id);

    setlist(newList);


  };

  useEffect(() => {
    console.log(list)
  }, [list])

  const handleEdit = (value: string, id: string) => {
    console.log(list);
    const newList = list.map((item) => {
      if (item.id === id) {
        item.description = value;
      }

      return item;
    });

    setlist(newList)
  };

  return (
    <main>
      <input
        placeholder="Digite a sua task..."
        value={input}
        onChange={handleChange}
      ></input>
      <button onClick={handleClick}>Salvar</button>
      <div
        className="card"
        style={{ display: "flex", flexDirection: "column", rowGap: ".5rem" }}
      >
        {list.map((item) => (
          <ToDoItem
            item={item}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
