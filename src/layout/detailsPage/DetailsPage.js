import React from "react";
import { Button, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import ModalComp from "../../component/modal/ModalComp";
import patientsSlice from "../../utils/patientsSlice";
import { useDispatch } from "react-redux";

const DetailsPage = () => {
  const location = useLocation();
  const { userData } = location.state;
  const { removeFromList } = patientsSlice.actions;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="mx-auto container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Age</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr key={userData.patient_id}>
            <td>{userData.patient_id}</td>
            <td>{`${userData.first_name} ${userData.last_name}`}</td>
            <td>{userData.email}</td>
            <td>{userData.gender}</td>
            <td>{userData.age}</td>
            <td>
              <Button variant="danger">
                <ModalComp
                  modaltitle={"Delete User"}
                  modalBody={`Are you sure you want to delete ${userData.patient_id}?`}
                  btnText={"Delete"}
                  onConfirm={() => {
                    dispatch(removeFromList(userData.patient_id));
                    navigate("/");
                  }}
                />
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default DetailsPage;
