import React from 'react'
import { AppConsumer } from './context/appContext';


class TestScreen extends React.Component {

    componentDidMount() {
        this.context.watchData("InformationData");
        //this.context.watchCollectionData("InformationData", "attractions", "de-efteling");
        this.context.watchCollectionData("InformationData", "attractions", "de-efteling");
        //this.context.setData("personData", {firstname: "Henk", lastname: "Hendriksen"})
        //this.context.deleteData("personData", "3dY7xr8AeWyANIZ7lQ6a");
        //this.context.searchData("personData", "firstname", "Klaas")
        //this.context.watchPersonDataRealtime();
    }

    render() {
        return (
            <AppConsumer>
                { (context) => (
                    <div>
                        
                        {context.information.length > 0 ? <p>{context.information[0].name} </p> : null}
                        
                    </div>
                )}
            </AppConsumer>
          )
    }
  
}

TestScreen.contextType = AppConsumer;

export default TestScreen
