import React from 'react'
import { AppConsumer } from '../context/appContext';
import { Slider, Slide} from 'react-materialize';

const ParkSlideshow = () => {
  return (
       <AppConsumer>
                        { (context) => {
                            const slides = context.information[0].slides;
                            return (
                                
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
                          
                            )
     

    }}       
            </AppConsumer>
  )
}

export default ParkSlideshow
