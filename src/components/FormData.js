import React, { useContext } from "react";
import { FormContextProvider } from "../context/FormContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import EditIcon from '@mui/icons-material/Edit';

function FormData() {
  const { formData, deleteItem, handleEdit } = useContext(FormContextProvider);

  return (
    <div style={{display:"flex", justifyContent:"center"}}>
      <table id="table">
        <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>DOB</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        {formData.map((item, index) => {
          const formattedDob = dayjs(item.dob).format("ddd MMM DD YYYY");

          return (
            <tr key={index}>
              
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{formattedDob}</td>
              <td>
                <Button
                  variant="text"
                  onClick={() => {
                    deleteItem(index);
                  }}
                  startIcon={<DeleteIcon style={{ color: "red", fontSize: '28px' }} />}
                >
                </Button>
                <Button
                  variant="text"
                  onClick={() => {
                    handleEdit(index);
                  }}
                  startIcon={<EditIcon style={{ color: "green", fontSize: '28px' }} />}
                >
                </Button>
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
}

export default FormData;
