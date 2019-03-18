import React from 'react'
import { AppConsumer } from './context/appContext';

import Card from "./modules/Card";

class AttractionList extends React.Component {
    state = {
        search: ""
    }

    componentDidMount() {
        this.context.loadData();
        this.context.watchAllAttractions();
    }

    filterAttractions = (attractions, param, criteria) => {
        this.context.filterData(attractions, "attractions", param, criteria);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.context.filterData("attractions", "attractions", "name", this.state.search);
    }

    render () {
        return (
            <AppConsumer>
                        { (context) => {              
                            if (!context.loading) {
                                const { attractions } = context;
                                return (
                                    <div className="container">
                                        <div className="row"></div>
                                            <div className="row">
                                                <div className="col s12 m3">
                                                    <div className="card">
                                                        <div className="card-content grey lighten-2 georgia bold-text grey-text text-darken-2"> 
                                                            <p className="park-name" style={{ fontSize: "1.5em" }}>Zoek Attracties</p>
                                                        </div>
                                                        <div className="card-content">
                                                            <div className="row">
                                                            <form onSubmit={this.handleSubmit}>
                                                            <div className="input-field col">
                                                            <input id="search" type="text" className="validate" onChange={this.handleChange}/>
                                                            <label htmlFor="search">Zoeken</label>
                                                            <button className="waves-effect waves-light btn"><i className="material-icons left">search</i>Zoeken</button>
                                                            </div>

                                                            
                                                            </form>

                                                          
                                                            </div>
                                                        </div>
                                                        




                                                        
                                                    </div>
                                                </div>
                                                <div className="col s12 m9">
                                                {attractions && attractions.map(attraction => {
                                                        return (
                                                           <Card item={attraction} type="attractie" key={attraction.id}/>
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

AttractionList.contextType = AppConsumer;
export default AttractionList
