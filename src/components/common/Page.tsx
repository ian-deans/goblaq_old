import React from 'react';
import Link from 'next/link';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageContainer: {
      width: '100%',
      overflowX: 'visible',
      display: 'flex',
      flexDirection: 'column',
      padding: 0,
      margin: 0,
      textAlign: 'justify',
      backgroundColor: '#EEEEEE',
      // alignItems: "center",
      // justifyContent: "center",
      // zIndex: 100,
      // display: "flex",
      // flexDirection: "column",
      // zIndex: 100,
      // width: "100%",
      [theme.breakpoints.down('sm')]: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
  })
);

export const Page: React.SFC = (props) => {
  const classes = useStyles(props);
  return (
    <Container className={classes.pageContainer} maxWidth={false}>
      {props.children}
    </Container>
  );
};
