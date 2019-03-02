import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { requestRanking } from "../actions";
import ReactDOM from "react-dom";

import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";
import {
  FormGroup,
  Form,
  Label,
  Input,
  Button,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
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
import { requestRankings } from "../actions";
import { getEntitiesAsList } from "../selectors";
import { Jumbotron } from "reactstrap";
import Select from "react-select";
import MultiSelect from "@kenshooui/react-multi-select";
import {
  univTypeOptions,
  infrastructureOptions,
  researchOptions,
  academicsOptions
} from "../utils/featureConfigs";

const mapStateToProps = (state, ownProps) => ({
  univs: getEntitiesAsList(state.institutions)
});

class MainPage extends Component {
  state = {
    selectedState: { id: 1 },
    selectedUnivType: { id: 2 },
    collapsed: true,
    selectedInfrastructure: [],
    selectedAcademics: [],
    selectedResearch: []
  };

  handleChangeInfraStructure = selectedItems => {
    console.log(this.selectedItems);

    this.setState({ selectedInfrastructure: selectedItems });
    console.log(this.state);
  };

  handleChangeAcademics = selectedItems => {
    console.log(this.selectedItems);

    this.setState({ selectedAcademics: selectedItems });
    console.log(this.state);
  };

  handleChangeResearch = selectedItems => {
    console.log(this.selectedItems);

    this.setState({ selectedResearch: selectedItems });
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
    const { requestRanking } = this.props;
    requestRanking(this.state);
    e.preventDefault();
    console.log("The form was submitted with the following data:");
    console.log(JSON.stringify(this.state));
  };

  handleIndianStateChange = selectedState => {
    this.setState({
      selectedState: {
        ...selectedState,
        id: 1
      }
    });
    console.log(`Option selected:`, selectedState);
  };
  handleUnivTypeChange = selectedUnivType => {
    this.setState({
      selectedUnivType: {
        ...selectedUnivType,
        id: 2
      }
    });
    console.log(`Option selected:`, selectedUnivType);
  };

  render() {
    const {
      selectedInfrastructure,
      selectedAcademics,
      selectedResearch
    } = this.state;
    const { univs } = this.props;
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
              <Accordion accordion className="tablist">
                <AccordionItem>
                  <AccordionItemTitle>
                    <h3>Infrastructure Preferences</h3>
                  </AccordionItemTitle>
                  <AccordionItemBody>
                    <FormGroup>
                      <Label for="">
                        Choose Your Infrastructure Preferences
                      </Label>
                      <MultiSelect
                        items={infrastructureOptions}
                        selectedItems={selectedInfrastructure}
                        onChange={this.handleChangeInfraStructure}
                        showSelectAll
                      />
                    </FormGroup>
                  </AccordionItemBody>
                </AccordionItem>
                <AccordionItem expanded>
                  <AccordionItemTitle>
                    <h3>Academic Preferences</h3>
                  </AccordionItemTitle>
                  <AccordionItemBody>
                    <FormGroup>
                      <Label for="">Choose Your Academic Preferences</Label>
                      <MultiSelect
                        items={academicsOptions}
                        selectedItems={selectedAcademics}
                        onChange={this.handleChangeAcademics}
                        showSelectAll
                      />
                    </FormGroup>
                  </AccordionItemBody>
                </AccordionItem>
                <AccordionItem>
                  <AccordionItemTitle>
                    <h3>Research Preferences</h3>
                  </AccordionItemTitle>
                  <AccordionItemBody>
                    <FormGroup>
                      <Label for="">Choose Your Research Preferences</Label>
                      <MultiSelect
                        items={researchOptions}
                        selectedItems={selectedResearch}
                        onChange={this.handleChangeResearch}
                        showSelectAll
                      />
                    </FormGroup>
                  </AccordionItemBody>
                </AccordionItem>
              </Accordion>
            </Form>
            <Button color="primary" size="lg" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Jumbotron>
        </div>
        <div>
          {univs.map(e => (
            <Card>
              <CardImg
                top
                width="80%"
                src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=20"
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle>
                  <h3>{e.university}</h3>
                </CardTitle>
                <CardSubtitle>
                  {e.District} {e.State}
                </CardSubtitle>
                <CardText>
                  Let's have some generic desc here. with University/ college
                  contact details
                </CardText>
                <Button>Matches My Preference</Button>
              </CardBody>
            </Card>
          ))}
        </div>
        <Button>Plot them</Button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { requestRanking }
)(MainPage);
