
import React from 'react';
import { v4 as uuid } from 'uuid';
import { Button, Form, Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

interface Item {
    value: string;
    id: string;
}

interface Props {
    title: string;
    startNum?: number;
    itemList: Item[];
    setItemList: React.Dispatch<React.SetStateAction<Item[]>>;
    required?: boolean;
    type?: string;
    large?: boolean;
}

const DynamicInput: React.FC<Props> = ({ title, startNum, itemList, setItemList, required, type, large }: Props) => {

    const newItem = (): Item => {
        return { 
            value: "", 
            id: uuid()
         }
    }

    const updateItem = (id: string, value: string) => {
        const index = itemList?.findIndex(i => i.id === id)
        let items = [...itemList];
        let item = { ...itemList[index] };
        if (!item) {
            return;
        }
        item.value = value;
        items[index] = item;
        setItemList(items);
    }

    React.useEffect(() => {
        if (itemList === undefined || itemList?.length === 0) {
            setItemList([...Array(startNum)].map((x, i) => newItem()));
        }
    }, [startNum, setItemList, itemList])

    const removeItem = (id: string) => {
        setItemList(itemList ? itemList.filter(i => i.id !== id) : [])
    }

    const addItem = () => {
        setItemList([...itemList, { ...newItem() }])
    }

    const isDisabled: boolean = itemList?.length === 1 && required === true;
    return (
        <div>
            <Form.Label>{title}</Form.Label>
            <Container style={{ marginBottom: "20px"}}>
            {
                itemList.map(i => (
                        <Row key={i.id} >
                        <Col >
                            <Form.Group>
                                {
                                    large ? 
                                        <Form.Control
                                        as="textarea"
                                        rows={2}
                                        required={required}
                                        value={i.value}
                                        onChange={({ target }) => updateItem(i.id, target.value)}
                                        />
                                    :
                                    <Form.Control
                                        type={type}
                                        required={required}
                                        value={i.value}
                                        onChange={({ target }) => updateItem(i.id, target.value)}
                                        />
                                
                                }
                            </Form.Group>
                        </Col>
                        <Col xs={2}>
                                <Button disabled={isDisabled} variant="outline-secondary" onClick={() => removeItem(i.id)}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </Button>
                        </Col>
                        </Row>
                ))
            }
            <Row>
                <Col>
                    <Button variant="light" onClick={addItem}>
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </Col>
            </Row>
            </Container>
        </div>
    )
}

DynamicInput.defaultProps = {
    startNum: 1,
    required: false,
    type: "text",
    large: false
}

export default DynamicInput;