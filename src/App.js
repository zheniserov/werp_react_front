/*jshint esversion: 6 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Menu, Segment, Sidebar} from 'semantic-ui-react';
import './App.css';
import Signin from './components/Auth/Signin';
import TreeMenu from './components/TreeMenu/TreeMenu';
import {fetchUnreadMessages} from "./actions/inbox";
import {fetchTreeMenu} from "./actions/tree_menu";
import Header from './components/Header/Header';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {menuVisible: false};
    }

    componentWillMount() {
        if (this.props.authenticated) {
            // TODO replace with valid user id
            // const userId = -1;
            // this.props.fetchUnreadMessages({userId});
            this.props.fetchTreeMenu();
        }
    }

    // dispatching an action based on state change
    componentWillUpdate(nextProps, nextState) {
        if ((nextProps.authenticated !== this.props.authenticated) && nextProps.refetch) {
            // TODO replace with valid user id            
            // const userId = -1;
            // this.props.fetchUnreadMessages({userId});
            this.props.fetchTreeMenu();
        }
    }

    render() {
        const token = localStorage.getItem('token');
        // If we have a token, consider the user to be signed in
        if (token) {
            return (
                <div className="wrapper">
                    <Header unread={this.props.unread}
                            toggleMenu={() => this.setState({menuVisible: !this.state.menuVisible})}/>

                    <Sidebar.Pushable as={Segment} attached="bottom">
                        <Sidebar as={Menu} animation='overlay' visible={this.state.menuVisible} icon="labeled" vertical>
                            <TreeMenu lang={this.props.lang}
                                      data={this.props.treeMenu}/>
                        </Sidebar>
                        <Sidebar.Pusher onClick={() => this.setState({...this.state, menuVisible: false})}>
                            {this.props.children}
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </div>
            );
        } else {
            return (
                <Signin/>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        username: state.auth.username,
        unread: state.inbox.unread,
        lang: state.locales.lang,
        treeMenu: state.menu.tree,
        refetch: state.menu.refetch
    };
}

export default connect(mapStateToProps, {fetchUnreadMessages, fetchTreeMenu})(App);