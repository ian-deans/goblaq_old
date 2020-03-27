import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: "absolute",
            backgroundImage: "url('/images/backgrounds/header-img.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            // backgroundAttachment: "fixed",
            backgroundPosition: "0px -200px",
            width: "100%",
            left: "0",
            top: "0",
            height: "40vh",
            zIndex: 20,
            filter: "brightness(50%)",
        },
        overlay: {
            // position: "absolute",
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(255, 0, 0, 0.4);",
            top: "0",
            left: "0",
            zIndex: 21,
        },
    })
);

export const Banner: React.SFC = props => {
    const classes = useStyles(props);
    return (
        <div className={classes.root}>
            <div className={classes.overlay}>
                {/* {props.children} */}
            </div>
        </div>
    );
};
