import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { requestRanking } from "../actions";
import {FormGroup}  from 'reactstrap';
import {Form,Label,Input,placeholder,Button} from 'reactstrap';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Jumbotron} from 'reactstrap';

  
    

class RankedResultPage extends Component {
    
    constructor(props) {
        super(props);

    
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
          collapsed: true
        };
      }
      toggleNavbar() {
        this.setState({
          collapsed: !this.state.collapsed
        });
      }
       

    render() {
      return (
        <div>
            <Navbar color="faded" light>
          <NavbarBrand href="#" className="mr-auto">reactstrap</NavbarBrand>
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
          </Form>
          <Button color="primary" size="lg" >Submit</Button>
      </Jumbotron>
      </div>
      </div>
        
        
      );
    }
  }

  export default RankedResultPage;
  