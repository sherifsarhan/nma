import React, { Component } from 'react';
import { Form, Input, Button, Grid } from 'semantic-ui-react'

class CompanyForm extends Component {
    constructor(props) {
      super(props);
      this.state = {firstName: '', middleName: '', lastName: ''};
  
      this.handleChangeFirst = this.handleChangeFirst.bind(this);
      this.handleChangeMiddle = this.handleChangeMiddle.bind(this);
      this.handleChangeLast = this.handleChangeLast.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangeFirst(event, data) {
      this.setState({firstName: data.value});
    }

    handleChangeMiddle(event, data) {
        this.setState({middleName: data.value});
    }

    handleChangeLast(event, data) {
        this.setState({lastName: data.value});
    }
  
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.firstName + this.state.middleName + this.state.lastName);
      fetch('http://localhost:3001/saveName', {method: 'POST', body: JSON.stringify(this.state)})
        .then((response) => console.log(response));
      event.preventDefault();
    }
  
    render() {
      return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>First name</label>
              <Input fluid placeholder='First Name' value={this.state.firstName} onChange={this.handleChangeFirst}/>
            </Form.Field>
            <Form.Field>
              <label>Middle name</label>
              <Input fluid placeholder='Middle Name' value={this.state.middleName} onChange={this.handleChangeMiddle}/>
            </Form.Field>
            <Form.Field>
              <label>Last name</label>
              <Input fluid placeholder='Last name' value={this.state.lastName} onChange={this.handleChangeLast}/>
            </Form.Field>
          </Form.Group>
          <Button type="submit" value="Submit">Submit</Button>
        </Form>
      );
    }
  }

export default CompanyForm
    