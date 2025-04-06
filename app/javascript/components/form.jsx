import React, { useState } from "react";

export default function Form({pet, color, fid, emotion}) {
  const [newPet, setPet] = useState(pet);
  const [newColor, setColor] = useState(color);
  const [open, setOpen] = useState(false);

  const petImage = `/images/${newPet}/${emotion}-${newColor}.gif`;

  const handleSubmit = () => {
    setOpen(false);
    fetch(`/players/${fid}`, {
      method: 'PUT',
      body: JSON.stringify({
        pet: newPet,
        color: newColor,
      }),
    });
  }

  return (
    <div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => setOpen(true)}>Update Virtual Pet</button>
      {open && (
        <div>
          <SelectColor color={newColor} setColor={setColor} />
          <br/>
          <SelectPet pet={newPet} setPet={setPet} />
          <br/>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>Submit</button>
          <div>Preview</div>
          <img src={petImage} height="50" alt="pet" />
        </div>
      )}
    </div>
  );
}
function SelectPet({pet, setPet}) {
  const pets = [
    'hanbunkotchi',
    'kurupoyotchi',
    'kurupoyotchi_pink',
    'mokumokutchi',
    'ripputchi',
    'yumehotchi',
  ]
  return (
    <select value={pet} onChange={(e) => setPet(e.target.value)} className="select select-bordered w-full max-w-xs">
      {pets.map((p) => (
        <option value={p} >{p}</option>
      ))}
    </select>
  )
}
function SelectColor({color, setColor}) {
  const colors = [
    'babyblue',
    'black',
    'blue',
    'comic',
    'donut',
    'flower',
    'green',
    'love',
    'mermaid',
    'rainbow',
    'sparklegreen',
    'sparklepink',
    'sparklered',
    'white',
    'whitepink',
    'yellow',
  ]
  return (
    <select value={color} onChange={(e) => setColor(e.target.value)} className="select select-bordered w-full max-w-xs">
      {colors.map((c) => (
        <option value={c}>{c}</option>
      ))}
    </select>
  );
}
