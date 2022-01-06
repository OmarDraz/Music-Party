import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from "react-router-dom";
import{ Grid, Button, ButtonGroup, Typography } from '@material-ui/core';
import CreateRoomPage from '../Pages/CreateRoomPage';

const Room = (props) => {
    useEffect(async() => {
        function getRoomDetails(){
            fetch("/api/get-room" + "?code=" + roomCode).then((response) =>{ 
                if(!response.ok){
                    props.leaveRoomCallback();
                    hist.push("/");
                }
                return response.json() 
            }).then((data) => {
            console.log(data);
            setState({
                votes_to_skip: data.votes_to_skip,
                guest_can_pause: data.guest_can_pause,
                is_host: data.is_host
            })
        });
        }
        getRoomDetails();
    }, [])
    let hist = useHistory();
    const [settings, setSettings] = useState(false)
    const [state, setState] = useState({
        votes_to_skip: 3,
        guest_can_pause: false,
        is_host: false,
    });
    let {roomCode} = useParams();
    
    function leaveButton(){
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        };
        fetch('/api/leave-room', requestOptions).then((_res) => {
            hist.push("/");
        });
    };
    // getRoomDetails();

    function updateShowSettings(value){
        setSettings(value);
    };

    function renderSettings(){
        return (<Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <CreateRoomPage update={true} votesToSkip={state.votes_to_skip} guestCanPause={state.guest_can_pause} roomCode={roomCode} updateCallBack={null}></CreateRoomPage>
            </Grid>
            <Grid item xs={12} align="center">
            <Button variant="contained" color="secondary" onClick={() => updateShowSettings(false)}>
                    Close
                </Button>
            </Grid>
        </Grid>);
    };

    function renderSettingsButton(){
        return(
            <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={() => updateShowSettings(true)}>
                    Settings
                </Button>
            </Grid>
        );
    }
    if(settings){
        return renderSettings();
    }
    return (
        <Grid container spacing={1}>
            <Grid items xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Code: {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Votes: {state.votes_to_skip}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Guest Can Pause: {state.guest_can_pause.toString()}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Host: {state.is_host.toString()}
                </Typography>
            </Grid>
            {state.is_host ? renderSettingsButton() : null}
            <Grid item xs={12} align="center">
                <Button variant="contained" color="secondary" onClick={leaveButton}>
                    Leave Group
                </Button>
            </Grid>
        </Grid>
    );
};

export default Room;