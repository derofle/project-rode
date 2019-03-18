import React from 'react'
import { AppConsumer } from '../context/appContext';
import { Link } from 'react-router-dom';

import ParkOverview from './components/ParkOverview';
import ParkAttractions from './components/ParkAttractions';
import ParkShows from './components/ParkShows';



class ParkDashboard extends React.Component {
    state = {
        currentWindow: null
    }

    componentDidMount() {
        this.context.searchSingleData("parks", "id", this.props.match.params.Id);

        if (this.props.match.path === "/park/:Id" && this.props.match.isExact === true) {
            this.setState({
                currentWindow: <ParkOverview />
            })
        } else if (this.props.location.pathname.includes("/attracties") === true) {
            this.setState({
                currentWindow: <ParkAttractions />
            })
        }   else if (this.props.location.pathname.includes("/shows") === true) {
            this.setState({
                currentWindow: <ParkShows />
            })
        }
    }

    handleWindow = (button) => {
        if (button === "overview") {
            this.setState({
                currentWindow: <ParkOverview />
            })
        }

        if (button === "attractions") {
            this.setState({
                currentWindow: <ParkAttractions />
            })
        }

        if (button === "shows") {
            this.setState({
                currentWindow: <ParkShows />
            })
        }
    }


    render () {
        return (
            <AppConsumer>
                        { (context) => {
                            const park = context.parks;
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
                                                
                                            <p className="park-name">{park.name} </p>
                                            <p>{park.location}</p>
                                                
                                        </div>
                                        <div className="collection no-border no-margin bold-text">
                                        <Link to={"/park/" + this.props.match.params.Id} className="collection-item" onClick={() => this.handleWindow("overview")}>Overzicht</Link>
                                            <Link to={"/park/" + this.props.match.params.Id} className="collection-item">Informatie</Link>
                                            <Link to={"/park/" + this.props.match.params.Id + "/attracties"} className="collection-item" onClick={() => this.handleWindow("attractions")}>Attracties</Link>
                                            <Link to={"/park/" + this.props.match.params.Id + "/shows"} className="collection-item" onClick={() => this.handleWindow("shows")}>Shows</Link>
                                            <Link to={"/park/" + this.props.match.params.Id} className="collection-item">Horeca</Link>
                                            <Link to={"/park/" + this.props.match.params.Id} className="collection-item">Nieuws</Link>
                                            <Link to={"/park/" + this.props.match.params.Id} className="collection-item">Beoordelingen</Link>
                                        </div>
                                        
                                        
                                        </div>
                                        </div>
                                    
                                    <div className="col s12 m9">
                                            {this.state.currentWindow}
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

ParkDashboard.contextType = AppConsumer;
export default ParkDashboard
