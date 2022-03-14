import { FormSelect, FloatingLabel, FormControl } from "react-bootstrap";

const StepTwo = ({ computer, handleChange }) => {
  return (
    <>
      <FloatingLabel controlId="memory" label="Ram memory" className="mb-3">
        <FormControl
          type="text"
          placeholder="Ram memory"
          onChange={(e) => handleChange("ram_memory", e.target.value)}
          value={computer.ram_memory}
        />
      </FloatingLabel>
      <FloatingLabel controlId="mother" label="Motherboard" className="mb-3">
        <FormControl
          type="text"
          placeholder="Motherboard"
          onChange={(e) => handleChange("motherboard", e.target.value)}
          value={computer.motherboard}
        />
      </FloatingLabel>
      <FloatingLabel controlId="cpu" label="CPU" className="mb-3">
        <FormControl
          type="text"
          placeholder="CPU"
          onChange={(e) => handleChange("cpu", e.target.value)}
          value={computer.cpu}
        />
      </FloatingLabel>
      <FloatingLabel controlId="gpu" label="GPU" className="mb-3">
        <FormControl
          type="text"
          placeholder="GPU"
          onChange={(e) => handleChange("gpu", e.target.value)}
          value={computer.gpu}
        />
      </FloatingLabel>
      <FloatingLabel controlId="psu" label="Power supply" className="mb-3">
        <FormControl
          type="text"
          placeholder="Power supply"
          onChange={(e) => handleChange("psu", e.target.value)}
          value={computer.psu}
        />
      </FloatingLabel>
      <FloatingLabel controlId="storage" label="Storage" className="mb-3">
        <FormControl
          type="text"
          placeholder="Storage"
          onChange={(e) => handleChange("storage", e.target.value)}
          value={computer.storage}
        />
      </FloatingLabel>
    </>
  );
};

export default StepTwo;
