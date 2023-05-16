import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Stack, Table } from "react-bootstrap";
import patientsMockData from "../../assets/mock_data.json";
import { useDebounce } from "use-debounce";
import { isValidEmail } from "../../utils";
import { Link } from "react-router-dom";
import patientsSearchSlice from "../../utils/patientsSearch";

const ListPage = () => {
  const { patientsListIds } = useSelector((state) => state.patientsList);
  const { patientInfo, sex, age, sorting } = useSelector(
    (state) => state.patientsSearch
  );
  const [value] = useDebounce(patientInfo, 500);

  const patientsData = patientsMockData.filter((e) =>
    patientsListIds.includes(e.patient_id)
  );
  const dispatch = useDispatch();
  const { setPatientInfo, setAge, setSex, setSorting } =
    patientsSearchSlice.actions;

  const patientsDataFilter = useMemo(() => {
    let genderCheck = sex === "Male" || sex === "Female";
    // if (sex === "Male" || sex === "Female") {
    // write switch case with short hand
    switch (age) {
      case "2":
        return patientsData.filter((e) =>
          genderCheck ? e.gender === sex && e.age < 31 : e.age < 31
        );
      case "3":
        return patientsData.filter((e) =>
          genderCheck
            ? e.gender === sex && e.age > 30 && e.age < 45
            : e.age > 30 && e.age < 45
        );
      case "4":
        return patientsData.filter((e) =>
          genderCheck ? e.gender === sex && e.age > 45 : e.age > 45
        );

      default:
        return genderCheck
          ? patientsData.filter((e) => e.gender === sex)
          : patientsData;
    }
    // } else
    //   switch (age) {
    //     case "2":
    //       return patientsData.filter((e) => e.age < 31);
    //     case "3":
    //       return patientsData.filter((e) => e.age > 30 && e.age < 45);
    //     case "4":
    //       return patientsData.filter((e) => e.age > 45);

    //     default:
    //       return patientsData;
    //   }
  }, [sex, age, patientsData]);

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
    dispatch(setPatientInfo(e.target.value));
  };

  return (
    <div className="mx-auto container">
      <Stack direction="horizontal" className="mt-5 mb-2" gap={4}>
        <Form.Control
          type="text"
          placeholder="Please enter patient's name, ID or email"
          className="w-50"
          onChange={searchFunc}
          defaultValue={patientInfo}
        />
        <Form.Group>
          <Form.Select
            onChange={(e) => {
              dispatch(setSex(e.target.value));
            }}
            defaultValue={sex}
          >
            <option disabled>Sex</option>
            <option value="1">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Select
            onChange={(e) => {
              dispatch(setAge(e.target.value));
            }}
            defaultValue={age}
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
              dispatch(setSorting(Number(e.target.value)));
            }}
            defaultValue={sorting}
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
                  <td>
                    <Link
                      to="/details"
                      state={{
                        userData: e,
                      }}
                    >
                      {e.patient_id}
                    </Link>
                  </td>
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
