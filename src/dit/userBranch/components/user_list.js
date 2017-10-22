import React,{ Component } from 'react';
import { connect } from 'react-redux';
import {  fethcUserBranches } from '../actions/userBranch_action';
import { Table   } from 'semantic-ui-react';

// const arrayList= ;
class UserList extends Component {
    
    
    renderUsers() {
        return this.props.foundUsers.map((user)=>{
            return (
                <Table.Row key={user.userId} onClick={()  => this.onRowSelect(user.userId,user.userName,user.fio)
                    }>
                
                    <Table.Cell>{user.userName}</Table.Cell>
                    <Table.Cell>{user.fio}</Table.Cell>
                    
                </Table.Row> 
            );

        })
    }
    
    

    onRowSelect(a_userId,a_userName,a_fio){
        this.props.fethcUserBranches(a_userId);
        this.props.onUserSelect(a_fio);
    }

    render(){
        
        
        return (
            <div id="userListDiv">
                
                <Table striped compact collapsing selectable id="userListTable">
                    <Table.Header >
                        <Table.Row>
                            <Table.HeaderCell>Пользователь</Table.HeaderCell>
                            <Table.HeaderCell>ФИО</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>            
                    <Table.Body>
                        {this.renderUsers()}
                    </Table.Body>        
                </Table>
            </div>

        );
        
        
    }

};

function mapStateToProps(state)
{
    return { };
}

// function mapDispatchToProps(dispatch){
//     return bindActionCreators({ fetchUsers },dispatch);
// }
export default connect(mapStateToProps,{  fethcUserBranches }) (UserList);