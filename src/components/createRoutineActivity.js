import React, { useEffect, useState } from "react";
import { createRoutineActivity } from "../api";
import { TextField, Button, InputLabel } from "@mui/material";

const CreateRoutineActivity = ({
    activities,
    fetchActivities,
    token,
    routineId,
}) => {
    const [count, setCount] = useState("");
    const [duration, setDuration] = useState("");
    const [activitiesList, setActivitiesList] = useState([]);
    const [activity, setActivity] = useState("any");

    useEffect(() => {
        Promise.all([fetchActivities()])
        .then(([activities]) => {
            setActivitiesList(activities);
        })
        .catch(console.error);
    }, []);

    return (
        <form
            id="create-routine-activity"
            onSubmit={async (event) => {
                event.preventDefault();

                await createRoutineActivity({
                    token,
                    count,
                    duration,
                    routineId,
                    activityId : activity,
                });
                location.reload();
            }}>
                <div>
                <div className="routine-by-inner-div">
                    <label htmlFor="select-activity">
                        Activities{" "}
                        <span className="activity-count">({activities.length})</span>
                    </label>
                    
                    <select
                        name="activity"
                        id="select-activity"
                        value={activity}
                        onChange={(event) => setActivity(event.target.value)}
                    >
                    <option value="any">Any</option>
                    {activities.map((activity, idx) => {
                        return (
                            <option key={`${idx}:${activity.name}`} value={activity.id}>
                                {activity.name}
                            </option>
                        );
                    })}
                    </select>
                    
                    <TextField
                        type="number"
                        placeholder="Count*"
                        value={count}
                        onChange={(event) => setCount(event.target.value)}
                    />

                    <TextField
                        type="number"
                        placeholder="Duration*"
                        value={duration}
                        onChange={(event) => setDuration(event.target.value)}
                    />
                </div>
                </div>
                
                <Button
                    type="submit">Add Activity to Routine</Button>
        </form>
    );
};

export default CreateRoutineActivity;