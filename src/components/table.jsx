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
        fetch('http://localhost:3001/getContacts', { method: 'GET' })
            .then((response) => { return response.json(); })
            .then((data) => {
                console.log(data);
                let contacts = [];
                _.mapValues(data, (contact) => {
                    contacts.push(JSON.parse(contact));
                });
                this.setState({
                    data: contacts
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
                <Header as="h3">View Contact Table</Header>
                <Table sortable celled fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell sorted={column === 'name' ? direction : null} onClick={this.handleSort('name')}>
                                Name
                            </Table.HeaderCell>
                            <Table.HeaderCell sorted={column === 'age' ? direction : null} onClick={this.handleSort('age')}>
                                Age
                            </Table.HeaderCell>
                            <Table.HeaderCell sorted={column === 'gender' ? direction : null} onClick={this.handleSort('gender')}>
                                Gender
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {_.map(data, ({ age, gender, name }) => (
                            <Table.Row key={name}>
                                <Table.Cell>{name}</Table.Cell>
                                <Table.Cell>{age}</Table.Cell>
                                <Table.Cell>{gender}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

