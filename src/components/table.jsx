import _ from 'lodash';
import React from 'react';
import { Table, Header } from 'semantic-ui-react';

export default class TableExamplePagination extends React.Component {
    state = {
        column: null,
        data: [],
        direction: null,
    }
    componentDidMount() {
        fetch('http://localhost:3001/getCompanies', { method: 'GET' })
            .then((response) => { return response.json(); })
            .then((data) => {
                let companies = [];
                _.mapValues(data, (company) => {
                    companies.push(company);
                });
                this.setState({
                    data: companies
                });
            });
    }


    handleSort = clickedColumn => () => {
        const { column, data, direction } = this.state;

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                data: _.sortBy(data, [clickedColumn]),
                direction: 'ascending',
            });

            return;
        }

        this.setState({
            data: data.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        });
    }
    render() {
        const { column, data, direction } = this.state;
        return (
            <div>
                <Header as="h3">View Companies Table</Header>
                <Table sortable celled fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell sorted={column === 'companiesid' ? direction : null} onClick={this.handleSort('companiesid')}>
                                Company ID
                            </Table.HeaderCell>
                            <Table.HeaderCell sorted={column === 'CompanyName' ? direction : null} onClick={this.handleSort('CompanyName')}>
                                Company Name
                            </Table.HeaderCell>
                            <Table.HeaderCell sorted={column === 'AgentId' ? direction : null} onClick={this.handleSort('AgentId')}>
                                AgentId
                            </Table.HeaderCell>
                            <Table.HeaderCell sorted={column === 'AgentFirstName' ? direction : null} onClick={this.handleSort('AgentFirstName')}>
                                Agent First Name
                            </Table.HeaderCell>
                            <Table.HeaderCell sorted={column === 'AgentLastName' ? direction : null} onClick={this.handleSort('AgentLastName')}>
                                Agent Last Name
                            </Table.HeaderCell>
                            <Table.HeaderCell sorted={column === 'AgentPosition' ? direction : null} onClick={this.handleSort('AgentPosition')}>
                                Agent Position
                            </Table.HeaderCell>
                            <Table.HeaderCell sorted={column === 'SegmentId' ? direction : null} onClick={this.handleSort('SegmentId')}>
                                SegmentId
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {_.map(data, ({ AgentId, AgentFirstName, AgentLastName, AgentPosition, SegmentId, CompanyName, idcompanies }) => (
                            <Table.Row key={idcompanies}>
                                <Table.Cell>{idcompanies}</Table.Cell>
                                <Table.Cell>{CompanyName}</Table.Cell>
                                <Table.Cell>{AgentId}</Table.Cell>
                                <Table.Cell>{AgentFirstName}</Table.Cell>
                                <Table.Cell>{AgentLastName}</Table.Cell>
                                <Table.Cell>{AgentPosition}</Table.Cell>
                                <Table.Cell>{SegmentId}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

