import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
    Navbar,
    Activities,
    Home,
    Login,
    MyRoutines,
    Register,
    Routines,
    CreateRoutine,
    CreateActivity,
    EditRoutine,
    EditRoutineActivity,
    CreateRoutineActivity
} from "./components";
import { getRoutines, getActivities, getUserDetails, getUserRoutines, getUsersRoutines } from "./api";

const App = () => {
    const [searchResults, setSearchResults] = useState({ info : {}, records : []});
    const [routines, setRoutines] = useState([]);
    const [activities, setActivities] = useState([]);
    const [routinesByUser, setUserRoutines] = useState([]);
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});

    async function getMe() {
        const storedToken = window.localStorage.getItem('token');
        if (!token) {
            if (storedToken) {
                setToken(storedToken);
            }
            return;
        }

        const results = await getUserDetails(token);
        if (results.username) {
            setUser(results);
            console.log("Users logged in", results)
        } else {
            console.log("User not logged in.")
            console.log("Cannot get user details");
        }
    }

    const navigate = useNavigate();
    function logout() {
        window.localStorage.removeItem("token");
        setToken("");
        setUser({});
    }

    async function fetchUserRoutines() {
        const results = await getUsersRoutines(user.username);
        setUserRoutines(results)
        console.log('New state', results);
    }

    async function fetchActivities() {
        const results = await getActivities();
        setActivities(results);
    }

    async function fetchRoutines() {
        const results = await getRoutines();
        setRoutines(results);
    }

    useEffect(() => {
        fetchActivities()
    }, [])

    useEffect(() => {
        fetchRoutines()
    }, [token, routines])

    useEffect(() => {
        if('username' in user) {
            fetchUserRoutines()
        }
    }, [user])

    useEffect(() => {
        getMe();
    }, [token])

    return (
        <div className="main-div">
            <Navbar logout={logout} token={token} />
            <Routes>
                <Route 
                    path="/" 
                    element={<Home /> } />
                <Route 
                    path="/login" 
                    element={<Login 
                        setToken={setToken} 
                        navigate={navigate} /> } />
                <Route
                    path="/register"
                    element={<Register
                        setToken={setToken} 
                        token={token} 
                        navigate={navigate} /> } />
                <Route
                    path="/activities"
                    element={<Activities
                        activities={activities}
                        token={token}
                        navigate={navigate} /> } />
                <Route
                    path="/activities/create_activity"
                    element={<CreateActivity 
                        token={token} 
                        navigate={navigate} 
                        fetchActivities={fetchActivities} /> } />
                <Route
                    path="/routines"
                    element={<Routines
                        routines={routines}
                        token={token}
                        fetchActivities={fetchActivities} /> } />
                <Route
                    path="/routines/create_routine"
                    element={<CreateRoutine
                        token={token}
                        fetchRoutines={fetchRoutines}
                        navigate={navigate} /> } />
                <Route
                    path="/routines/edit-routine/:routineId"
                    element={<EditRoutine 
                        routinesByUser={routinesByUser}
                        token={token}
                        fetchUserRoutines={fetchUserRoutines}
                        navigate={navigate} /> } />

                <Route
                    path="/my_routines"
                    element={<MyRoutines
                        token={token}
                        activities={activities}
                        fetchActivities={fetchActivities}
                        setSearchResults={setSearchResults}
                        routinesByUser={routinesByUser}
                        fetchUserRoutines={fetchUserRoutines}
                        user={user} /> } />
                <Route
                    path="/activities"
                    element={<Activities
                        activities={activities}
                        token={token}
                        navigate={navigate} /> } />
                <Route
                    path="/routines/:routineId?activities"
                    element={<CreateRoutineActivity
                        activities={activities}
                        fetchActivities={fetchActivities}
                        setSearchResults={setSearchResults} /> } />
                <Route
                    path="/routine_activities/:routineActivityId/:routineId"
                    element={<EditRoutineActivity
                        token={token}
                        fetchUserRoutines={fetchUserRoutines}
                        routinesByUser={routinesByUser}
                        navigate={navigate} /> } />
            </Routes>
        </div>
    );
};

export default App;