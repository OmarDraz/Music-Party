import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

const RoomJoinPage = () => {
    let hist = useHistory();
    const [state, setState] = useState({
       roomCode: "",
       error: "" 
    });
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Join a Room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <TextField error={state.error}
                 label="Code"
                 placeholder="Enter a Room Code" 
                 value={state.roomCode} 
                 helperText={state.error} 
                 variant="outlined"
                 onChange={(e) => {
                    setState({
                        roomCode: e.target.value
                    })
                 }} /> 
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={()=>{
                    const requestOptions = {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            code: state.roomCode
                        })
                    };
                    fetch('/api/join-room', requestOptions).then((response) => {
                        if (response.ok){
                            hist.push(`/room/${state.roomCode}`);
                        } else{
                            setState({
                                error: "Room Not Found."
                            });
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                }}>
                    Enter Room
                </Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button variant="contained" color="secondary" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    )
}

export default RoomJoinPage;