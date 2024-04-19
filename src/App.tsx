import { useEffect, useRef, useState } from "react";
import { ulid } from "ulidx";
import { IItem } from "./models/item";
import { ToDoItem } from "./components/toDoItem";
import styles from './App.module.css'

// const database: IItem[] = [
//   { id: "1213123", description: "essa é uma edescrição", state: false },
//   { id: "7647321864", description: "ensinar para os garotinhos", state: false },
// ];

function App() {
  const [list, setlist] = useState<IItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/tasks").then(async (response) => {
      const json = await response.json();

      setlist(json);
    });
  }, []);

  // const [input, setInput] = useState<string>(""); // Pq não o useRef

  const inputRef = useRef<HTMLInputElement>(null);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;

  // };

  const handleClick = () => {
    if (!inputRef.current) {
      return;
    }

    const newItem: IItem = {
      id: ulid(),
      description: inputRef.current.value,
      state: false,
    };

    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    }).then(() => {
      setlist([...list, newItem]);
    });

    // const newList = [...list, newItem];

    // setlist(newList);
    inputRef.current.value = "";
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

  const handleDelete = (id: string) => {
    const newList = list.filter((item) => item.id !== id);
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      setlist(newList);
    });
  };

  useEffect(() => {
    console.log(list);
  }, [list]);

  const handleEdit = (value: string, id: string) => {
    console.log(list);
    let updItem: IItem | null = null;
    const newList = list.map((item) => {
      if (item.id === id) {
        item.description = value;
        updItem = item;
      }
      return item;
    });

    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updItem),
    }).then(() => {
      setlist(newList);
    });
  };

  // document.addEventListener

  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.title}>TODO LIST - LABORAS</h1>
      </header>
      <main>
        <input placeholder="Digite a sua task..." ref={inputRef}></input>
        <button onClick={handleClick}>Salvar</button>
        <div
          className="card"
          style={{ display: "flex", flexDirection: "column", rowGap: ".5rem" }}
        >
          {list.length !== 0  &&
            list.map((item) => (
              <ToDoItem
                item={item}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))}
          {!list.length && <p>TEM NADA</p>}
        </div>
      </main>
    </div>
  );
}

export default App;
