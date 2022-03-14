import React, { useState } from "react";
import { FormSelect, FloatingLabel, FormControl } from "react-bootstrap";
const StepThree = ({ computer, handleChange }) => {
  return (
    <>
      <FloatingLabel controlId="display" label="Display" className="mb-3">
        <FormControl
          type="text"
          placeholder="Display"
          onChange={(e) => handleChange("display", e.target.value)}
          value={computer.display}
        />
      </FloatingLabel>
      <FloatingLabel controlId="keyboard" label="Keyboard" className="mb-3">
        <FormControl
          type="text"
          placeholder="Keyboard"
          onChange={(e) => handleChange("keyboard", e.target.value)}
          value={computer.keyboard}
        />
      </FloatingLabel>
      <FloatingLabel controlId="mouse" label="Mouse" className="mb-3">
        <FormControl
          type="text"
          placeholder="Mouse"
          onChange={(e) => handleChange("mouse", e.target.value)}
          value={computer.mouse}
        />
      </FloatingLabel>
      <FloatingLabel controlId="sound" label="Sound" className="mb-3">
        <FormControl
          type="text"
          placeholder="Sound"
          onChange={(e) => handleChange("sound", e.target.value)}
          value={computer.sound}
        />
      </FloatingLabel>
    </>
  );
};

export default StepThree;
