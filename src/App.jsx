import { useState } from "react";
import Logo from './Components/Logo';
import Form from './Components/Form';
import PackingList from "./Components/PackingList";
import Stats from "./Components/Stats";

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

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  return (
  <div className="app">
    <Logo />
    <Form onAddItems={handleAddItems}/>
    <PackingList 
      items={ items } 
      onDeleteItem={handleDeleteItem} 
      onToggleItem={handleToggleItem} 
      onClearList={handleClearList}
    />
    <Stats items={ items } />
  </div>
  );
}

