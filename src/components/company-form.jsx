import React, { Component } from 'react';
import { Form, Input, Button, Message, Transition, Dropdown } from 'semantic-ui-react';

class CompanyForm extends Component {
    constructor(props) {
        super(props);
        this.state = { companyName: '', agentId: '', segmentId: '', visible: false };

        this.handleChangeCompanyName = this.handleChangeCompanyName.bind(this);
        this.handleChangeAgentId = this.handleChangeAgentId.bind(this);
        this.handleChangeSegmentId = this.handleChangeSegmentId.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeCompanyName(event, data) {
        this.setState({ companyName: data.value });
    }

    handleChangeAgentId(event, data) {
        this.setState({ agentId: data.value });
    }

    handleChangeSegmentId(event, data) {
        this.setState({ segmentId: data.value });
    }

    handleSubmit(event) {
        // alert('A name was submitted: ' + this.state.name + this.state.age + this.state.gender);
        fetch('http://:3001/addCompany', { method: 'POST', body: JSON.stringify(this.state) })
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
                            <label>Company Name</label>
                            <Input fluid placeholder='Name' value={this.state.companyName} onChange={this.handleChangeCompanyName} />
                        </Form.Field>
                        <Form.Field>
                            <label>Agent ID</label>
                            <Input fluid type="number" min="0" max="200" placeholder='Agent ID' value={this.state.agentId} onChange={this.handleChangeAgentId} />
                        </Form.Field>
                        <Form.Field>
                            <label>Segment ID</label>
                            <Input fluid type="number" min="0" max="200" placeholder='Segment ID' value={this.state.segmentId} onChange={this.handleChangeSegmentId} />
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
