import React, { Component } from 'react';
import {
    Button, Form, Row, Col, Container, Input, FormGroup, Label
} from "reactstrap";
import './create.css'
class Create extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayName: "",
            trainingPhrases: [],
            messages: [],
            test: "",
            choice: [
                "Text",
                "Line Sticker",
                "Imagemap"
            ],
            value: [{
                type: '0',
                value: ""
            }]
        }
    }

    // handleChange = i => e => {
    //     let messages = []
    //     this.state.value.map((item, ind) => {
    //         console.log(item);
    //         messages = [...item]
    //         if (item.type === 'Text') {
    //             return (
    //                 messages[i] = [{ text: { text: e.target.value } }]
    //             )
    //         }
    //         else {
    //             return null
    //         }
    //     })
    //     this.setState({
    //         messages
    //     })
    // }

    render() {
        console.log(this.state.messages);
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Form style={{ marginTop: "50px" }}>
                                <h1 className="textHead">Create Intent</h1>
                                <Input type="select" value={this.state.test} onChange={(e) => {
                                    let arr
                                    if (e.target.value === 'Line Sticker') {
                                        arr = [
                                            ...this.state.value,
                                            {
                                                value: {
                                                    packageId: "",
                                                    stickerId: ""
                                                }, type: e.target.value
                                            }
                                        ]
                                    } else {
                                        arr = [
                                            ...this.state.value,
                                            { value: "", type: e.target.value }
                                        ]
                                    }

                                    this.setState({
                                        value: arr
                                    })
                                }}>
                                    <option value="" disabled>Please Select</option>
                                    {
                                        this.state.choice.map((val) => (
                                            <option value={val}>{val}</option>
                                        ))
                                    }
                                </Input>
                                {
                                    this.state.value.map((item, ind) => {
                                        if (item.type === 'Text') {
                                            return (
                                                <div>
                                                    <Label className="labelip">Text:</Label>
                                                    <Input type="text" name="text" onChange={this.handleChange(ind)} />
                                                </div>
                                            )
                                        }
                                        else if (item.type === 'Line Sticker') {
                                            return (
                                                <div>
                                                    <Label className="labelip">line:</Label>
                                                    <Input readOnly value="line" />
                                                    <Label className="labelip">type:</Label>
                                                    <Input readOnly value="sticker" />
                                                    <Label className="labelip">packageId:</Label>
                                                    <Input name="packageId" value={item.value.packageId} onChange={(e) => {
                                                        this.setState({
                                                            value: this.state.value.map((item, index) => {
                                                                if (index === ind) {
                                                                    return {
                                                                        ...item,
                                                                        value: {
                                                                            ...item.value,
                                                                            [e.target.name]: e.target.value
                                                                        }
                                                                    }
                                                                } else {
                                                                    return item
                                                                }
                                                            })
                                                        })
                                                    }} />
                                                    <Label className="labelip">stickerId:</Label>
                                                    <Input name="stickerId" value={item.value.stickerId} onChange={(e) => {
                                                        this.setState({
                                                            value: this.state.value.map((item, index) => {
                                                                if (index === ind) {
                                                                    return {
                                                                        ...item,
                                                                        value: {
                                                                            ...item.value,
                                                                            [e.target.name]: e.target.value
                                                                        }
                                                                    }
                                                                } else {
                                                                    return item
                                                                }
                                                            })
                                                        })
                                                    }} />
                                                </div>)
                                        }
                                        else if (item.type === 'Imagemap') {
                                            return (
                                                <div>
                                                    <FormGroup>
                                                        <Label className="labelip" for="exampleText">Text Area</Label>
                                                        <Input type="textarea" name="text" id="exampleText" />
                                                    </FormGroup>
                                                </div>
                                            )
                                        }
                                        else {
                                            return null
                                        }
                                    })}
                            </Form>
                        </Col>
                    </Row>
                    <Button style={{ marginTop: "100px" }}>Submit</Button>
                </Container>
            </div>
        )
    }
}

export default Create;