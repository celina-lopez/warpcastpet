import React from "react";

export default function Form({pet, color, fid}) {
  const [newPet, setPet] = useState(pet || 'hanbunkotchi');
  const [newColor, setColor] = useState(color || 'blue');
  const [open, setOpen] = useState(false);

  const status = "dancing";
  const petImage = `/images/${pet}/${status}-${color}.gif`;

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
      <button onClick={() => setOpen(true)}>Update Virtual Pet</button>
      {open && (
        <div>
          <input type="text" value={newColor} onChange={(e) => setColor(e.target.value)} />
          <input type="text" value={newPet} onChange={(e) => setPet(e.target.value)} />
          <button onClick={handleSubmit}>Submit</button>
          <div>Preview</div>
          <img src={petImage} height="50" alt="pet" />
        </div>
      )}
    </div>
  );
}
