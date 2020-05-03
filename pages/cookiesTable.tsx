import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 600,
  },
});

function createData(purpose, explanation) {
  return { purpose, explanation };
}

const rows = [
  createData(
    'Processes',
    'Intended to make the Service work in the way you expect. For example, we use a Cookie that tells us whether you have already signed up for an account.'
  ),
  createData(
    'Authentication, Security, and Compliance',
    'Intended to prevent fraud, protect your data from unauthorized parties, and comply with legal requirements. For example, we use Cookies to determine if you are logged in.'
  ),
  createData(
    'Preferences',
    'Intended to remember information about how you prefer the Service to behave and look. For example, we use a Cookie that tells us whether you have declined to allow us to send push notifications to your phone.'
  ),
  createData(
    'Notifications',
    'Intended to allow or prevent notices of information or options that we think could improve your use of the Service. For example, we use a Cookie that stops us from showing you the signup notification if you have already seen it.'
  ),
  createData(
    'Advertising',
    'Intended to make advertising more relevant to users and more valuable to advertisers. For example, we may use Cookies to serve you interest-based ads, such as ads that are displayed to you based on your visits to other websites, or to tell us if you have recently clicked on an ad.'
  ),
  createData(
    'Analytics',
    'Intended to help us understand how visitors use the Service. For example, we use a Cookie that tells us how our search suggestions correlate to your interactions with the search page.'
  ),
];

export default function DenseTable() {
  const classes = useStyles(makeStyles);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>Purpose</TableCell>
            <TableCell>Explanation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.purpose}>
              <TableCell component='th' scope='row'>
                {row.purpose}
              </TableCell>
              <TableCell>{row.explanation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
