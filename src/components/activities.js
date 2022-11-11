import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Activities = ({ activities, token }) => {
    return (
        <form>
            {token ? (
                <>
                <Link
                    style={{ textDecoration : "none" }}
                    to="/activities/create_activity">
                        <Button> Create Activity </Button>
                </Link>
                </>
            ) : null }
            <div id="outer-div-element" className="activities-main-div">
                {activities.map((activity) => {
                    const { description, name, id } = activity;
                    return (
                        <div key={ activity.id }>
                            <div className="activities-inner-div">
                                <p>
                                    <b>Activities: </b>
                                    { activity.name }
                                </p>
                                <p>
                                    <b>Description: </b>
                                    { activity.description }
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </form>
    );
};

export default Activities;