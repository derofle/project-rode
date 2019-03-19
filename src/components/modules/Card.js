import React from 'react'
import { Link } from 'react-router-dom';

const Card = (props) => {
    const { item, type} = props;
  return (
    <div className="col s12 m4" >
                                                            <div className="card hoverable info-card" key={item.id}>
                                                            <div className="card-image">
                                                            <img src={item.img} alt={item.Id} className="card-image-tag"></img>
                                                            <Link to={'/'+ type + '/' + item.uid} className="btn-floating halfway-fab waves-effect waves-light white ">
                                                            <i className="material-icons" style={{ color: "black" }}>add</i>
                                                            </Link>
                                                                </div>
                                                                <div className="card-content">
                                                                    <span className="georgia">{item.name}</span>
                                                                </div>
                                                            </div>
                                                            </div>
  )
}

export default Card
