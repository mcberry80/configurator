import React, { useState, useEffect } from 'react';

interface Item {
  state: string;
  capital: string;
}

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();

  useEffect(() => {
    fetch('http://localhost:3000/states')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error(error));
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const state = event.target.value;
    const selectedItem = items.find(item => item.state === state);
    setSelectedItem(selectedItem);
  };

  return (
    <div>
      <h1>Select an item:</h1>
      <select value={selectedItem?.state ?? ''} onChange={handleSelectChange}>
        <option value="">-- Select an item --</option>
        {items.map(item => (
          <option key={item.state} value={item.state}>
            {item.state}
          </option>
        ))}
      </select>
      {selectedItem && (
        <div>
          <h2>{selectedItem.state}</h2>
          <p>Capital: {selectedItem.capital}</p>
        </div>
      )}
    </div>
  );
}

export default App;