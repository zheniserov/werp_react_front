import React from 'react';
import { Segment, Comment, Form, Button, Message, Header } from 'semantic-ui-react';
import faker from 'faker';

const OutCallDetailsPanelDisplay = (props) => {
  const { comments } = props;
  return (
    <Segment raised>
      <Comment.Group style={{ maxWidth: "100%" }}>
        <Header as='h3' dividing>Коментарий</Header>
        {
          comments &&
          comments.map((item, idx) => (
            <Comment key={idx}>
              <Comment.Content>
                <Comment.Author>
                  { item.author && `${item.author.lastName} ${item.author.firstName} ${item.author.patronymic}`}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{new Date(item.createdAt).toLocaleString()}</div>
                </Comment.Metadata>
                <Comment.Text>
                  <p>{item.text}</p>
                </Comment.Text>
              </Comment.Content>
            </Comment>
          ))
        }
      </Comment.Group>
    </Segment>
  );
};

export default OutCallDetailsPanelDisplay;
