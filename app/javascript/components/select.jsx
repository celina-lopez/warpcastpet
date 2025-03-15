import React from "react";

export default function Customize({metadata, fid, setMetadata}) {
  const [customization, setCustomization] = useState(metadata);
  const colors = ['blue', 'green', 'red', 'yellow', 'purple', 'orange', 'pink', 'brown', 'gray', 'black', 'white'];
  const pets = ['hanbunkotchi', 'hanbunkotchi-2', 'hanbunkotchi-3', 'hanbunkotchi-4', 'hanbunkotchi-5', 'hanbunkotchi-6', 'hanbunkotchi-7', 'hanbunkotchi-8', 'hanbunkotchi-9', 'hanbunkotchi-10'];

  const handleChange = (e) => {
    setCustomization({...customization, [e.target.name]: e.target.value});
  }

  const handleUpdate = async () => {
    const response = await fetch(`/players/${fid}`, {
      method: 'PUT',
      body: JSON.stringify({metadata: customization}),
    });
    const data = await response.json();
    setCustomization(data);
  }
  return (
    <div>
      <h1>Customize</h1>
      <div>
        <label>Color</label>
        <select onChange={handleChange} name="color"> 
          {colors.map((color, index) => (
            <option value={index} key={index}>{color}</option>
          ))}
        </select>

        <label>Pet</label>
        <select onChange={handleChange} name="pet">
          {pets.map((pet, index) => (
            <option value={index} key={index}>{pet}</option>
          ))}
        </select>

        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
}
