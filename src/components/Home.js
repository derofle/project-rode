import React from 'react'
import { AppConsumer } from './context/appContext';


class Home extends React.Component {


    render() {
        return (
            <AppConsumer>
                { (context) => (
                    <div>
                        
                       
                        
                    </div>
                )}
            </AppConsumer>
          )
    }
  
}

Home.contextType = AppConsumer;

export default Home
