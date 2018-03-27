import React, { Component } from 'react';
import CompanyForm from './company-form';
import { Grid } from 'semantic-ui-react';

class CompanyPage extends Component {
	render() {
		return (
			<Grid padded='horizontally'>
				<Grid.Row>
					<Grid.Column width={8}>
						<CompanyForm></CompanyForm>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default CompanyPage;
