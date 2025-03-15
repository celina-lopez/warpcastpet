import React from "react";

export default function Pet({metadata}) {
  const pet = metadata.pet || 'hanbunkotchi';
  const color = metadata.color || 'blue';

  // TODO: get status from backend, based on activity
  const status = "dancing";

  const petImage = `/images/${pet}/${status}-${color}.gif`;

  return (
    <div>
      <img src={petImage} alt="pet" />
    </div>
  );
}
