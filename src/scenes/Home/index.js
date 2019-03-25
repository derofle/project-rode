/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Consumer } from '../../services/context';

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

Home.contextType = Consumer;

export default props => (
  <Consumer>{context => <Home {...props} context={context} />}</Consumer>
);
