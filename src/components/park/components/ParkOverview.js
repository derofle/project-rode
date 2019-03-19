import React from 'react'
import { AppConsumer } from '../../context/appContext';
import { Slider, Slide } from 'react-materialize';


const ParkOverview = () => {

  return (
       <AppConsumer>
                        { (context) => {
                            const slides = context.park.slides;
                            const slideArray = slides && slides.map(slide => {
                                return (
                                    <Slide
                                            key={slides.indexOf(slide)}
                                            src={slide.img}
                                            >
                                        </Slide>
                                )
                            })
                            return (
                                <div>
                                {slideArray ? (
                         
                                    <div>
                                <div className="card">
                                    <Slider indicators={false}>
                                    {slideArray}
                                </Slider>
                                </div>
                                        <div className="card">
                                        <div className="card-content white">
                                        {context.park.description}
                                        <blockquote><a href={context.park.descriptionSource} target="_blank" rel="noopener noreferrer">{context.park.descriptionSource}</a></blockquote>
                                        </div>
                                        </div>
                                        </div>
                                       
                          
                            ) : null }
                            </div>
                            )
                            
                            
     

    }}       
            </AppConsumer>
  )
}

export default ParkOverview
