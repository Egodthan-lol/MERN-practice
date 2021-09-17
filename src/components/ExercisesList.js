import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
export default function ExercisesList(){
  const { user } = useAuth0();
  const { email } = user;
  const [list, setList] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/exercises')
      .then(response => {
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])
  const Exercise = (props) => (
    <tr>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0,10)}</td>
      <td>
      <Button variant='info' size='sm'><Link style={{textDecoration: 'none', color:'black'}} to={"/edit/"+props.exercise._id}>edit
      </Link></Button> | <Button variant='info' size='sm' onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</Button>
      </td>
    </tr>
  )


  const deleteExercise = (id) => {
    axios.delete('http://localhost:5000/exercises/' + id)
    .then(res => console.log(res.data))
    .catch((error) => console.log(error));
    setList(list.filter(el => el._id !== id));
  }

  const ExercisesList = () => {
    const filteredList = list.filter(exe => exe.email === email)
    return filteredList.map(currentexercise => {
      console.log(currentexercise)
      return <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key = {currentexercise._id}/>
    })
  }
  return (
    <div>
      <h3>Exercises to do</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            {/* <th>Username</th> */}
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ExercisesList()}
        </tbody>
      </table>
    </div>
  )
}