import React, { Component } from 'react';
import { Form, Input, Button, Message, Transition, Dropdown } from 'semantic-ui-react';

class CompanyForm extends Component {
    constructor(props) {
        super(props);
        this.state = { companyName: '', agentId: '', segmentId: '', visible: false };

        this.handleChangeCompanyName = this.handleChangeCompanyName.bind(this);
        this.handleChangeAgent = this.handleChangeAgent.bind(this);
        this.handleChangeSegment = this.handleChangeSegment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.agentOptions = []
    }

    componentDidMount() {
        fetch('http://localhost:3001/getAgents', { method: 'GET' })
            .then((response) => { return response.json(); })
            .then((agents) => {
                let agentOptions = [];
                agents.forEach((agent) => {
                    agentOptions.push({ key: agent.idagents, value: agent.idagents, text: `${agent.AgentLastName}, ${agent.AgentFirstName}`, description: agent.idagents });
                });
                this.agentOptions = agentOptions;
            });
    }

    handleChangeCompanyName(event, data) {
        this.setState({ companyName: data.value });
    }

    handleChangeAgent(event, data) {
        this.setState({ agentId: data.value });
    }

    handleChangeSegment(event, data) {
        this.setState({ segmentId: data.value });
    }

    handleSubmit(event) {
        fetch('http://localhost:3001/addCompany', { method: 'POST', body: JSON.stringify(this.state) })
            .then((response) => console.log(response));
        event.preventDefault();
        this.setState({ visible: true });
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Company Name</label>
                            <Input fluid placeholder='Name' value={this.state.companyName} onChange={this.handleChangeCompanyName} />
                        </Form.Field>
                        <Form.Field>
                            <label>Agent</label>
                            <Dropdown fluid search selection options={this.agentOptions} placeholder='Agent' value={this.state.agentId} onChange={this.handleChangeAgent} />
                        </Form.Field>
                        <Form.Field>
                            <label>Segment ID</label>
                            <Input fluid type="number" min="0" max="200" placeholder='Segment ID' value={this.state.segmentId} onChange={this.handleChangeSegment} />
                        </Form.Field>
                    </Form.Group>
                    <Button type="submit" value="Submit">Submit</Button>
                </Form>
                <Transition visible={this.state.visible} animation='scale' duration={500}>
                    <Message positive>
						Company Added Successfully!
                    </Message>
                </Transition>
            </div >
        );
    }
}

export default CompanyForm;
