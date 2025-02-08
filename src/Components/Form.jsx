import { useState } from "react";

export default function Form({ onAddItems }) {
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