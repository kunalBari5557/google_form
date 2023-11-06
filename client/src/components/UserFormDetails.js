import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDynamicData } from "../redux/features/userFormDetails";

import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Typography } from "@mui/material";

function UserFormDetails() {
  const dispatch = useDispatch();

  const formDetails = useSelector((state) => state.userFormDetails?.data);
  console.log(formDetails?.forms);

  useEffect(() => {
    dispatch(fetchDynamicData());
  }, [dispatch]);

  return (
    <div style={{ marginTop: "5rem" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Sr. No</strong>
            </TableCell>
            <TableCell>
              <strong>Question</strong>
            </TableCell>
            <TableCell>
              <strong>Answer By User</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formDetails?.forms.map((item, index) => (
            <TableRow key={item._id}>
              <TableCell>
                <Typography>{index + 1}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{item?.response[0]?.question}</Typography>
              </TableCell>
              <TableCell>
                {item?.response[0]?.options.map((option, optionIndex) => (
                  <Typography key={optionIndex}>
                    <a>{option}</a>
                  </Typography>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default UserFormDetails;
