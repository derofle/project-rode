import React from 'react'
import { AppConsumer } from '../context/appContext';
import { Link } from 'react-router-dom';

import AttractionOverview from './pages/AttractionOverview';
import AttractionInformation from './pages/AttractionInformation';
import AttractionStatistics from './pages/AttractionStatistics';
import AttractionNews from './pages/AttractionNews';
import AttractionReviews from './pages/AttractionReviews';



class Attraction extends React.Component {

    componentDidMount() {
        this.context.loadData();
        this.context.watchAttraction(this.props.match.params.Id)
    }

    render () {
        return (
            <AppConsumer>
                        { (context) => {              
                            if (!context.loading && context.attraction && context.park) {
                                const {attraction, park } = context;
                                return (
                                    <div className="container">
                                        <div className="row"></div>
                                            <div className="row">
                                                <div className="col s12 m3">
                                                    <div className="card">
                                                        <div className="card-image">
                                                            <img src={attraction.img} alt="park-logo"/>
                                                        </div>
                                                    </div>
                                                    <div className="card">
                                                        <div className="card-content grey lighten-2 georgia bold-text grey-text text-darken-2"> 
                                                            <p className="park-name" style={{ fontSize: "1.5em" }}>{attraction.name} </p>
                                                            <Link to={"/park/" + park.id} className="grey-text">{park.name}</Link>
                                                        </div>
                                                        <div className="collection no-border no-margin bold-text">
                                                            <Link to={"/attractie/" + this.props.match.params.Id} className="collection-item">Overzicht</Link>
                                                            <Link to={"/attractie/" + this.props.match.params.Id + "/informatie"} className="collection-item">Informatie</Link>
                                                            <Link to={"/attractie/" + this.props.match.params.Id + "/statistieken"} className="collection-item">Statistieken</Link>
                                                            <Link to={"/attractie/" + this.props.match.params.Id + "/niews"} className="collection-item">Nieuws</Link>
                                                            <Link to={"/attractie/" + this.props.match.params.Id + "/beoordelingen"} className="collection-item">Beoordelingen</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col s12 m9">
                                                    {this.props.match.path === "/attractie/:Id" && this.props.match.isExact === true ? <AttractionOverview /> : null}
                                                    {this.props.location.pathname.includes("/informatie") === true ? <AttractionInformation /> : null}
                                                    {this.props.location.pathname.includes("/statistieken") === true ? <AttractionStatistics /> : null}
                                                    {this.props.location.pathname.includes("/nieuws") === true ? <AttractionNews /> : null}
                                                    {this.props.location.pathname.includes("/beoordelingen") === true ? <AttractionReviews /> : null}
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

Attraction.contextType = AppConsumer;
export default Attraction
