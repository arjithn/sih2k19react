import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { requestRanking } from "../actions";

const mapStateToProps = (state, ownProps) => ({
  univs: state.institutions.byId
});

class LandingPage extends Component {
  render() {
    const { univs, requestRanking } = this.props;
    return (
      <div className="jumbotron">
        <div
          style={{
            color: "#999999",
            width: "75%",
            marginLeft: "10%",
            fontSize: "15px",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "2%"
          }}
        />
        {JSON.stringify(univs)}
        <button onClick={requestRanking}>CLick me</button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { requestRanking }
)(LandingPage);
