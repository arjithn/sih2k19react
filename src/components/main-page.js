import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { requestRanking } from "../actions";
import { FormGroup } from "reactstrap";
import { Form, Label, Input, placeholder, Button } from "reactstrap";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import stateOptions from "../utils/states";
import { Jumbotron } from "reactstrap";
import Select from "react-select";
import MultiSelect from "@kenshooui/react-multi-select";
import {
  univTypeOptions,
  infrastructureOptions
} from "../utils/featureConfigs";

class MainPage extends Component {
  state = {
    selectedState: { id: 1 },
    selectedUnivType: { id: 2 },
    collapsed: true,
    selectedInfrastructure: []
  };

  handleChangeInfraStructure = selectedItems => {
    console.log(this.selectedItems);

    this.setState({ selectedInfrastructure: selectedItems });
    console.log(this.state);
  };

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  handleChange = e => {
    let target = e.target;
    console.log(e);
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    console.log("The form was submitted with the following data:");
    console.log(this.state);
    this.setState({
      indiaState: " ",
      indiaStateName: "",
      universityType: " ",
      selectedState: null,
      collapsed: true
    });
  };

  handleIndianStateChange = selectedState => {
    this.setState({ selectedState });
    console.log(`Option selected:`, selectedState);
  };
  handleUnivTypeChange = selectedUnivType => {
    this.setState({ selectedUnivType });
    console.log(`Option selected:`, selectedUnivType);
  };

  render() {
    const { selectedInfrastructure } = this.state;
    return (
      <div>
        <Navbar color="faded" light>
          <NavbarBrand href="#" className="mr-auto">
            SIH2K19
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="#">SignIn</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">SignUp</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <div>
          <Jumbotron>
            <Form>
              <FormGroup>
                <Label for="universityType">University Type</Label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isSearchable
                  name="universityType"
                  value={this.state.selectedUnivType}
                  onChange={this.handleUnivTypeChange}
                  options={univTypeOptions}
                  placeholder="University Type Preference"
                />
              </FormGroup>
              <FormGroup>
                <Label for="indiaState">State</Label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  isSearchable
                  name="state"
                  value={this.state.selectedState}
                  onChange={this.handleIndianStateChange}
                  options={stateOptions}
                  placeholder="Select your State"
                />
              </FormGroup>
              <FormGroup>
                <Label for="">Choose Your Academic Preferences</Label>
                <MultiSelect
                  items={infrastructureOptions}
                  selectedItems={selectedInfrastructure}
                  onChange={this.handleChangeInfraStructure}
                  showSelectAll
                />
              </FormGroup>
            </Form>
            <Button color="primary" size="lg" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Jumbotron>
        </div>
      </div>
    );
  }
}

export default MainPage;
