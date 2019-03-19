import React from 'react'
import { AppConsumer } from '../context/appContext';
import { Link } from 'react-router-dom';
import { MediaBox } from "react-materialize";



class Attraction extends React.Component {

    componentDidMount() {
        this.context.loadData();
        this.context.watchManufacturer(this.props.match.params.Id)
    }

    render () {
        return (
            <AppConsumer>
                        { (context) => {              
                            if (!context.loading && context.manufacturer && context.attractions) {
                                const { manufacturer } = context;
                                return (
                                    <div className="container">
                                        <div className="row" style={{marginBottom: "6px"}}></div>
                                            <div className="row">
                                                <div className="col s12 m3">
                                                    <div className="card" style={{borderRadius: "6px"}}>
                                                        <div className="card-image" style={{borderRadius: "8px"}}>
                                                            <i class="material-icons" style={{ position: "absolute", zIndex: "10", right: "3%", top : "5%", color: "white"}}>favorite_border</i>
                                                            <MediaBox src={manufacturer.logo_img} alt="park-logo" className="materialboxed" style={{borderRadius: "6px 6px 0px 0px", padding: "16px 16px 0px 16px"}} />
                                                        </div>
                                                    
                                                        <div className="card-content" style={{ padding: "16px 16px 12px 16px", borderRadius: "8px 8px 8px 8px"}}>
                                                            <p className="park-name bold-text" style={{ fontSize: "1.5em", lineHeight: "100%", paddingTop: "4px", paddingBottom: "4px", color: "#222f40" }}>{manufacturer.name.toUpperCase()} </p>
                                                                                                     
                                                        </div>

                                                        <div className="card-content" style={{borderTop: "2px solid #f3f5f8", padding: "0px 16px 0px 16px"}}>
                                                        </div>
                                                        <div className="collection no-border no-margin bold-text" >
                                                            <Link to={"/fabrikant/" + this.props.match.params.Id} className="collection-item" style={{borderBottom: "2px solid #f3f5f8", padding: "12px 16px 12px 16px"}}>Overzicht</Link>
                                                            <Link to={"/fabrikant/" + this.props.match.params.Id + "/informatie"} className="collection-item" style={{borderBottom: "2px solid #f3f5f8", padding: "12px 16px 12px 16px"}}>Informatie</Link>
                                                            <Link to={"/fabrikant/" + this.props.match.params.Id + "/typen"} className="collection-item" style={{borderBottom: "2px solid #f3f5f8", padding: "12px 16px 12px 16px"}}>Typen</Link>
                                                            <Link to={"/fabrikant/" + this.props.match.params.Id + "/attracties"} className="collection-item" style={{borderBottom: "2px solid #f3f5f8", padding: "12px 16px 12px 16px"}}>Attracties</Link>
                                                            <Link to={"/fabrikant/" + this.props.match.params.Id + "/beoordelingen"} className="collection-item" style={{borderBottom: "2px solid #f3f5f8", padding: "12px 16px 12px 16px"}}>Beoordelingen</Link>
                                                        </div>
                                                        <div className="card-content" style={{borderRadius: "0px 0px 6px 6px", backgroundColor: "#f8f9fa"}}>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col s12 m9">
                                                    {this.props.match.path === "/fabrikant/:Id" && this.props.match.isExact === true ? null : null}
                                                    {this.props.location.pathname.includes("/informatie") === true ? null : null}
                                                    {this.props.location.pathname.includes("/statistieken") === true ? null : null}
                                                    {this.props.location.pathname.includes("/nieuws") === true ? null : null}
                                                    {this.props.location.pathname.includes("/beoordelingen") === true ? null: null}
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
