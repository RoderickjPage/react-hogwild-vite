import React, { useState } from "react";
import Nav from "./Nav";
import HogCard from "./HogCard";
import HogForm from "./HogForm";
import hogs from "../porkers_data";

function App() {
  const [hogList, setHogList] = useState(hogs);
  const [greasedOnly, setGreasedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [hidden, setHidden] = useState([]);

  function handleHide(name) {
    setHidden((currentHidden) => [...currentHidden, name]);
  }

  function handleAddHog(newHog) {
    setHogList((currentList) => [...currentList, newHog]);
  }

  let shown = hogList.filter((hog) => !hidden.includes(hog.name));

  if (greasedOnly) {
    shown = shown.filter((hog) => hog.greased);
  }

  if (sortBy === "name") {
    shown = [...shown].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "weight") {
    shown = [...shown].sort((a, b) => a.weight - b.weight);
  }

  return (
    <div className="App">
      <Nav />
      <div className="ui container">
        <div>
          <input
            id="greased-filter"
            type="checkbox"
            checked={greasedOnly}
            onChange={(event) => setGreasedOnly(event.target.checked)}
          />
          <label htmlFor="greased-filter">Greased Pigs Only?</label>
        </div>
        <div>
          <label htmlFor="sort-by">Sort by:</label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="">None</option>
            <option value="name">name</option>
            <option value="weight">weight</option>
          </select>
        </div>
        <HogForm onAddHog={handleAddHog} />
      </div>
      <div className="ui grid container">
        {shown.map((hog) => (
          <HogCard key={hog.name} hog={hog} onHide={handleHide} />
        ))}
      </div>
    </div>
  );
}

export default App;
