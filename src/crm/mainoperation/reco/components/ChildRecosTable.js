import React from 'react';
import { Table,Card } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

/**
 * Компонент для рендеринга дочерние рекомендации
 */

export default function ChildRecosTable(props){

    //Список рекомендации
    const {items} = props;

    return <Card fluid>
        <Card.Content>
            <Card.Header>
                Рекомендации
            </Card.Header>
        </Card.Content>
        <Card.Content>
            <Table celled striped>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>
                        <Table.HeaderCell>ФИО супруг</Table.HeaderCell>
                        <Table.HeaderCell>Статус</Table.HeaderCell>
                        <Table.HeaderCell />
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {items.map((item,idx) => {
                        return <Table.Row key={item.id}>
                            <Table.Cell>{idx+1}</Table.Cell>
                            <Table.Cell>{item.clientName}</Table.Cell>
                            <Table.Cell>{item.statusName}</Table.Cell>
                            <Table.Cell><Link className={'ui icon button mini'} to={`/crm/reco/view/` + item.id}>
                                Просмотр
                            </Link></Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
        </Card.Content>
    </Card>
}