import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API } from '../../api';
import { useEffect, useState } from 'react';
import { useAuthContext } from "@asgardeo/auth-react";
import { ActualVisit } from "../../types/domain"


export default function ScheduleList() {
    const [visits, setVisits] = useState<ActualVisit[] | undefined>(undefined);
    const { getAccessToken } = useAuthContext();
    const navigate = useNavigate();


    async function getVisits() {
        const accessToken = await getAccessToken();
        console.log(accessToken);
        let url: string = '/actualVisits';
        API.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((response) => {
                console.log(response);
                setVisits(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        if (visits === undefined) {
            getVisits();
        }
    }, [visits]);

    const handleRowClick = (id: string) => {
        navigate(`/visit/actual/${id}`);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h4" component="div" gutterBottom>
                Visitors at the Gate
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>In Time</TableCell>
                            <TableCell>Out Time</TableCell>
                            <TableCell>Visitor Name</TableCell>
                            <TableCell>Visitor NIC</TableCell>
                            <TableCell>Visitor Phone No</TableCell>
                            <TableCell>Vehicle Number</TableCell>
                            <TableCell>Visit Date</TableCell>
                            <TableCell>Is Approved</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visits &&
                            visits.map((row: any) => (
                                <TableRow key={row.visitId} onClick={() => handleRowClick(row.visitId)}>
                                    <TableCell>{row.inTime}</TableCell>
                                    <TableCell>{row.outTime}</TableCell>
                                    <TableCell>{row.visitorName}</TableCell>
                                    <TableCell>{row.visitorNIC}</TableCell>
                                    <TableCell>{row.visitorPhoneNo}</TableCell>
                                    <TableCell>{row.vehicleNumber}</TableCell>
                                    <TableCell>{row.visitDate}</TableCell>
                                    <TableCell>{row.isApproved ? "Yes" : "No"}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}