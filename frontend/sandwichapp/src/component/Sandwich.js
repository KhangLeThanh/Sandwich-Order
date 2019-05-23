import React, { Component } from 'react';
import   {Link}  from 'react-router-dom';
import axios from 'axios';

class Sandwich extends Component {

    state = {
        sandwich: [],
        order_id:'',
        order_status:''
    }  
    orderSandwich(id, e){
        axios.post('/v1/order', {
          sandwichId: id,
          status: 'received'
        })
        .then(response => {
            this.setState({
                order_id: response.data._id
            })
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    fetchData = () =>{
        axios.get(`/v1/sandwich`)
        .then(responseData => {
            this.setState({
            sandwich: responseData.data
            });
        })
        .catch(error => console.error(error));
    }
    fetchOrderStatus = () =>{
        axios.get(`/v1/order/${this.state.order_id}`)
        .then(responseData => {
            this.setState({
                order_status: responseData.data.status
            });
        })
        .catch(error => console.error(error));
    }
    componentDidMount() {
        this.fetchData();
    }
    timeout = 0;
    componentDidUpdate(prevProps, prevState){
        if(this.state.order_id !== prevState.order_id){  
            this.fetchOrderStatus();
            this.timeout = setInterval(this.fetchOrderStatus, 5000);
        }   
    }
    componentWillUpdate() {
        if(this.state.order_status === 'ready'){
            clearInterval(this.timeout);
        }
    }
    toggleClass(e) {
        const classes = 'my-class material-icons';
        const els = document.getElementsByClassName('my-class material-icons active');
        if (els) {
          while (els[0]) {
            els[0].classList.remove('active');
          }
        }
        e.target.className = classes.replace('my-class material-icons', 'my-class material-icons active');
    }
    render(){
        const sandwich_list =  this.state.sandwich
            .map(function(list){
                return  <tr key={list._id}>
                            <td>{list.name}
                            <i className="material-icons my-class" onClick={e => this.toggleClass(e)}>
                                keyboard_arrow_down
                            </i>
                            
                                <table className="table-topping">
                                    <tbody>
                                        <tr className="topping-list">
                                        {list.toppings.map((item, key) =>
                                            <td key={item._id}>{item.name}</td>
                                        )}
                                        </tr>
                                    </tbody>
                                </table>     
                            </td>
                            <td><button className="btn btn-primary" id={list._id} onClick={ this.orderSandwich.bind(this, list._id)} >Order</button></td>
                        </tr>
                         
        },this)
        
        return(
            <div className="App">
                {
                    (this.state.order_status === 'received' || this.state.order_status === 'inQueue' ||this.state.order_status === 'ready')&& 
                    <div className="container">
                        <div className="order-section">
                            <h2>Your Order Status is: </h2>
                            <h3>{this.state.order_status}</h3>
                        </div>
                    </div>
                }
                   
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>    
                            <th>OrderNow</th>          
                        </tr>
                    </thead>
                    <tbody>
                        {sandwich_list}
                        <tr>
                            <td>Create a custom sandwich</td>
                        <td>
                            <Link to='/topping'>
                                <button className="btn btn-primary">Create Now</button>
                            </Link>    
                        </td>
                        </tr>
                    </tbody>
                </table>  
            </div>
        );
    }
}
export default Sandwich;
