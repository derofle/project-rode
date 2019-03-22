/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { AppConsumer } from './context/appContext';
import './animation.css';

class Home extends React.Component {
  seeContext = () => {
    console.log(this.context);
  };

  render() {
    if (!this.context.loading) {
      return (
        <div className="container">
          <div className="links">
            <button
              className="btn"
              type="button"
              onClick={() => {
                document.getElementById('test-div').className =
                  'test-div right-anim';
              }}
            >
              Move To the Right
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => {
                function getOffset(el) {
                  const rect = el.getBoundingClientRect();
                  return {
                    left: rect.left + window.scrollX,
                    top: rect.top + window.scrollY,
                  };
                }
                console.log(getOffset(document.getElementById('test-div')));
              }}
            >
              Move To the Left
            </button>
          </div>
          <div className="cart">
            <div className="test-div" id="test-div" />
          </div>
        </div>
      );
    }
    return null;
  }
}

Home.contextType = AppConsumer;

export default props => (
  <AppConsumer>{context => <Home {...props} context={context} />}</AppConsumer>
);
