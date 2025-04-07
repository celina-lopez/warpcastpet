import React from "react";

export default function Pet({color, pet, emotion}) {
  const petImage = `/images/${pet}/${emotion}-${color}.gif`;

  return (
    <div className="flex justify-center items-center">
      <img style={{maxHeight: '40vh'}} src={petImage} alt="pet" />
    </div>
  );
}
