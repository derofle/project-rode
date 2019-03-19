import React from 'react'
import { AppConsumer } from './context/appContext';


class Home extends React.Component {

    seeContext = () => {
        console.log(this.context);
    }


    render() {
        if (!this.context.loading) {
            return (
                <div>
                   <button onClick={this.seeContext}>Klik</button> 
                </div>
      )
        } else {
            return (
                <div></div>
            )
        }
        
    }
  
}

Home.contextType = AppConsumer;

export default props => (<AppConsumer>{(context) => {
    return <Home {...props} context={context} />
}}
</AppConsumer>) 
