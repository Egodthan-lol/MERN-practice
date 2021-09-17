import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { useAuth0 } from "@auth0/auth0-react";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateExercise() {
  const { user } = useAuth0();
  const { email } = user;
  const [value, setValue] = useState({
    description: '',
    duration: '',
    date: new Date(),
    email: email,
  });

  // useEffect(() => {
  //   axios.get('http://localhost:5000/users/')
  //   .then(response => {
  //     if (response.data.length > 0){
  //       console.log('useeffect ran')
  //       // console.log(`response.data ${response.data}`)
  //       setValue({
  //         ...value,
  //         users: response.data.map(user => user.username),
  //         username: response.data[0].username
  //       });
  //     }
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
    axios.post('http://localhost:5000/exercises/add', value)
    .then(res => console.log(res.data))
    .catch((error) => console.log(error));
    window.location = '/exercises';
  }
  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        {/* <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={value.username}
            onChange={onChangeUsername}>
            {
              value.users.map(function (user) {
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
            placeholder='fill in your description'
            value={value.description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            placeholder="fill in your duration for the exercise"
            value={value.duration}
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
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}
