import React from 'react'
import { AppConsumer } from '../context/appContext';
import { Link } from 'react-router-dom';

import ParkOverview from './components/ParkOverview';
import ParkAttractions from './components/ParkAttractions';
import ParkShows from './components/ParkShows';



class Park extends React.Component {

    componentDidMount() {
        this.context.watchPark(this.props.match.params.Id);
    }


    render () {
        return (
            <AppConsumer>
                        { (context) => {
                            const park = context.park;
                            if (park) {
                                return (
                                    <div className="container">
                                    <div className="row"></div>
                                    <div className="row">
                                        <div className="col s12 m3">
                                        <div className="card">
                                        <div className="card-image">
                                        <img src={"/img/park/" + this.props.match.params.Id + ".jpg"} alt="park-logo"/>
                                        </div>
                                        </div>
                                        <div className="card">
                                        <div className="card-content grey lighten-2 georgia bold-text grey-text text-darken-2">
                                                
                                            <p className="park-name" style={{ fontSize: "1.5em" }}>{park.name} </p>
                                            <p>{park.location}</p>
                                                
                                        </div>
                                        <div className="collection no-border no-margin bold-text">
                                        <Link to={"/park/" + this.props.match.params.Id} className="collection-item" >Overzicht</Link>
                                            <Link to={"/park/" + this.props.match.params.Id + "/informatie"} className="collection-item">Informatie</Link>
                                            <Link to={"/park/" + this.props.match.params.Id + "/attracties"} className="collection-item">Attracties</Link>
                                            <Link to={"/park/" + this.props.match.params.Id + "/shows"} className="collection-item">Shows</Link>
                                            <Link to={"/park/" + this.props.match.params.Id + "/horeca"} className="collection-item">Horeca</Link>
                                            <Link to={"/park/" + this.props.match.params.Id + "/nieuws"} className="collection-item">Nieuws</Link>
                                            <Link to={"/park/" + this.props.match.params.Id + "/beoordelingen"} className="collection-item">Beoordelingen</Link>
                                        </div>
                                        
                                        
                                        </div>
                                        </div>
                                    
                                    <div className="col s12 m9">
                                            {this.props.match.path === "/park/:Id" && this.props.match.isExact === true ? <ParkOverview /> : null}
                                            {this.props.location.pathname.includes("/attracties") === true ? <ParkAttractions /> : null}
                                            {this.props.location.pathname.includes("/shows") === true ? <ParkShows /> : null}
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

Park.contextType = AppConsumer;
export default Park
