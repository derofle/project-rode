import React from 'react'
import { AppConsumer } from '../../context/appContext';
import { Slider, Slide } from 'react-materialize';

const AttractionOverview = () => {
  return (
       <AppConsumer>
                        { (context) => {
                            if (!context.loading) {
                                const slides = context.attraction.slides;
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
                                    <div className="card" style={{borderRadius: "6px 6px 6px 6px"}}>
                                    <Slider indicators={true}>
                                    {slideArray}
                                </Slider>
                                        <div className="card-content white" style={{borderRadius: "0px 0px 6px 6px"}} >
                                        {context.attraction.description}
                                        <blockquote><a href={context.attraction.descriptionSource} target="_blank" rel="noopener noreferrer">{context.attraction.descriptionSource}</a></blockquote>
                                        </div>
                                        </div>
                                        </div>
                                       
                          
                            ) : null }
                            </div>
                                
                               
                
                 
                    )
                            }
                            
                            
                            
     

    }}       
            </AppConsumer>
  )
}

export default AttractionOverview
