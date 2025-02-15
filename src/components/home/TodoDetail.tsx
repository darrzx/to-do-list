import React from 'react';
import { Todo } from '@/models/Todo';
import styles from '@/styles/Home.module.css';
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
    minWidth: 650,
  },
});

interface TodoDetailProps {
  key: number;
  todo: Todo;
}

const TodoDetail: React.FC<TodoDetailProps> = ({ key, todo }) => {  
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="detail table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '20%' }}>Title</TableCell>
            <TableCell style={{ width: '30%' }}>Description</TableCell>
            <TableCell style={{ width: '10%' }}>Deadline</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={key}>
            <TableCell>{todo.title}</TableCell>
            <TableCell>{todo.content}</TableCell>
            <TableCell>{new Date(todo.deadline).toLocaleDateString('en-GB')}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TodoDetail;
