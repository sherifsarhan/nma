import React from 'react'
import { Form, Button, Grid } from 'semantic-ui-react'

const CompanyForm = () => (
    <Grid columns={2}>
        <Grid.Column>
            <Grid.Row>
                <Form>
                    <Form.Group>
                    <Form.Input label='First name' placeholder='First Name' width={6} />
                    <Form.Input label='Middle Name' placeholder='Middle Name' width={4} />
                    <Form.Input label='Last Name' placeholder='Last Name' width={6} />
                    </Form.Group>
                </Form>
                <Button>Submit</Button>
            </Grid.Row>
        </Grid.Column>
    </Grid>
)

export default CompanyForm
    