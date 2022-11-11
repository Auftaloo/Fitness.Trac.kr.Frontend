import { React, useState } from "react";
import { Paper, TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { updateRoutineActivity, deleteRoutineActivity } from "../api";

const EditRoutineActivity = ({
    token,
    routinesByUser,
    fetchUserRoutines,
    navigate,
}) => {
    if (routinesByUser.length === 0) {
        console.log("Return NULL");
        return null;
    }

    const { routineActivityId, routineId } = useParams();

    const [currentRoutine] = routinesByUser?.filter((routine) => {
        return routine.id === parseInt(routineId);
    });
    if (currentRoutine.length === 0) {
        return "Routine activity not found by that ID";
    }

    const [currentActivity] = currentRoutine.activities.filter((activity) => {
        console.log(routineActivityId, activity.id);
        return activity.routineActivityId === parseInt(routineActivityId);
    });

    const { count, duration } = currentActivity;
    const [newCount, setNewCount] = useState(count);
    const [newDuration, setDuration] = useState(duration);

    async function EditRoutineActivity() {
        const updatedRoutineActivity = {
            count : newCount,
            duration : newDuration,
        };

        const response = await updateRoutineActivity(
            token,
            updatedRoutineActivity,
            routineActivityId
        );
    }
    return (
        <form
            className="form"
            onSubmit={(event) => {
                event.preventDefault();
                EditRoutineActivity();
                fetchUserRoutines();
                navigate("/my_routines");
            }}>
                <div className="edit-routine-activity">

                <TextField
                    type="number"
                    value={newCount}
                    onChange={(event) => setNewCount(event.target.value)}
                />

                <TextField
                    type="number"
                    value={newDuration}
                    onChange={(event) => setDuration(event.target.value)}
                />

                <Button type="submit">Edit Routine Activity</Button>

                <Button 
                    type="submit"
                    onClick={() => {
                        deleteRoutineActivity(token, routineActivityId);
                    }}>Delete</Button>
                </div>
            </form>
    );
};

export default EditRoutineActivity;