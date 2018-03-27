import React, { Component } from 'react';
import CompanyForm from './company-form';
import { Grid, Header } from 'semantic-ui-react';

class CompanyPage extends Component {
    render() {
        return (
            <div>
                <Header as="h3">Add Contact Form</Header>
                <Grid padded='horizontally'>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <CompanyForm></CompanyForm>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

export default CompanyPage;
