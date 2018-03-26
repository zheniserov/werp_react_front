/* eslint linebreak-style: ["error", "windows"] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Form, Container, List, Grid, Header, Button, Segment, Dimmer, Loader, Label, Icon } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
//import TaskEditModal from '../TaskEdit/TaskEditModal';
import TaskEditContainer from '../TaskEdit/TaskEditContainer';

class TaskInfoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
    };

    this.handleEditModal = this.handleEditModal.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleEditModal() {
    // console.log("handleEditModal()")
    this.setState({
      modalOpen: true,
    });
  }

  handleModalClose() {
    this.setState({
      modalOpen: false,
    });
  }

  render() {
    if (this.props.id) {
      const {
        id, title, author, status, priority, recipient, createdAt, description,
      } = this.props;
      const closedAt =
        (status.id === 5) ? moment(this.props.modifiedAt, 'YYYY-MM-DDTHH:mm:ssZ').format('DD.MM.YYYY, hh:mm:ss') : undefined;
      return (
        <Segment.Group>
          <Segment clearing>
            <Header as="h2" floated="left">
              Задача # <Label as="a" basic size="big">{this.props.id}</Label>
            </Header>
            <Header as="h4" floated="right">
              <Button
                style={{ background: 'rgba(84,170,169, 1)', color: 'white' }}
                onClick={this.handleEditModal}
              >
                <Icon name="edit" />Редактировать
              </Button>
            </Header>
          </Segment>
          <Segment padded color="grey">
            <Form>
              <Grid stackable>
                <Grid.Row>
                  <Grid.Column>
                    <Header as="h3">
                      {title}
                      <Header.Subheader>
                        Добавил(а) <a> {author.firstName} {author.lastName} {author.patronymic}</a>
                      </Header.Subheader>
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={4}>
                  <Grid.Column width={2}>
                    <List verticalAlign="middle" relaxed>
                      <List.Item>
                        <List.Header>Статус:</List.Header>
                      </List.Item>
                      <List.Item>
                        <List.Header>Приоритет:</List.Header>
                      </List.Item>
                      <List.Item>
                        <List.Header>Назначена:</List.Header>
                      </List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={6}>
                    <List verticalAlign="middle" relaxed>
                      <List.Item>
                        <List.Content>
                          {status.text}
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          {priority.text}
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          {recipient.branch.value} - {recipient.department.value} - {recipient.position.value}
                        </List.Content>
                      </List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <List verticalAlign="middle" relaxed>
                      <List.Item>
                        <List.Header>Дата начала:</List.Header>
                      </List.Item>
                      <List.Item>
                        <List.Header>Дата завершения:</List.Header>
                      </List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <List verticalAlign="middle" relaxed>
                      <List.Item>
                        <List.Content>
                          {moment(createdAt, 'YYYY-MM-DDTHH:mm:ssZ').format('DD.MM.YYYY, hh:mm:ss')}
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          {closedAt}
                        </List.Content>
                      </List.Item>
                    </List>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    {/* <Form.TextArea label="Описание" value={description} /> */}
                    <Container>
                      <Header as="h4">Описание</Header>
                      <p>{description}</p>
                    </Container>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Segment>
          <TaskEditContainer
            modalOpen={this.state.modalOpen}
            handleClose={this.handleModalClose}
            {...this.props}
          />
        </Segment.Group>
      );
    }
    return (
      <Dimmer active>
        <Loader indeterminate>Fetching task details...</Loader>
      </Dimmer>
    );
  }
}

TaskInfoComponent.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  status: PropTypes.object,
  priority: PropTypes.object,
  recipient: PropTypes.object,
  author: PropTypes.object,
  description: PropTypes.string,
  createdAt: PropTypes.string,
  modifiedAt: PropTypes.string,
};

export default TaskInfoComponent;
