import React from "react";


const Footer = (props) => {
    return (
         <footer className="page-footer grey container" style={{boxShadow: "0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2)"}}>
          <div style={{ width: "90%", margin: "auto"}}>
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Project Rode</h5>
               
              </div>
              <div className="col l4 offset-l2 s12">
                
               
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div style={{ width: "90%", margin: "auto"}}>
            © 2019 Evilife
            </div>
          </div>
        </footer>
    )
}

export default Footer;