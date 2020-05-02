/* About */
import React from "react";
import Head from "next/head";
import { Page } from "../src/components/common/Page";
import Typography from "@material-ui/core/Typography";
import { Grid, Container, Avatar, Box }  from '@material-ui/core';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TEAM, COMPANY_VALUES, VALUE_ITEMS, COMPANY_DESCRIPTION } from '../constants/about';
import Link from "next/link";


const About: React.SFC = (props: any) => {
    const classes = useStyles(props);
    return (
        <Page>
            <Head>
                <title>Goblaq - About Us</title>
            </Head>
            <Container
                maxWidth={false}
                className={`${classes.sectionContainer} ${classes.darkBackground}`}
            >
                <h1 className={classes.mainHeader}>
                    <span className={classes.discoverMore}>Discover more</span>
                    <br/>
                    <span className={classes.normal}>within the Black Community</span>
                </h1>
            </Container>
            <Container maxWidth={false} className={classes.sectionContainer}>
                <h2 className={classes.sectionHeader}>What we do for you</h2>
                <Grid container spacing={3}>
                    {VALUE_ITEMS.map((value, idx) => (
                        <Grid key={idx} item lg={4} xs={12}>
                            <img
                                style={{ height: 120 }}
                                src={value.img}
                            />
                            <h2 className={classes.valuesTitle}>{value.title}</h2>
                            <h4 className={classes.valuesSubtitle}>{value.subtitle}</h4>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Container
                maxWidth={false}
                className={`${classes.sectionContainer} ${classes.darkBackground}`}
            >
                <h2 className={classes.sectionHeader}>About Goblaq</h2>
                <Container maxWidth="lg">
                    {COMPANY_VALUES.map((value, idx) => (
                        <Typography
                            key={idx}
                            variant="body2"
                            className={classes.valuesText}
                        >
                            {value}
                        </Typography>
                    ))}
                </Container>
            </Container>
            <Container maxWidth={false} className={classes.sectionContainer}>
                <Container maxWidth="xl">
                    <Typography
                        variant="body2"
                        className={classes.valuesText}
                    >
                        {COMPANY_DESCRIPTION}
                    </Typography>
                </Container>
                <h2 className={classes.sectionHeader}>Our Staff</h2>
                <Container maxWidth="xl">
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
                                sm={12}
                                key={idx}
                                className={classes.teamItem}
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
            </Container>
            <Container
                maxWidth={false}
                className={`${classes.sectionContainer} ${classes.darkBackground} ${classes.minimalSection}`}
            >
                <Grid 
                    justify="space-between"
                    spacing={3}
                    container
                >
                   <Grid item lg={3} xs={3}>
                        <Link href="/contact">
                            <a className={classes.link}>
                                <img
                                    className={classes.contactIcon}
                                    src='../static/goblaq_contact.png'
                                />
                                <br />
                                <span>We love to hear from you</span>
                            </a>
                        </Link>
                   </Grid>

                   <Grid item lg={3} xs={3}>
                        <Link href="/contact">
                            <a className={classes.link}>
                                <img
                                    className={classes.contactIcon}
                                    src='../static/goblaq_support.png'
                                />
                                <br />
                                <span>Support</span>
                            </a>
                        </Link>
                   </Grid>
                </Grid>   
            </Container>
        </Page>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            fontFamily: "Graphik,Helvetica,Arial,sans-serif",
        },
        pageContainer: {
            width: "100% important",
            padding: 0,
            margin: 0,
        },
        avatar: {
            height: 150,
            width: 150,
            margin: "0 auto",
        },
        link: {
            fontSize: "1.2rem",
            color: "white",
            textDecoration: "none",
        },
        sectionHeader: {
            fontSize: "2.2rem",
            fontWeight: 600,
            marginTop: 10,
            marginBottom: 50,
        },
        sectionContainer: {
            flexDirection: "column",
            justifyContent: "center",
            padding: 70,
            border: "1px solid red",
            textAlign: "center",
        },
        darkBackground: {
            backgroundColor: "red",
            fontColor: "white",
            color: "white",
        },
        minimalSection: {
            alignItems: "center",
            paddingTop: 15,
            paddingBottom: 15,
            margin: 0,
        },
        mainHeader: {
            fontSize: "2.75rem",
        },
        discoverMore: {
            fontWeight: 700,
            fontSize: "3.5rem",
        },
        valuesText: {
            fontSize: "1.4rem",
            fontWeight: 500,
            margin: 20,
        },
        membersContainer: {
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
        },
        memberName: {
            fontSize: "1.25rem",
            color: "red",
            fontWeight: 600,
            padding: 0,
            margin: 0,
        },
        teamItem: {
            marginTop: 20,
            marginBottom: 40,
        },
        memberTitle: {
            fontSize: ".9rem",
            fontWeight: 300,
            textTransform: "uppercase",
            padding: 0,
            margin: 10,
            marginBottom: 0,
        },
        valuesTitle: {
            fontSize: "1.8rem",
            fontWeight: 600,
            padding: 0,
            margin: 0,
        },
        valuesSubtitle: {
            fontSize: "1.1rem",
            fontWeight: 400,
            padding: 0,
            margin: 0,
        },
        contactIcon: {
            height: 70,
            padding: 0,
            margin: 0,
        },
        normal: {
            fontWeight: 300,
        }
    })
);

export default About;
