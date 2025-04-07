import React, { useState } from "react";
import Pet from "./pet";
export default function Form({pet, color, setPet, setColor, fid, emotion, setMetadata}) {
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    setOpen(false);
    fetch(`/players/${fid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        player: {
          pet,
          color,
        },
      }),
    }).then(res => res.json()).then(data => {
      setMetadata((old) => ({...old, ...data}));
    });
  }

  return (
    <div className="justify-self-center">
      <button className="bg-[#7c65c1] text-white w-full px-4 py-2 my-2 rounded-md" onClick={() => setOpen(true)}>Update Virtual Pet</button>
      {open && (
        <div>
          <SelectColor color={color} setColor={setColor} />
          <br/>
          <SelectPet pet={pet} setPet={setPet} />
          <br/>
          <button className="bg-[#7c65c1]  text-white w-full px-4 py-2 rounded-md" onClick={handleSubmit}>Update</button>
          <div className="text-align-center text-sm my-2">Preview</div>
          <Pet pet={pet} color={color} emotion={emotion} />
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
    <select value={pet} onChange={(e) => setPet(e.target.value)} className="text-black select select-bordered w-full max-w-xs rounded-md my-2">
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
    <select value={color} onChange={(e) => setColor(e.target.value)} className="text-black select select-bordered w-full max-w-xs rounded-md my-2">
      {colors.map((c) => (
        <option value={c}>{c}</option>
      ))}
    </select>
  );
}
