import React, { useState, useMemo } from "react";
import { Form, Stack, Table } from "react-bootstrap";
import "./Style.scss";
import patientsMockData from "../../assets/mock_data.json";
import { useDebounce } from "use-debounce";
import { isValidEmail } from "../../utils";

const ListPage = () => {
  const [searchValue, setSearchValue] = useState(null);
  const [value] = useDebounce(searchValue, 500);
  const [sex, setSex] = useState(1);
  const [age, setAge] = useState(1);
  const [sorting, setSorting] = useState(1);

  const patientsDataFilter = useMemo(() => {
    if (sex === "2" || sex === "3") {
      let patientSex = sex === "2" ? "Male" : "Female";
      switch (age) {
        case "2":
          return patientsMockData.filter(
            (e) => e.gender === patientSex && e.age < 31
          );
        case "3":
          return patientsMockData.filter(
            (e) => e.gender === patientSex && e.age < 45
          );
        case "4":
          return patientsMockData.filter(
            (e) => e.gender === patientSex && e.age > 45
          );

        default:
          return patientsMockData.filter((e) => e.gender === patientSex);
      }
    } else
      switch (age) {
        case "2":
          return patientsMockData.filter((e) => e.age < 31);
        case "3":
          return patientsMockData.filter((e) => e.age > 30 && e.age < 45);
        case "4":
          return patientsMockData.filter((e) => e.age > 45);

        default:
          return patientsMockData;
      }
  }, [sex, age]);

  const patientsDataSearch = useMemo(() => {
    if (value && !isNaN(+value)) {
      return patientsDataFilter.filter((e) => e.patient_id === +value);
    } else if (isValidEmail(value)) {
      return patientsDataFilter.filter((e) => e.email === value);
    } else if (typeof value === "string") {
      return patientsDataFilter.filter(
        (e) =>
          e.first_name.toLowerCase().includes(value.toLowerCase()) ||
          e.last_name.toLowerCase().includes(value.toLowerCase())
      );
    } else return patientsDataFilter;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, age, sex]);

  const searchFunc = async (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="mx-auto container">
      <Stack direction="horizontal" className="mt-5 mb-2" gap={4}>
        <Form.Control
          type="text"
          placeholder="Please enter patient's name, ID or email"
          className="w-50"
          onChange={searchFunc}
        />
        <Form.Group>
          <Form.Select
            onChange={(e) => {
              setSex(e.target.value);
            }}
          >
            <option disabled>Sex</option>
            <option value="1">All</option>
            <option value="2">Male</option>
            <option value="3">Female</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Select
            onChange={(e) => {
              setAge(e.target.value);
            }}
          >
            <option disabled>Age</option>
            <option value="1">All</option>
            <option value="2">18 - 30</option>
            <option value="3">31 - 45</option>
            <option value="4"> &gt; 45</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Select
            onChange={(e) => {
              setSorting(Number(e.target.value));
            }}
          >
            <option disabled>Sorting</option>
            <option value="1">Ascending </option>
            <option value="-1"> Descending </option>
          </Form.Select>
        </Form.Group>
      </Stack>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
          </tr>
        </thead>
        <tbody>
          {patientsDataSearch.length ? (
            [...patientsDataSearch]
              .sort((a, b) =>
                a.first_name > b.first_name ? sorting : -sorting
              )
              .map((e) => (
                <tr key={e.patient_id}>
                  <td>{e.patient_id}</td>
                  <td>{`${e.first_name} ${e.last_name}`}</td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={"2"}>There is no users with this search criteria</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ListPage;
