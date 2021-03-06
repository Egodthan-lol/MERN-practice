import React, { useState, useEffect} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useAuth0  } from '@auth0/auth0-react';

export default function CreateExercise() {
  const { user } = useAuth0();
  const { email } = user;
  // const [users, setUsers] = useState([]);
  const [value, setValue] = useState({
    description: '',
    duration: 0,
    date: new Date(),
  });
  const pathname = window.location.pathname.split('/');
  const editId = pathname[2];
  useEffect(() => {
    axios.get('http://localhost:5000/exercises/'+ editId)
    .then(response => {
      if (response.data){
        setValue({
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })
      }
      }
    )
    .catch((error => {
      console.log(error);
    }))}, [editId])
    

  //   axios.get('http://localhost:5000/users/')
  //   .then(response => {
  //     setUsers(response.data.map(user => user.username))
  //   })
  //   .catch((error => {
  //     console.log(error);
  //   }))
  // }, [])
  
  // const onChangeUsername = (e) => {
  //   setValue({
  //     ...value,
  //     username: e.target.value
  //   })
  // }

  const onChangeDescription = (e) => {
    setValue({
      ...value,
      description: e.target.value
    })
  }

  const onChangeDuration = (e) => {
    setValue(value => ({
      ...value,
      duration: e.target.value
    }))
  }

  const onChangeDate = (date) => {
    setValue(v => ({
      ...value,
      date: date
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const updateItem = {
      description: value.description,
      duration: value.duration,
      date: value.date,
      email: email
    }
    axios.post('http://localhost:5000/exercises/update/' + editId, updateItem)
    .then(res => console.log(res.data))

    window.location = '/exercises';
  }

  console.log("value", value)
  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        {/* <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={value.username}
            onChange={onChangeUsername}>
            {
              users.map(function (user) {
                return <option
                  key={user}
                  value={user}>{user}
                </option>;
              })
            }
          </select>
        </div> */}
        <div className="form-group">
          <label>Description: </label>
          <input type="text"
            required
            className="form-control"
            value={value.description}
            placeholder='fill in your description'
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={value.duration}
            placeholder="fill in your duration for the exercise"
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={value.date}
              onChange={onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}