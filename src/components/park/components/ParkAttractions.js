import React from 'react'
import { AppConsumer } from '../../context/appContext';
import { Link } from 'react-router-dom';

class ParkAttractions extends React.Component {

    componentDidMount() {
        this.context.searchData("attractions", "park_id", this.context.parks.id);
    }

    render() {
        return (
            <AppConsumer>
            { (context) => {
            
                const attractions = context.attractions;
                const coasters = attractions.filter(attraction => attraction.category === "roller-coaster");
                const thrills = attractions.filter(attraction => attraction.category === "thrill-ride");
                const waterrides = attractions.filter(attraction => attraction.category === "water-ride");
                const gentle = attractions.filter(attraction => attraction.category === "gentle-ride");
                return (
                    <div>
                    {coasters.length > 0 ? (
                        <div className="row">
                            <div className="col s12">
                            <div className="card">
                                
                                
                            <div className="card-content">
                            
                                <span className="card-title georgia bold-text grey-text text-darken-2">Achtbanen</span>
                                
                               
                                <div className="row">
                            {coasters && coasters.map(attraction => {
                    return (
                        <div className="col s12 m3" key={attraction.id}>
                        <div className="card hoverable" key={attraction.id}>
                        <div className="card-image">
                        <img src={attraction.img} alt={attraction.Id}></img>
                        <Link to={'/attractions/' + attraction.id} className="btn-floating halfway-fab waves-effect waves-light white ">
                        <i className="material-icons" style={{ color: "black" }}>add</i>
                        </Link>
                            </div>
                            <div className="card-content">
                                <span className="georgia">{attraction.name}</span>
                            </div>
                        </div>
                        
                        </div>
                    )
                })}
                            </div>
                            </div>
                        </div>
                        </div></div>
                    ): null}
                    {thrills.length > 0 ? (
                        <div className="row">
                            <div className="col s12">
                            <div className="card">
                                
                                
                            <div className="card-content">
                            
                                <span className="card-title georgia bold-text grey-text text-darken-2">Spannende Attracties</span>
                                
                               
                                <div className="row">
                            {thrills && thrills.map(attraction => {
                    return (
                        <div className="col s12 m3" key={attraction.id}>
                        <div className="card hoverable" key={attraction.id}>
                        <div className="card-image">
                        <img src={attraction.img} alt={attraction.Id}></img>
                        <Link to={'/attractions/' + attraction.id} className="btn-floating halfway-fab waves-effect waves-light white ">
                        <i className="material-icons" style={{ color: "black" }}>add</i>
                        </Link>
                            </div>
                            <div className="card-content">
                                <span className="georgia">{attraction.name}</span>
                            </div>
                        </div>
                        
                        </div>
                    )
                })}
                            </div>
                            </div>
                        </div>
                        </div></div>
                    ): null}
                    {waterrides.length > 0 ? (
                        <div className="row">
                            <div className="col s12">
                            <div className="card">
                                
                                
                            <div className="card-content">
                            
                                <span className="card-title georgia bold-text grey-text text-darken-2">Water Attracties</span>
                                
                               
                                <div className="row">
                            {waterrides && waterrides.map(attraction => {
                    return (
                        <div className="col s12 m3" key={attraction.id}>
                        <div className="card hoverable" key={attraction.id}>
                        <div className="card-image">
                        <img src={attraction.img} alt={attraction.Id}></img>
                        <Link to={'/attractions/' + attraction.id} className="btn-floating halfway-fab waves-effect waves-light white ">
                        <i className="material-icons" style={{ color: "black" }}>add</i>
                        </Link>
                            </div>
                            <div className="card-content">
                                <span className="georgia">{attraction.name}</span>
                            </div>
                        </div>
                        
                        </div>
                    )
                })}
                            </div>
                            </div>
                        </div>
                        </div></div>
                    ): null}
                    {gentle.length > 0 ? (
                        <div className="row">
                            <div className="col s12">
                            <div className="card">
                                
                                
                                
                                <div className="card-content">
                                <span className="card-title georgia bold-text grey-text text-darken-2">Familie Attracties</span>
                                <div className="row">
                            {gentle && gentle.map(attraction => {
                    return (
                        <div className="col s12 m3" key={attraction.id}>
                        <div className="card hoverable" key={attraction.id}>
                        <div className="card-image">
                        <img src={attraction.img} alt={attraction.Id}></img>
                        <Link to={'/attractions/' + attraction.id} className="btn-floating halfway-fab waves-effect waves-light white ">
                        <i className="material-icons" style={{ color: "black" }}>add</i>
                        </Link>
                            </div>
                            <div className="card-content">
                                <span className="georgia">{attraction.name}</span>
                            </div>
                        </div>
                        
                        </div>
                    )
                })}
                            </div>
                            </div>
                        </div>
                        </div></div>
                    ): null}
                </div>
                ) 
            }}
            </AppConsumer>
          )
    }
  
}

ParkAttractions.contextType = AppConsumer;
export default ParkAttractions
