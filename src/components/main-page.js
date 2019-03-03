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
  CardSubtitle,
  Container,
  Row,
  Col
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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const mapStateToProps = (state, ownProps) => ({
  univs: getEntitiesAsList(state.institutions)
});

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

class MainPage extends Component {
  state = {
    selectedState: { id: 1 },
    selectedUnivType: { id: 2 },
    selectedInfrastructure: [],
    selectedAcademics: [],
    selectedResearch: [],
    selectedOptions: []
  };

  handleChangeInfraStructure = selectedItems => {
    console.log(this.selectedItems);

    this.setState({ selectedInfrastructure: selectedItems });
    this.handleChangeOptions(selectedItems);
    console.log(this.state);
  };

  handleChangeOptions = selectedOptions => {
    const {
      selectedInfrastructure,
      selectedAcademics,
      selectedResearch
    } = this.state;
    const current = this.state.selectedOptions;
    this.setState({
      selectedOptions: [
        ...selectedInfrastructure,
        ...selectedAcademics,
        ...selectedResearch
      ]
    });
  };

  handleChangeAcademics = selectedItems => {
    console.log(this.selectedItems);

    this.setState({ selectedAcademics: selectedItems });
    this.handleChangeOptions(selectedItems);
    console.log(this.state);
  };

  handleChangeResearch = selectedItems => {
    console.log(this.selectedItems);

    this.setState({ selectedResearch: selectedItems });
    this.handleChangeOptions(selectedItems);
    console.log(this.state);
  };

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  handleCheckbox = e => {
    console.log(e.target.checked);
    if (e.target.checked) {
      this.setState({
        [e.target.name]: {
          id: e.target.id
        }
      });
    } else {
      this.setState({
        [e.target.name]: {
          id: null
        }
      });
    }
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
    const requestData = this.state;
    delete requestData["selectedResearch"];
    delete requestData["selectedAcademics"];
    delete requestData["selectedInfrastructure"];
    requestRanking(requestData);
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
  onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.selectedOptions,
      result.source.index,
      result.destination.index
    );

    this.setState({
      selectedOptions: items
    });
  };

  render() {
    const {
      selectedInfrastructure,
      selectedAcademics,
      selectedResearch,
      selectedOptions
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
          <Container>
            <Row>
              <div className="col sm-6">
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
                        defa
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
                            <Label for="">
                              Choose Your Academic Preferences
                            </Label>
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
                            <Label for="">
                              Choose Your Research Preferences
                            </Label>
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
                    <br />
                    <FormGroup check>
                      <Label check>
                        <h3>
                          <Input
                            type="checkbox"
                            onChange={this.handleCheckbox}
                            name="Scholarships"
                            id={19}
                          />{" "}
                          Scholarships
                        </h3>
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <h3>
                          <Input
                            type="checkbox"
                            onChange={this.handleCheckbox}
                            name="girlExclusiveFeature"
                            id={20}
                          />
                          GirlExclusive
                        </h3>
                      </Label>
                    </FormGroup>
                  </Form>

                  <br />
                  <Button color="primary" size="lg" onClick={this.handleSubmit}>
                    Submit
                  </Button>
                </Jumbotron>
              </div>
              <div className="col sm-6">
                <p>Hello</p>
              </div>
            </Row>
          </Container>
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
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {this.state.selectedOptions.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {item.label}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { requestRanking }
)(MainPage);
