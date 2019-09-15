import React from 'react';
import {Divider, Message, Table} from 'semantic-ui-react'
import "./SingleMessage.css"
import {ACTOR_BOT} from "../../../Conversation";

function SingleMessage({name, actor, text, table}) {

    return (
        <div className={`main singleMessage ${actor !== ACTOR_BOT ? "manMessage" : ""}`}>
            <Message negative={actor !== ACTOR_BOT} compact>
                <Message.Header className={actor !== ACTOR_BOT ? "rightText" : ""}>{name}</Message.Header>
                <Divider/>
                <Message.Content className={actor !== ACTOR_BOT ? "rightText" : ""} style={{fontSize: '1.2em'}}>{text}
                    {!table ? null : <Table basic='very' celled collapsing style={{marginTop: '1.2em'}}>
                        <Table.Header>
                            <Table.Row>
                                {table[0].columns.map(column =>
                                    <Table.HeaderCell>{column}</Table.HeaderCell>
                                )}
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {table[0].rows.map(row =>
                                <Table.Row>
                                    <Table.Cell>{row[0]}
                                    </Table.Cell>
                                    <Table.Cell>{row[1]}</Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>}
                </Message.Content>
            </Message>
        </div>
    )
}

export default SingleMessage