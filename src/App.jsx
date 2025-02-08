import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false},
  { id: 2, description: "Socks", quantity: 12, packed: true},
  { id: 3, description: "Charger", quantity: 1, packed: false},
];

export default function App() {
  // Lifted up this state from Form() component:
  const [items, setItems] = useState([]);

  // created a function to addItems and pass it as props:
  function handleAddItems(item) {
    setItems(items => [...items, item]);
    console.table(items);
  }

  // created a function to deleteItems and pass it as props:
  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id));
    
  }

  function handleToggleItem(id) {
    setItems(items => items.map(item => id === item.id ? {...item, packed: !item.packed} : item))
  }

  return (
  <div className="app">
    <Logo />
    <Form onAddItems={handleAddItems}/>
    <PackingList items={ items } onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} />
    <Stats items={ items } />
  </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 💼</h1>
}

function Form({ onAddItems }) {
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

    onAddItems(newItem);

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
      <input type='text' placeholder="Item..." value={description} 
        onChange={(e) => setDescription(e.target.value)}/>
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {/* Iterate through the Items */}
        {items.map(item=>
          <Item item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} key={item.id} />
        )}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)} />
      {/* Cross-off "packed" items */}
      <span style={item.packed ? {textDecoration: "line-through"}: {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id) }>❌</button>
    </li>
  );
}

function Stats({ items }) {
  // Early return so we don't have to do the calculations below if there's no item.
  if (!items.length) 
    return (
    <p className="stats">
      <em>Start adding some items to your packing list 🚀</em>
    </p>
  );

  // This is about Derived State:
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100 ? 'You got everything! Ready to go ✈️' : 
        `You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`
        }
      </em>
    </footer>
  );
}