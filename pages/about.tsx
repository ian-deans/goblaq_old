/* About */
import React from "react";
import Head from "next/head";
import { Page } from "../src/components/common/Page";
import Typography from "@material-ui/core/Typography";
import { Grid, Container, Avatar, Box }  from '@material-ui/core';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TEAM, COMPANY_VALUES, VALUE_ITEMS } from './constants/about';
import Link from "next/link";


const About: React.SFC = (props: any) => {
    const classes = useStyles(props);
    return (
        <Page>
            <Head>
                <title>Goblaq - About Us</title>
            </Head>
            <Container maxWidth={false} className={classes.topBanner}>
                <h1 className={classes.centered}>
                    <strong>Discover more</strong>
                    <br/>
                    <span className={classes.normal}>within the Black Community</span>
                </h1>
            </Container>
            <Container maxWidth={false} className={classes.valueBanner}>
                <h2 className={classes.centered}>What we do for you</h2>
                <Grid container spacing={3}>
                    {VALUE_ITEMS.map((value, idx) => (
                        <Grid key={idx} item xs={4} className={classes.valuesContainer}>
                            <img
                                style={{ height: 120 }}
                                src={value.img}
                            />
                            <h4>{value.title}</h4>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Container maxWidth={false}>
                {COMPANY_VALUES.map((value, idx) => (
                    <Typography key={idx} variant="body2">
                        {value}
                    </Typography>
                ))}
            </Container>
            <Container maxWidth={false} className={classes.teamBanner}>
                <h4>
                    Our company reflects respect, diversity, hard work, humility, and a unified drive for our
                    mission. We're upfront about who we are and what we offer our clients, and we encourage a
                    sense of community across our teams to provide the best possible solutions.
                </h4>
                <h2>Our Staff</h2>
                <Grid
                    container
                    spacing={3}
                    justify="center"
                    alignItems="center"
                >
                    {TEAM.map((member, idx) => (
                        <Grid
                            item
                            lg={4}
                            sm={4}
                            key={idx}
                        >
                            <Box className={classes.membersContainer}>
                                <Avatar
                                    src={member.img}
                                    alt={member.name}
                                    className={classes.avatar}
                                />
                                <h4 className={classes.memberTitle}>{member.title}</h4>
                                <h4 className={classes.memberName}>{member.name}</h4>  
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Container maxWidth={false} className={classes.supportBanner}>
                <Grid 
                    justify="space-between"
                    spacing={3}
                    container
                >
                   <Grid item lg={3} xs={3}>
                        <img
                            style={{ height: 120 }}
                            src='../static/goblaq_contact.png'
                        />
                        <h4>We love to hear from you</h4>
                   </Grid>
                   <Grid item lg={3} xs={3}>
                        <img
                            style={{ height: 120 }}
                            src='../static/goblaq_support.png'
                        />
                        <h4>Support</h4>
                   </Grid>
                </Grid>   
            </Container>
        </Page>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        h4: {
            fontSize: "1rem",
            fontWeight: 400,
            fontFamily: "Graphik,Helvetica,Arial,sans-serif",
        },
        icon: {
            height: 140,
        },
        avatar: {
            height: 120,
            width: 120,
        },
        valuesContainer: {
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
        },
        membersContainer: {
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
        },
        memberName: {
            fontSize: "1rem",
            color: "red",
            fontWeight: 600,
            fontFamily: "Graphik,Helvetica,Arial,sans-serif",
            padding: 0,
            margin: "5 0",
            border: '1px solid red',
        },
        memberTitle: {
            fontSize: "1rem",
            fontWeight: 300,
            fontFamily: "Graphik,Helvetica,Arial,sans-serif",
            padding: 0,
            margin: "5 0",
            border: '1px solid red',
        },
        valueBanner: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        teamBanner: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        topBanner: {
            backgroundColor: "transparent",
            height: 300,
        },
        supportBanner: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "red",
            width: "100%",
        },
        centered: {
            textAlign: "center",
        },
        normal: {
            fontWeight: 300,
        }
    })
);

export default About;
