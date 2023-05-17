import React from "react";
import { Form, Stack } from "react-bootstrap";

const ListFiltersBar = ({
  searchFunc = () => {},
  searchDefaultValue = "",
  formSelectArr = [],
}) => {
  return (
    <Stack direction="horizontal" className="mt-5 mb-2" gap={4}>
      <Form.Control
        type="text"
        placeholder="Please enter patient's name, ID or email"
        className="w-50"
        onChange={searchFunc}
        defaultValue={searchDefaultValue}
      />
      {formSelectArr?.map((searchFilter) => (
        <Form.Group>
          <Form.Select
            onChange={searchFilter.onValueChange}
            defaultValue={searchFilter.defaultValue}
          >
            <option disabled>{searchFilter.disabledValue}</option>
            {searchFilter.options.map((searchOption) => (
              <option value={searchOption.value}>{searchOption.label}</option>
            ))}
          </Form.Select>
        </Form.Group>
      ))}
    </Stack>
  );
};

export default ListFiltersBar;
