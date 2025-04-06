import React from "react";

export default function Pet({color, pet, status}) {

  const petImage = `/images/${pet || 'hanbunkotchi'}/${status || 'dancing'}-${color || 'blue'}.gif`;

  return (
    <div>
      <div>Your current pet:</div>
      <img src={petImage} alt="pet" />
    </div>
  );
}
