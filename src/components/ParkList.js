import React from 'react'
import { AppConsumer } from './context/appContext';
import { Link } from 'react-router-dom';
import Card from "./modules/Card";

class ParkList extends React.Component {

    state = {
        search: ""
    }

    componentDidMount() {
        this.context.loadData();
        this.context.watchAllParks();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.context.filterData("parks", "parks", "name", this.state.search);
    }

    render () {
        return (
            <AppConsumer>
                        { (context) => {              
                            if (!context.loading) {
                                const { parks } = context;
                                return (
                                    <div className="container">
                                        <div className="row"></div>
                                            <div className="row">
                                                <div className="col s12 m3">
                                                    <div className="card">
                                                        <div className="card-content grey lighten-2 georgia bold-text grey-text text-darken-2"> 
                                                            <p className="park-name" style={{ fontSize: "1.5em" }}>Zoek Parken </p>
                                                        </div>
                                                    
                                                    <div className="card-content">
                                                            <div className="row">
                                                            <form onSubmit={this.handleSubmit}>
                                                            <div className="input-field col">
                                                            <input id="search" type="text" className="validate" onChange={this.handleChange}/>
                                                            <label htmlFor="search">Zoek park...</label>
                                                            <button className="waves-effect waves-light btn"><i className="material-icons left">search</i>Zoeken</button>
                                                            </div>

                                                            
                                                            </form>

                                                          
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col s12 m9">
                                                {parks && parks.map(park => {
                                                        return (
                                                            <Card item={park} type="attractie" key={park.id}/>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                    </div>  
                                )
                            }
                            return null;
                        }}
            </AppConsumer>
          )
    } 
}

ParkList.contextType = AppConsumer;
export default ParkList
