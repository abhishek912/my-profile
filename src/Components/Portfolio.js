import React, { Component } from "react";
import Zmage from "react-zmage";
import Fade from "react-reveal";

let id = 0;
class Portfolio extends Component {
  render() {
    const logo = this.props.main ? this.props.main.logo : [];
    if (!this.props.data) return null;

    const projects = this.props.data.projects.map(function (projects) {
      let projectImage = "images/portfolio/" + projects.image;

      return (
        <div key={id++} className="columns portfolio-item">
          <div className="item-wrap">
            <Zmage alt={projects.title} src={projectImage} />
            <div style={{ textAlign: "center" }}>{projects.title}</div>
          </div>
        </div>
      );
    });

    return (
      <section id="portfolio">
        <Fade left duration={1000} distance="40px">
          <div className="row">
            <div className="twelve columns collapsed">
              <h1>Check Out Some of My Works.</h1>

              <div
                id="portfolio-wrapper"
                className="bgrid-quarters s-bgrid-thirds cf"
                style={{width: "100%", height: "100%"}}
              >
                {projects}
              </div>

          <div className="three columns pb-logo">
              <img
                className="profile-pic"
                src={"images/logo/"+logo[0]} 
                alt="PB LOGO"
                style={{borderRadius: "55%"}}
              />
            </div>
            </div>
          </div>
        </Fade>
      </section>
    );
  }
}

export default Portfolio;
