import React from 'react'
import { AppConsumer } from '../../context/appContext';
import { Slider, Slide} from 'react-materialize';

const ParkOverview = () => {
  return (
       <AppConsumer>
                        { (context) => {
                            const slides = context.parks.slides;
                            return (
                                <div>
                                <div className="card">
                                    <Slider indicators={false}>
                                {slides && slides.map(slide => {
                                    return (
                                        <Slide
                                            key={slides.indexOf(slide)}
                                            src={slide.img}
                                            title={slide.tag}
                                            placement="right"
                                            >
                                        </Slide>
                                    )
                                })}
                                </Slider>
                                </div>
                                        <div className="card">
                                        <div className="card-content white">
                                        {context.parks.description}
                                        <blockquote><a href={context.parks.descriptionSource} target="_blank" rel="noopener noreferrer">{context.parks.descriptionSource}</a></blockquote>
                                        </div>
                                        </div>
                                        </div>
                          
                            )
     

    }}       
            </AppConsumer>
  )
}

export default ParkOverview
