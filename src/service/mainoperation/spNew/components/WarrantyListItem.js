import React from 'react'
import {Table, Input, Dropdown, Button, Icon} from 'semantic-ui-react'

const WarrantyListItem = (props) => {
    const {id, description, currency, code, warrantyMonths} = props.data
    return (
        <Table.Row>
            <Table.Cell>{props.idx + 1}</Table.Cell>
            <Table.Cell>
                <Button icon onClick={() => props.handleOpenReference(id)}>
                    <Icon name='external square'/>
                </Button>
            </Table.Cell>
            <Table.Cell><Input fluid value={code}/>
            </Table.Cell>
            <Table.Cell><Input fluid value={description}/>
            </Table.Cell>
            <Table.Cell><Input value={warrantyMonths} fluid/>
            </Table.Cell>
            <Table.Cell>
                <Button icon onClick={() => props.handleRemove(id)}>
                    <Icon name='remove'/>
                </Button>
            </Table.Cell>
        </Table.Row>
    )
}

export default WarrantyListItem;