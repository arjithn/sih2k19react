import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { requestRanking } from "../actions";
import {FormGroup}  from 'reactstrap';
import {Form,Label,Input,placeholder} from 'reactstrap';


const mapStateToProps = (state, ownProps) => ({
  univs: state.institutions.byId
});

class LandingPage extends Component {
  render() {
    const { univs, requestRanking } = this.props;
    return (
      <div>
        <div>
        <Form>
        <FormGroup>
          <Label for="nstutionType">Institution Type</Label>
          <Input type="text" name="instutionType" id="instutionType" placeholder="Enter the institution type" />
        </FormGroup>
        <FormGroup>
          <Label for="universityType">University Type</Label>
          <Input type="text" name="universityType" id="universityType" placeholder="Enter the University Type" />
        </FormGroup>
        <FormGroup>
          <Label for="indiaState">State</Label>
          <Input type="text" name="indiaState" id="indiaState" placeholder="Enter the State"  />
        </FormGroup>
        </Form>
        </div>
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
      
    </div>
      
      
    );
  }
}

export default connect(
  mapStateToProps,
  { requestRanking }
)(LandingPage);
