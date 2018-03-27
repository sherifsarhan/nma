import React, { Component } from 'react';
import CompanyPage from './company-page';
import TableExamplePagination from './table';
import {
    Segment,
    Menu,
    Icon,
    Sidebar
} from 'semantic-ui-react';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { menuVisible: false };
        this.mainView = <CompanyPage />;
    }
    setView(type) {
        if (type === "form") {
            this.mainView = <CompanyPage />;
        }
        if (type === "table") {
            this.mainView = <TableExamplePagination />;
        }
        this.setState({ menuVisible: !this.state.menuVisible });
    }
    render() {
        return (
            <div style={{ height: '100vh' }}>
                <Menu secondary attached="top">
                    <Menu.Item onClick={() => this.setState({ menuVisible: !this.state.menuVisible })} >
                        <Icon name="sidebar" />Menu
                    </Menu.Item>
                </Menu>
                <Sidebar.Pushable as={Segment} attached="bottom">
                    <Sidebar width='thin' as={Menu} animation="uncover" visible={this.state.menuVisible} icon="labeled" vertical inverted>
                        <Menu.Item onClick={() => this.setView('form')}><Icon name="home" />Home</Menu.Item>
                        <Menu.Item onClick={() => this.setView('table')}><Icon name="block layout" />Topics</Menu.Item>
                        <Menu.Item><Icon name="smile" />Friends</Menu.Item>
                        <Menu.Item><Icon name="calendar" />History</Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher dimmed={this.state.menuVisible} onClick={() => this.setState({ menuVisible: false })}>
                        <Segment basic>
                            {this.mainView}
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}

export default HomePage;
