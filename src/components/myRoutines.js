import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import CreateRoutineActivity from "./createRoutineActivity";

const MyRoutines =({
    activities,
    routinesByUser,
    setSearchResults,
    fetchActivities,
    token,
}) => {
    return (
        <div className="main-div-routinesByUser">
            <Link 
                style={{ textDecoration : "none" }}
                to="/routines/create_routine">
                    <Button>Create a Routine</Button>
                </Link>

        <div className="routine-by-div">
            {routinesByUser?.map((userRoutine) => {
                const {
                    creatorName,
                    name,
                    goal,
                    id : routineId,
                    activities : routinesActivities,
                } = userRoutine;
                    return (
                        <div key={ routineId }>
                            <div className="routine-by-inner-div">
                                <p>
                                    <b>Created by: </b> { creatorName }
                                </p>
                                <p>
                                    <b>Workout routine: </b> { name }
                                </p>
                                <p>
                                    <b>Goal: </b> { goal }
                                </p>

                                <Link
                                    style={{ textDecoration: "none" }}
                                    to={`/routines/edit-routine/${routineId}`}>
                                    <Button>Edit</Button>
                                </Link>
                                <br></br>
                                <b>Choose Activities:</b>
                                <CreateRoutineActivity
                                    token={ token }
                                    activities={ activities }
                                    fetchActivities={ fetchActivities }
                                    setSearchResults={ setSearchResults }
                                    routineId={ routineId }
                                />

                                {routinesActivities.map((activity) => {
                                    const { routineActivity, description, duration, count, id, name } = activity;
                                    return (
                                        <div key={id}>
                                            <p>
                                                <b>Name: </b> { name }
                                            </p>
                                            <p>
                                                <b>Description: </b> { description }
                                            </p>
                                            <p>
                                                <b>Duration: </b> { duration }
                                            </p>
                                            <p>
                                                <b>Count: </b> { count }
                                            </p>

                                            <Link
                                                style={{ textDecoration : "none "}}
                                                to={`/routine_activities/${routineActivityId}/${routineId}`}>
                                                <Button>Edit</Button>
                                            </Link>
                                        </div>
                                        );
                                    })}
                                    </div>
                                </div>
                        );
                    })}
                </div>
        </div>
    );
};

export default MyRoutines;