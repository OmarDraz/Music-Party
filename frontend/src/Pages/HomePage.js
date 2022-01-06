import React, {useEffect, useState} from 'react';
import CreateRoomPage from './CreateRoomPage';
import RoomJoinPage from './RoomJoinPage';
import Room from '../Components/Room';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import{ Grid, Button, ButtonGroup, Typography } from '@material-ui/core'

const HomePage = (props) => { 
    const [state, setState] = useState({
        roomCode: null
    });
    useEffect(async () =>{
        fetch('/api/user-in-room').then((response) => response.json()).then((data) => {
                setState({
                    roomCode: data.code
                });
            });
        }, []);
    function renderHomePage(){
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" component="h3">
                        House Part
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableEleveation variant="contained" color="primary">
                        <Button color="primary" to="/join" component={ Link }>
                            Join a Room
                        </Button>
                        <Button color="secondary" to="/create" component={ Link }>
                            Create a Room
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    };

    function clearRoomCode(){
        setState({
            roomCode: null
        });
    };

    return(
        <div>
            <Router>
                <Switch>
                    <Route exact path='/' render={() => {
                        return state.roomCode ? (<Redirect to={`/room/${state.roomCode}`} />) : renderHomePage();
                    }} />
                    <Route path='/join' component= {RoomJoinPage}/>
                    <Route path='/create' component= {CreateRoomPage}/>
                    <Route path='/room/:roomCode' render={
                        () => {
                            return <Room {...props} leaveRoomCallback={clearRoomCode}></Room>;
                        }
                    }/>
                </Switch>
            </Router>
        </div>
    )
}

export default HomePage;