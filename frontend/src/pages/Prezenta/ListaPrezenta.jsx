import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useParams } from "react-router";
import { useState } from "react";
import axios from 'axios';
import { useAuth } from "../../provider/authProvider";
import { useEffect } from "react";
const columns = [
  { id: "numeStudent", label: "Nume Student", minWidth: 170 },
  { id: "legitimatieStudent", label: "Legitimatie", minWidth: 100 },
];

function createData(student) {
  const nume = student.nume;
  const legitimatie = student.legitimatie;
  return { numeStudent: nume, legitimatieStudent: legitimatie };
}


const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function ListaPrezenta(props) {
  const { idActivitate } = useParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [materieActivitate, setMaterieActivitate] = useState('');
  const [tipActivitate, setTipActivitate] = useState('');
  const [dataActivitate, setDataActivitate] = useState(new Date());
  const {token} = useAuth();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const getActivitateDetails = async() => {
    await axios.get(
      `http://localhost:8080/api/activitate/${idActivitate}`,
      config
    ).then(res => {
      //console.log(res.data);
      setMaterieActivitate(res.data.materie);
      setTipActivitate(res.data.tipActivitate);
      setDataActivitate(res.data.data);
      //console.log(materieActivitate, tipActivitate, dataActivitate);
    }).catch((err) => {
      console.log(err.message);
    });
  }
  const getPrezentaActivitate = async () => {
    await axios.get(
      `http://localhost:8080/api/prezentaActivitate/stud/${idActivitate}`,
      config
    ).then(res => {
      //console.log(res.data);
      let dataRows = [];
      res.data.forEach(student => {
        //console.log(student);
        dataRows.push(createData(student));
      });
      setRows(dataRows);
    }).catch((err) => {
      console.log(err.message);
    });  
  }

  useEffect(() => {
    getPrezentaActivitate();
    getActivitateDetails();
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("-");
  }


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* Footer */}
      <main>
      <h1>Prezenta {tipActivitate} {materieActivitate} (Data: {formatDate(new Date(dataActivitate))} | Ora: {new Date(dataActivitate).toLocaleTimeString()})</h1>
      <Paper sx={{ width: "100%", overflow: "hidden"}}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      </main>
    </ThemeProvider>
  );
}
