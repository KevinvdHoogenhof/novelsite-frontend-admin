import * as React from 'react';
import { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "../styles.css";
import useToken from './useToken';
import { Button } from '@mui/material';

function setRole(token,id,roleid){
    let fetchUrl = 'https://localhost:9001/Account/SetRole?token='+token+'&userid='+id+"&roleid="+roleid;
  
    console.log(fetchUrl);
    fetch(fetchUrl,{
        method: 'POST',
        credentials: 'include',
        headers:{   
            'accept': 'text/plain'
        }
    })
    window.location.reload(true);
    //.then(data=>data.json());
    //console.log(data);
  
    //return 
}

var name = 'name';
const Accounts= () => {
    const { token, setToken } = useToken();
    const [info, setAccountInfo] = useState();
    const [tableData, setTableData] = useState([])  

    useEffect(() => {
        fetch(("https://localhost:9001/account"),{
            })
            .then((data) => data.json())
            .then((data) => setTableData(data))
    }, [])
    console.log(tableData)
    
    useEffect(() => {
        fetch('https://localhost:9001/account/info?token='+token)
            .then((response) => response.json())
            .then(response=>setAccountInfo(response))
    }, []);
    console.log(info)

  return (
        <>
        <div className='text-center'>
            <h4>Welcome {(info !== undefined) ? info.name : name}</h4>
        </div>
      <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                      <TableRow>
                          <TableCell align="left">Name</TableCell>
                          <TableCell align="left">Email</TableCell>
                          <TableCell align="left">Role</TableCell>
                          <TableCell align="left">ChangeRole</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {tableData.map((column) => (
                          <TableRow
                              key={column.id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                              <TableCell align="left">{column.name}</TableCell>
                              <TableCell align="left">{column.email}</TableCell>
                              <TableCell align="left">{column.role.name}</TableCell>
                              {(column.role.name === 'Standard') ?
                                  <Button type="submit" align="left" onClick={() => {setRole(token,column.id,2)}}>Change to Admin</Button>
                                  : <Button type="submit" align="left" onClick={() => { setRole(token,column.id,1)}}>Change to Standard role</Button>}
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </TableContainer>
          </>
  )
}

export default Accounts