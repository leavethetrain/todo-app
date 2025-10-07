import logo from "./logo.svg";
import { useState } from "react";
import "./scss/style.scss";

function Input({ inputValue, HandleInputValue, UserEntries }) {
  console.log(inputValue);
  return (
    <div className="input">
      <input
        className="input__user"
        value={inputValue}
        onChange={HandleInputValue}
      ></input>

      <button className="input__add-btn" onClick={UserEntries}>
        add
      </button>
    </div>
  );
}

function Empty() {
  return <p>Noch keine Todos vorhanden</p>;
}

function Entries({
  inputCheckbox,
  HandleCheckBox,
  inputValue,
  DeleteEntry,
  index,
}) {
  return (
    <div className="entries">
      <div className="entries__left">
        <input
          className="entries__user"
          onChange={HandleCheckBox}
          type="checkbox"
        />
        {inputValue}
      </div>
      <button
        onClick={() => DeleteEntry(index)}
        className="entries__delete-btn"
      >
        löschen
      </button>
    </div>
  );
}

function App() {
  const [inputValue, setInputValue] = useState("");
  const [inputCheckbox, setInputCheckbbox] = useState(false);
  const [entries, setEntries] = useState([]);

  function UserEntries() {
    if (inputValue.trim() === "") return;
    setEntries([...entries, inputValue]);
    setInputValue("");
  }

  function HandleInputValue(changeEvent) {
    setInputValue(changeEvent.target.value);
    console.log(changeEvent.target.value);
  }

  function HandleCheckBox(changeEvent) {
    setInputCheckbbox(changeEvent.target.checked);
    console.log(changeEvent.target.checked);
  }

  function DeleteEntry(indexToDelete) {
    setEntries(entries.filter((_, index) => index !== indexToDelete));
  }

  return (
    <div className="App">
      <Input
        inputValue={inputValue}
        HandleInputValue={HandleInputValue}
        UserEntries={UserEntries}
      ></Input>
      {entries.map((entry, index) => (
        <Entries
          key={index}
          inputCheckbox={inputCheckbox}
          HandleCheckBox={HandleCheckBox}
          inputValue={entry}
          DeleteEntry={DeleteEntry}
          index={index}
        />
      ))}
      {entries.length === 0 && <Empty />}
    </div>
  );
}

export default App;
