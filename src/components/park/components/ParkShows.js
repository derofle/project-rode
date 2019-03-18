import React from 'react'
import { AppConsumer } from '../../context/appContext';
import { Link } from 'react-router-dom';

class ParkShows extends React.Component {

    render() {
        return (
            <AppConsumer>
            { (context) => {
                const shows = context.shows;
                console.log(shows);
                return (
                    <div className="row">
                {shows && shows.map(show => {
                    return (
                        <div className="col s12 m3" key={show.id}>
                        <div className="card hoverabl" key={show.id}>
                        <div className="card-image">
                        <img src={show.img} alt={show.Id}></img>
                        <Link to={'/attractions/' + show.id} className="btn-floating halfway-fab waves-effect waves-light white ">
                        <i className="material-icons" style={{ color: "black" }}>add</i>
                        </Link>
                            </div>
                            <div className="card-content">
                                <span>{show.name}</span>
                            </div>
                        </div>
                        </div>
                    )
                })}
                </div>
                
                ) 
            }}
            </AppConsumer>
          )
    }
  
}

ParkShows.contextType = AppConsumer;
export default ParkShows;
