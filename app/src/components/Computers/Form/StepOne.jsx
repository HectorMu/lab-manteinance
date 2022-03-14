import { useState } from "react";
import { FormSelect, FloatingLabel, FormControl } from "react-bootstrap";
import useServiceFetch from "../../../hooks/useServiceFetch";
import labsService from "../../../services/Admin/labs.service";

const StepOne = ({ computer, handleChange }) => {
  const [labs, setLabs] = useState([]);
  useServiceFetch(labsService.List, setLabs);
  return (
    <>
      <FormSelect
        aria-label="labselect"
        onChange={(e) =>
          handleChange("fk_laboratory", parseInt(e.target.value))
        }
        value={computer.fk_laboratory}
        className="mb-3"
      >
        <option value={""}>Select a lab</option>
        {labs.map((lab) => (
          <option key={lab.id} value={lab.id}>
            {lab.id} - {lab.location}
          </option>
        ))}
      </FormSelect>
      <FloatingLabel
        controlId="serialnumber"
        label="Serial number"
        className="mb-3"
      >
        <FormControl
          type="text"
          placeholder="Serial number"
          onChange={(e) => handleChange("serial_number", e.target.value)}
          value={computer.serial_number}
        />
      </FloatingLabel>
      <FloatingLabel controlId="brand" label="Brand" className="mb-3">
        <FormControl
          type="text"
          placeholder="Brand"
          onChange={(e) => handleChange("brand", e.target.value)}
          value={computer.brand}
        />
      </FloatingLabel>
      <FormSelect
        aria-label="networkselect"
        onChange={(e) => handleChange("network_type", e.target.value)}
        value={computer.network_type}
        className="mb-3"
      >
        <option value={""}>Network type</option>
        <option value={"Wireless"}>Wireless</option>
        <option value={"LAN"}>LAN</option>
      </FormSelect>
      <FormSelect
        onChange={(e) => handleChange("status", e.target.value)}
        value={computer.status}
        aria-label="statusselect"
        className="mb-3"
      >
        <option value={""}>Status</option>
        <option value={"Working"}>Working</option>
        <option value={"On repair"}>On repair</option>
        <option value={"Not working"}>Not working</option>
      </FormSelect>
    </>
  );
};

export default StepOne;
