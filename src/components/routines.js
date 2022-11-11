import React, { useState } from "react";
import { Button } from "@mui/material";

const Routines = ({ routines }) => {
    return (
        <form>
            <div className="main-div-routines">
                {routines.map((routine) => {
                    const { creatorName, name, goal, id, activities, creatorId } = routine;
                    const [ display, setDisplay] = useState("none")
                    return (
                        <div key={routine.id}>
                            <div className="routines-inner-div">
                                <p>
                                    <b>Created by: </b> {routine.creatorName}
                                </p>
                                <p>
                                    <b>Workout routine: </b> {routine.name}
                                </p>
                                <p>
                                    <b>Goal: </b> {routine.goal}
                                </p>

                                <Button
                                    onClick={(event) => {
                                        event.preventDefault()
                                        if(display === "none"){
                                            setDisplay('block')
                                        } else {
                                            setDisplay('none')
                                        }
                                    }}>Show Activities</Button>
                            </div>
                            <div className="activity-box" style={{ display : display }}>
                                {activities.map((activity) => {
                                    const { description, duration, count, id } = activity;
                                    return (
                                        <div key={activity.id}>
                                            <p>
                                                <b>Description: </b> { activity.description }
                                            </p>
                                            <p>
                                                <b>Duration: </b> { activity.duration }
                                            </p>
                                            <p>
                                                <b>Count: </b> { activity.count }
                                            </p>
                                            </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </form>
    );
};

export default Routines;