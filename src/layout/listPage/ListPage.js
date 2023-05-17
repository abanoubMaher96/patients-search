import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import patientsMockData from "../../assets/mock_data.json";
import { useDebounce } from "use-debounce";
import { isValidEmail } from "../../utils";
import { Link } from "react-router-dom";
import patientsSearchSlice from "../../utils/redux/patientsSearchSlice";
import ListFiltersBar from "../../component/listFiltersBar/ListFiltersBar";

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

  const filtersArr = [
    {
      defaultValue: sex,
      onValueChange: (e) => {
        dispatch(setSex(e.target.value));
      },
      disabledValue: "Sex",
      options: [
        { value: "1", label: "All" },
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
      ],
    },
    {
      defaultValue: age,
      onValueChange: (e) => {
        dispatch(setAge(e.target.value));
      },
      disabledValue: "Age",
      options: [
        { value: "1", label: "All" },
        { value: "2", label: "18 - 30" },
        { value: "3", label: "31 - 45" },
        { value: "4", label: "> 45" },
      ],
    },
    {
      defaultValue: sorting,
      onValueChange: (e) => {
        dispatch(setSorting(e.target.value));
      },
      disabledValue: "Sorting",
      options: [
        { value: "1", label: "Ascending" },
        { value: "-1", label: "Descending" },
      ],
    },
  ];

  return (
    <div className="mx-auto container">
      <ListFiltersBar
        searchFunc={searchFunc}
        searchDefaultValue={patientInfo}
        formSelectArr={filtersArr}
      />

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
                  <td>
                    <Link
                      to="/details"
                      state={{
                        userData: e,
                      }}
                    >
                      {`${e.first_name} ${e.last_name}`}
                    </Link>
                  </td>
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
