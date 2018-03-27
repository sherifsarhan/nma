import React, { Component } from 'react';
import { Form, Input, Button, Message, Transition, Dropdown } from 'semantic-ui-react';

class CompanyForm extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '', age: '', gender: '', visible: false };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAge = this.handleChangeAge.bind(this);
        this.handleChangeGender = this.handleChangeGender.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(event, data) {
        this.setState({ name: data.value });
    }

    handleChangeAge(event, data) {
        this.setState({ age: data.value });
    }

    handleChangeGender(event, data) {
        this.setState({ gender: data.value });
    }

    handleSubmit(event) {
        // alert('A name was submitted: ' + this.state.name + this.state.age + this.state.gender);
        fetch('http://localhost:3001/addContact', { method: 'POST', body: JSON.stringify(this.state) })
            .then((response) => console.log(response));
        event.preventDefault();
        this.setState({ visible: true });
    }

    render() {
        const genderOptions = [{ key: 'Male', value: 'Male', text: 'Male' }, { key: 'Female', value: 'Female', text: 'Female' }];
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Name</label>
                            <Input fluid placeholder='Name' value={this.state.name} onChange={this.handleChangeName} />
                        </Form.Field>
                        <Form.Field>
                            <label>Age</label>
                            <Input fluid type="number" min="0" max="200" placeholder='Age' value={this.state.age} onChange={this.handleChangeAge} />
                        </Form.Field>
                        <Form.Field>
                            <label>Gender</label>
                            <Dropdown fluid placeholder='Gender' value={this.state.gender} selection options={genderOptions} onChange={this.handleChangeGender} />
                        </Form.Field>
                    </Form.Group>
                    <Button type="submit" value="Submit">Submit</Button>
                </Form>
                <Transition visible={this.state.visible} animation='scale' duration={500}>
                    <Message positive>
						Contact Submitted Successfully!
                    </Message>
                </Transition>
            </div >
        );
    }
}

export default CompanyForm;
