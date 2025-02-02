import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false},
  { id: 2, description: "Socks", quantity: 12, packed: true},
  { id: 3, description: "Charger", quantity: 1, packed: false},
];

export default function App() {
  return <div className="app">
  <Logo />
  <Form />
  <PackingList />
  <Stats />
</div>

}

function Logo() {
  return <h1>🏝️ Far Away 💼</h1>
}

function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(5);

  function handleSubmit(e) {
    e.preventDefault();

    // to prevent from submitting, if it's empty
    if (!description) return;

    // Object or JSON data
    const newItem = { description, quantity, packed: false,
      id: Date.now()};
    console.log(newItem);

    // Reset the State(s)
    setDescription('');
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>

      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {/* creating an empty array (which is 20 items), "i + 1" so that it would start at 1 and not 0 */}
        {Array.from({length: 20}, (_, i) => i + 1).
        map(num=><option value={num} key={num}>{num}</option>)}
      </select>

      {/* Type > setDescription's State(description) > put it as value */}
      <input type='text' placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)}/>
      <button>Add</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {/* Iterate through the Items */}
        {initialItems.map(item=>
          <Item item={item} key={item.id} />
        )}
      </ul>
    </div>

  );
}

function Item ({item}) {
  return (
    <li>
      {/* Cross-off "packed" items */}
      <span style={item.packed ? {textDecoration: "line-through"}: {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}