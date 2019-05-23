import React, { Component } from 'react';
import axios from 'axios';


class Topping extends Component {
    state = {
        topping: [],
        add_toppings:[],
        id:'',
        name:'',
        sandwich_name:'',
        array_topping:[]
    } 
    fetchData = () =>{
        axios.get(`/v1/topping`)
        .then(responseData => {
            this.setState({
            topping: responseData.data
            });
        })
        .catch(error => console.error(error));
    }
    add_topping(id, e){
        let list = this.state.add_toppings;
        list.push(e.target.value)
        this.setState({
            add_topping:list,
            array_topping: this.state.array_topping.concat({"_id":id})
        })
    }
    
    componentDidMount() {
        this.fetchData();
    }
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit = event => {
        event.preventDefault();
        axios.post(`/v1/sandwich`,{
             name: this.state.sandwich_name,
             toppings: this.state.array_topping,
             breadType:'oat'
         })
         .then(function (response) {
             console.log(response);
         })
         .catch(function (error) {
             console.log(error);
        });
        this.props.history.push('/sandwich');
    }
    render(){

        const topping_list =  this.state.topping
            .map(function(list){
                return  <tr key={list._id}>
                            <td>{list.name}</td>
                            <td>
                            <i className="material-icons add-button">
                            <button  value={list.name}id={list._id} onClick={ this.add_topping.bind(this, list._id)}>add</button>
                            </i>
                            </td>
                        </tr>
                         
        },this)
        const names = this.state.add_toppings
        return(
            <div className="App">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>    
                            <th>Add Your Topping</th>          
                        </tr>
                    </thead>
                    <tbody>
                        {topping_list}
                    </tbody>
                </table>  
                
                <div className="container">
                    <div className="wrapper-adding-sandwich">
                        {
                            (names.length > 0)&& 
                                <h3>Your Topping is:</h3>
                        }
                        <ul className="choosing-topping">
                            {names.map(function(name, index){
                                return <li key={ index }>{name}</li>;
                            })}
                        </ul>
                        <form onSubmit={this.handleSubmit}>
                            <input className="form-control" type="text" name="sandwich_name"
                                    onChange={this.handleChange} value={this.state.sandwich_name}/>
                            <button type="submit" className="btn btn-primary save-sandwich">Save</button>
                        </form>
                    </div>   
                </div>
                  
            </div>
        );
    }
}
export default Topping;
