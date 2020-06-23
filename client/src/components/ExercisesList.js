import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0,10)}</td>
      <td>
        <Link to={`/edit/${props.exercise._id}`}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
      </td>
    </tr>
  )

export default class ExercisesList extends Component {

    state = {
        exercises: [],
        noData: false,
        results: []
    };

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then(res => {
                if (!res.data.length) {
                    this.setState({noData: true})
                } else {
                    this.setState({results: res.data})
                }
                // this.setState({
                //     exercises: res.data
                // });
            })
            .catch(err => {
                console.log(err);
            })
    }

    deleteExercise = id => {
        axios.delete(`http://localhost:5000/exercises/${id}`)
            .then(res => console.log(res.data));

        this.setState({
            exercises: this.state.exercises.filter(entry => entry._id !== id)
        })
    }

    exerciseList = () => {
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />
        })
    }

    render() {
        if (this.state.noData) {
            return (
            <p>No Data was returned!</p>
            )
          } else {
              return (
                  <p>Axios worked!</p>
              )
          }

        // return (
        //     <div>
        //         <h3>Logged Exercises</h3>
        //         <table className="table">
        //             <thead className="thead-light">
        //                 <tr>
        //                     <th>Username</th>
        //                     <th>Description</th>
        //                     <th>Duration</th>
        //                     <th>Date</th>
        //                     <th>Actions</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {this.exerciseList()}
        //             </tbody>
        //         </table>
        //     </div>
        // )
    }
}