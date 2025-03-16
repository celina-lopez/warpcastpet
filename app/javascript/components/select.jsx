import React from "react";

export default function Customize({metadata, fid, setMetadata}) {
  const [customization, setCustomization] = useState(metadata);
  const colors = ['babyblue', 'black', 'blue', 'comic', 'donut', 'flower', 'green', 'love', 'mermaid', 'rainbow', 'sparklegreen', 'sparklepink', 'sparklered', 'white', 'whitepink', 'yellow', ];
  const pets = ['hanbunkotchi', 'kurupoyotchi', 'kurupoyotchi_pink', 'mokumokutchi', 'ripputchi', 'yumehotchi'];

  const handleChange = (e) => {
    setCustomization({...customization, [e.target.name]: e.target.value});
  }

  const handleUpdate = async () => {
    const response = await fetch(`/players/${fid}`, {
      method: 'PUT',
      body: JSON.stringify({customization}),
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
