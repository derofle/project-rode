import React from 'react'
import { AppConsumer } from '../context/appContext';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Collection, CollectionItem} from 'react-materialize';

import ParkSlideshow from './ParkSlideshow';

import ParkAttractions from './ParkAttractions';


class ParkDashboard extends React.Component {

    componentDidMount() {
        this.context.searchData("InformationData", "id", this.props.match.params.Id);
        this.context.watchCollectionData("InformationData", "attractions", this.props.match.params.Id);
        
    }


    render () {
        return (
            <AppConsumer>
                        { (context) => {
                            const park = context.information[0];
                            if (context.information.length > 0) {
                                return (
                                    <div className="container">
                                    <div className="row">
                                        <div className="col s12 m3">
                                        <div className="card grey darken-2">
                                        <div className="card-image">
                                        <img src={"/img/park/" + this.props.match.params.Id + ".jpg"} alt="park-logo"/>
                                        <div className="card-content grey darken-3 white-text">
                                                
                                            <p>{park.name} </p>
                                            <p>{park.place}</p>
                                                
                                        </div>
                                        
                                        <Collection className="no-border no-margin">
                                            <CollectionItem className="no-background-color"><Link to={"/park/" + this.props.match.params.Id} className="orange-text">Overzicht</Link></CollectionItem>
                                            <CollectionItem href='#' className="no-background-color orange-text">Informatie</CollectionItem>
                                            <CollectionItem className="no-background-color"><Link to={"/park/" + this.props.match.params.Id + "/attracties"} className="orange-text">Attracties</Link></CollectionItem>
                                            <CollectionItem href='#' className="no-background-color orange-text">Shows</CollectionItem>
                                            <CollectionItem href='#' className="no-background-color orange-text">Horeca</CollectionItem>
                                            <CollectionItem href='#' className="no-background-color orange-text">Nieuws</CollectionItem>
                                            <CollectionItem href='#' className="no-background-color orange-text">Beoordelingen</CollectionItem>
                                        </Collection>
                                       
                                        
                                        </div>
                                        </div>
                                    </div>
                                    <div className="col s12 m9">
                                        <div className="card">                                      
                                            <BrowserRouter>
                                            <Switch>
                                            <Route exact path="/park/de-efteling" component={ParkSlideshow} />
                                            <Route exact path="/park/de-efteling/attracties" component={ParkAttractions} />
                                            </Switch>
                                            </BrowserRouter>
                                        </div>
                                        <div className="card">
                                        <div className="card-content grey darken-2 white-text">
                                        De Efteling is een Wereld vol Wonderen. In 1952 ontstaan als klein Brabants initiatief van een burgemeester en een pastoor is het park nu uitgegroeid tot het derde attractiepark van Europa.
                                        </div>
                                        </div>
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
