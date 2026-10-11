import React, { useState } from "react";

function HogForm({ onAddHog }) {
  const [formData, setFormData] = useState({
    name: "",
    weight: "",
    specialty: "",
    greased: false,
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedSpecialty = formData.specialty.trim();

    if (!trimmedName || !trimmedSpecialty) {
      return;
    }

    onAddHog({
      name: trimmedName,
      specialty: trimmedSpecialty,
      greased: formData.greased,
      weight: Number(formData.weight) || 0,
      "highest medal achieved": "bronze",
      image:
        "https://raw.githubusercontent.com/learn-co-curriculum/react-hooks-hogwild/master/public/images/babe.jpg",
    });

    setFormData({
      name: "",
      weight: "",
      specialty: "",
      greased: false,
    });
  }

  return (
    <form className="ui form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="hog-name">Name:</label>
        <input
          id="hog-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="field">
        <label htmlFor="hog-weight">Weight:</label>
        <input
          id="hog-weight"
          name="weight"
          type="number"
          value={formData.weight}
          onChange={handleChange}
        />
      </div>
      <div className="field">
        <label htmlFor="hog-specialty">Specialty:</label>
        <input
          id="hog-specialty"
          name="specialty"
          type="text"
          value={formData.specialty}
          onChange={handleChange}
        />
      </div>
      <div className="field">
        <input
          id="hog-greased"
          name="greased"
          type="checkbox"
          checked={formData.greased}
          onChange={handleChange}
        />
        <label htmlFor="hog-greased">Greased?</label>
      </div>
      <button className="ui button" type="submit">
        Add Hog
      </button>
    </form>
  );
}

export default HogForm;
