import { React, useState } from "react";
import { useParams } from "react-router-dom";
import { updateRoutine, deleteRoutine } from "../api";
import { Paper, TextField, Button } from "@mui/material";

const EditRoutine = ({
    token,
    routinesByUser,
    fetchUserRoutines,
    navigate,
}) => {
    if (routinesByUser.length === 0) {
        console.log("Return NULL");
        return null;
    }
    const { routineId } = useParams();
    console.log("Testing Routine by user", routinesByUser);
    const currentRoutine = routinesByUser?.filter((routine) => {
        console.log(routine);
        return routine.id === parseInt(routineId);
    });
    if (currentRoutine.length === 0) {
        return "Routine not found by that ID";
    }
    const { name, goal, isPublic } = currentRoutine[0];
    const [newGoal, setNewGoal] = useState(goal);
    const [newName, setNewName] = useState(name);
    const [newisPublic, setisPublic] = useState(isPublic);
    console.log(newGoal);

    async function editRoutine() {
        const updatedRoutine = {
            name : newName,
            goal : newGoal,
            isPublic : newisPublic,
        };
        const response = await updateRoutine(token, updatedRoutine, routineId);
    }
    return (
        <form
            className="form"
            onSubmit={(event) => {
                event.preventDefault();
                editRoutine();
                fetchUserRoutines();
                navigate("/my_routines");
            }}>
                <div className="edit-routine-div">
                    <TextField
                        type="text"
                        value={newName}
                        onChange={(event) => setNewName(event.target.value)}
                    />

                    <TextField
                        type="text"
                        value={newGoal}
                        onChange={(event) => setNewGoal(event.target.value)}
                    />
                <span>Is Public?<br></br></span>
                    <input
                        type="checkbox"
                        onChange={(event) => setisPublic(event.target.value)}/>
                        <br></br>
                    
                    <Button type="submit">Edit Routine</Button>

                    <Button 
                        type="submit"
                        onClick={() => {
                            deleteRoutine(token, routineId);
                        }}>Delete</Button>
                </div>
            </form>
    );
};

export default EditRoutine;