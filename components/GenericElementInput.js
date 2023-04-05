import { Autocomplete, Chip, TextField } from "@mui/material";
import React from "react";

export default function GenericElementInput({
  elements,
  setElements,
  element,
  setElement,
  options,
}) {
  const updateElements = (value) => {
    if (!value) return;
    if (!elements.find((e) => e === value)) {
      setElements([...elements, value]);
    }
    setElement(null);
  };

  const deleteElement = (elementToDelete) => {
    setElements(elements.filter((element) => element !== elementToDelete));
  };

  return (
    <div className="genericElementInput">
      <div className="chips">
        {elements.map((element) => (
          <Chip
            key={element}
            label={element}
            onDelete={() => deleteElement(element)}
            variant="outlined"
            color="primary"
          ></Chip>
        ))}
      </div>
      <Autocomplete
        value={element}
        options={options}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => <TextField {...params} label="" />}
        onChange={(_, value) => {
          updateElements(value);
        }}
        onInputChange={(_, value) => {
          setElement(value);
        }}
        onKeyPress={(e) => {
          if (!element || e.key !== "Enter") return;
          updateElements(element);
          e.target.blur();
        }}
        disableClearable
      />
    </div>
  );
}
