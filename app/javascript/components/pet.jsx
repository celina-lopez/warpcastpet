import React from "react";

export default function Pet({color, pet, emotion}) {
  const petImage = `/images/${pet}/${emotion}-${color}.gif`;

  return (
    <div>
      <div>Your current pet:</div>
      <img style={{maxHeight: '40vh'}} src={petImage} alt="pet" />
    </div>
  );
}
