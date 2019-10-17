import React, { Component } from 'react';
import { Mongoose } from 'mongoose';

class App extends Component{

    constructor(){
        super();
        this.state= {
            title: '',
            description: '',
            tasks:[],
            _id:'',
            button:'ENVIAR'
        };
        this.addTask = this.addTask.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
        this.fetchTasks();
    }


    addTask(e) {
        if(this.state._id){
            fetch('/api/tasks/' + this.state._id, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({html: 'Tarea Actualizada'});
                    this.setState({title: '', description: '', _id:'',button:'ENVIAR'});
                    this.fetchTasks();
                })
                .catch(err => console.log(err));

        }else{
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({html: 'Tarea Guardada'});
                    this.setState({title: '', description: ''});
                    this.fetchTasks();
                })
                .catch(err => console.log(err));
        }

        e.preventDefault();
    }

    fetchTasks() {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    tasks:data
                });
                console.log(this.state.tasks);

            })
            .catch(err => console.log(err));
          
    }

    deleteTask(id){
        if(confirm("Estas seguro de que quieres eliminar")){
            fetch('/api/tasks/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({html: 'Tarea Eliminada'});
                    this.fetchTasks();
                })
                .catch(err => console.log(err));
    
            e.preventDefault();
        }
    }

    editTask(id){ 
        fetch('/api/tasks/' + id)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    title: data.title,
                    description: data.description,
                    _id: data._id,
                    button: 'EDITAR'
                })
            })
            .catch(err => console.log(err));

        e.preventDefault();
    }

    handleChange(e){
        const {name,value} = e.target;
        this.setState({
            [name]: value
        })

    }

    render() {
        return(
            <div>
                {/* NAVIGATION */}
                <nav className="light-blue darken-4" >
                    <div className="container">
                        <a className="brand-logo" href="/">MERN STACK</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field cols12">
                                                <input name="title" onChange={this.handleChange} type="text" placeholder="Task Title" value={this.state.title}></input>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field cols12">
                                                <textarea  name="description" onChange={this.handleChange} className="materialize-textarea" placeholder="Description" value={this.state.description}>

                                                </textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-blue darken-4" >
                                            {this.state.button}
                                        </button>
                                    </form>

                                </div>

                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(tasks =>{
                                            return(
                                                <tr key={tasks._id}>
                                                    <td>{tasks.title}</td>
                                                    <td>{tasks.description}</td>
                                                    <td>
                                                         <button className="btn light-blue darken-4" onClick={() => this.editTask(tasks._id)}>
                                                            <i className="material-icons">edit</i>
                                                         </button>
                                                         <button className="btn light-blue darken-4" style={{margin: '4px'}} onClick={() => this.deleteTask(tasks._id)}>
                                                         <i className="material-icons">delete</i>
                                                         </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }  
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

export default App;
