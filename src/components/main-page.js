import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { requestRanking } from "../actions";
import {FormGroup}  from 'reactstrap';
import {Form,Label,Input,placeholder,Button} from 'reactstrap';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Jumbotron} from 'reactstrap';

  
    

class MainPage extends Component {
    
    constructor(props) {
        super(props);

        this.state={
            indiaState:' ',
            universityType:' ',
            instutionType:' '
        }
    
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
          collapsed: true
        };
      }
      toggleNavbar() {
        this.setState({
          collapsed: !this.state.collapsed
        });
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(e) {
        let target = e.target;
        let value = target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

      handleSubmit(e) {
        e.preventDefault();

        console.log('The form was submitted with the following data:');
        console.log(this.state);
       
    }

    render() {
      return (
        <div>
            <Navbar color="faded" light>
          <NavbarBrand href="#" className="mr-auto">SIH2K19</NavbarBrand>
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
            <Label for="nstutionType">Institution Type</Label>
            <Input type="text" name="instutionType" id="instutionType" placeholder="Enter the institution type" value={this.state.instutionType} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="universityType">University Type</Label>
            <Input type="text" name="universityType" id="universityType" placeholder="Enter the University Type" value={this.state.universityType} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="indiaState">State</Label>
            <Input type="text" name="indiaState" id="indiaState" placeholder="Enter the State"  value={this.state.indiaState} onChange={this.handleChange} />
          </FormGroup>
          </Form>
          <Button color="primary" size="lg" onClick={this.handleSubmit}>Submit</Button>
      </Jumbotron>
          
         
        
      </div>
      </div>
        
        
      );
    }
  }

  export default MainPage;
  