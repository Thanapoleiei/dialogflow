import React, { Component } from 'react';
import { Button, Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, } from 'reactstrap'
import _ from 'lodash';
import * as firebase from 'firebase/app';
import 'firebase/database';
import './dialogflow.css'
import ShowMore from 'react-show-more';
const INTENT_ID = 'projects/ockock-rjjlqc/agent';
class Dialogflows extends Component {
    constructor(props) {
        super(props)
        this.state = {
            intents: [],
            intent: [],
            messages: [],
            detail: [{
                display: '',
                keyword: '',
                answer: ''
            }],
            search: '',
            modal: false
        }
    }

    componentDidMount() {
        const AccessToken = localStorage.getItem('token');
        if (AccessToken && localStorage.getItem('firstname') === "ธนพล") {
            this.props.history.push('/download')
            fetch(`https://dialogflow.googleapis.com/v2/${INTENT_ID}/intents?intentView=1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AccessToken}`
                },
            })
                .then((response) => {
                    const dataFrom = response.json()
                    var p = Promise.resolve(dataFrom);
                    p.then((v) => {
                        let intent = v.intents
                        console.log(v.intents);
                        
                        this.setState({
                            intent
                        })
                        this.findKeyword(intent)
                    })
                })
                .catch((error) => {
                    console.warn(error);
                });
        } else {
            this.props.history.push('/')
        }
    }

    sendToDialogflow = () => {
        const AccessToken = localStorage.getItem('token');
        fetch(`https://dialogflow.googleapis.com/v2/${INTENT_ID}/intents`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${AccessToken}`
            },
            body: JSON.stringify({
                "displayName": "Advice_Menu - custom-3",
                "trainingPhrases": [{ "name": "2558c7d1-037b-4a21-b724-f49b68ee54f9", "type": "EXAMPLE", "parts": [{ "text": "คำถามที่พบบ่อย" }] }],
                "messages": [
                    {
                        "image": {
                            "imageUri": "https://1.bp.blogspot.com/-Odjv6koAais/XmMpmiuFQ_I/AAAAAAAAApo/E3ajTDgVfKo4WGM2iCxnsuT9nNSfXPhIgCLcBGAsYHQ/s1600/Advice.jpg"
                        },
                        "platform": "LINE"
                    },
                    {
                        "payload": {
                            "line": {
                                "baseUrl": "https://1.bp.blogspot.com/-WRZO5UXo0fA/Xkp_QXOfHnI/AAAAAAAAAcA/szZMOQWnpiQv_KpWiHToT5DOytBheIE6ACLcBGAsYHQ/s1080",
                                "baseSize": { "width": 1040, "height": 175 },
                                "altText": "Please select the number below 🙋",
                                "type": "imagemap",
                                "actions": [
                                    {
                                        "type": "message",
                                        "text": "ข้อควรรู้ในการป้องกันตัว",
                                        "area": { "x": 42, "width": 115, "y": 44, "height": 111 }
                                    },
                                    {
                                        "area": { "y": 44, "height": 111, "x": 213, "width": 115 },
                                        "type": "message",
                                        "text": "คำถามที่พบบ่อย"
                                    },
                                    {
                                        "linkUri": "https://ddc.moph.go.th/viralpneumonia/laws.php",
                                        "area": { "height": 111, "x": 383, "width": 115, "y": 44 },
                                        "type": "uri"
                                    },
                                    {
                                        "type": "uri",
                                        "linkUri": "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public",
                                        "area": { "y": 44, "height": 111, "x": 549, "width": 115 }
                                    },
                                    {
                                        "area": { "y": 44, "height": 111, "x": 720, "width": 115 },
                                        "linkUri": "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/travel-advice",
                                        "type": "uri"
                                    },
                                    {
                                        "linkUri": "https://www.who.int/emergencies/diseases/novel-coronavirus-2019/technical-guidance",
                                        "area": { "width": 115, "y": 44, "height": 111, "x": 890 },
                                        "type": "uri"
                                    }
                                ]
                            }
                        },
                        "platform": "LINE"
                    },
                    { "text": { "text": ["test", "สวัสดี"] } }
                ],
            })
        })
            .then((response) => {
                window.location.reload();
                alert("ADD Done!!")
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    downloadFile = async () => {
        const { intent } = this.state;
        const dataSplit = intent[0].name.split(" ")
        const dataSplit2 = dataSplit[0].substring(9, 19)
        const fileName = dataSplit2;
        const json = JSON.stringify(intent);
        const blob = new Blob([json], { type: 'application/json' });
        const href = await URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    sendToFire = () => {
        firebase.database().ref('/dataTEST').set(this.state);
    }

    Logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('firstname')
        this.props.history.push('/')
    }

    updateSearch = (e) => {
        this.setState({
            search: e.target.value.substr(0, 30)
        })
    }

    setForm = (display, keyword, answer, name) => {
        return _.zipWith(display, keyword, answer, name, (display, keyword, answer, name) => ({ display, keyword, answer, name }));
    }

    findKeyword = (intents) => {
        const keyword = []
        const answer = []
        const display = []
        const name = []
        intents.map((item) => {
            name.push(item.name)
            display.push(item.displayName)
            if (item.trainingPhrases) {
                let key = []
                item.trainingPhrases.forEach(element => {
                    key.push(element.parts[0].text)
                });
                keyword.push(key)
            } else {
                keyword.push(["Fallback"])
            }
            if (!item.messages[0].payload && !item.messages[0].image) {
                if (item.messages[0].text) {
                    answer.push(item.messages[0].text.text[0])
                } else {
                    answer.push(JSON.stringify(item.messages[1].payload))
                    answer.push(item.messages[1].text.text[0])
                }
            }
            else {
                if (item.messages[0].payload) {
                    answer.push(JSON.stringify(item.messages[0].payload))
                } else if (item.messages[0].image) {
                    answer.push(JSON.stringify(item.messages[0].image))
                }
            }
            return null;
        })
        this.setState({ messages: this.setForm(display, keyword, answer, name) })
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }

    modalCard = async (id) => {
        const detail = this.state.messages.find((item) => {
            const dataSplit = item.name.split(" ")
            const dataSplit2 = dataSplit[0].substring(34, 70)
            return dataSplit2 === id
        })
        await this.setState({
            ...detail, detail
        })
    }

    render() {
        const { messages } = this.state
        let filterData = messages.filter(item => {
            return item.display.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                || [item.keyword].join(' ').toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                || [item.answer].join(' ').toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        })
        const dataIntent = filterData.map((item, idx) => {
            const dataSplit = item.name.split(" ")
            const dataSplit2 = dataSplit[0].substring(34, 70)
            return (
                <div key={idx}>
                    <Row className="tables">
                        <Col xs="2">
                            <ShowMore
                                lines={1}
                                more=''
                                less=''
                                anchorClass=''
                            >
                                <p>{item.display}</p>
                            </ShowMore>
                        </Col>
                        <Col xs="4">
                            <ShowMore
                                lines={3}
                                more=''
                                less=''
                                anchorClass=''
                            >
                                {
                                    item.keyword.map((item, idx) => {
                                        return (
                                            <div key={idx}>
                                                <p>{item}</p>
                                            </div>
                                        )
                                    })
                                }
                            </ShowMore>
                        </Col>
                        <Col xs="4">
                            <ShowMore
                                lines={3}
                                more=''
                                less=''
                                anchorClass=''
                            >
                                <p>{item.answer}</p>
                            </ShowMore>
                        </Col >
                        <Col xs="2">
                            <Button color="danger" onClick={() => {
                                const AccessToken = localStorage.getItem('token');
                                fetch(`https://dialogflow.googleapis.com/v2/${INTENT_ID}/intents/${dataSplit2}`, {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${AccessToken}`
                                    },
                                })
                                    .then((response) => {
                                        window.location.reload();
                                        alert(item.display + " Delete Done!!")
                                    })
                                    .catch((error) => {
                                        console.warn(error);
                                    });
                            }}> Delete </Button>
                            <Button color="primary" style={{ marginLeft: "10px" }} onClick={() => {
                                this.setState({
                                    modal: true
                                })
                                this.modalCard(dataSplit2)
                            }}>View</Button>
                        </Col>
                    </Row>
                </div >
            )
        })

        return (
            <Container>
                <div className="pageShowdata">
                    <div align="right">
                        <Button onClick={this.Logout}> Logout  </Button>
                    </div>
                    <h1>Get data from Dialogflow</h1>
                    <div>
                        <Button color="success" style={{ marginRight: "20px" }} onClick={this.downloadFile}>Downlaod</Button>
                        <Button color="info" style={{ marginRight: "20px" }} onClick={this.sendToFire}>Send to Firebase</Button>
                        <Button color="warning" onClick={this.sendToDialogflow}> Send to Dialogflow </Button>
                    </div>
                    <div align="center" style={{ marginTop: "20px" }}>
                        <Input
                            className="ip2"
                            type="text"
                            placeholder="ค้นหาไฟล์"
                            value={this.state.search}
                            onChange={this.updateSearch}
                        >
                        </Input>
                    </div>
                    <h1 style={{ textAlign: "center", marginTop: "10px" }}> {Object.keys(messages).length} Intents</h1>
                    <div align="left">
                        <Row>
                            <Col xs="2">
                                <h4>Display Name</h4>
                            </Col >
                            <Col xs="4">
                                <h4>Keyword</h4>
                            </Col>
                            <Col xs="4">
                                <h4>Answer</h4>
                            </Col>
                            <Col xs="2">

                            </Col >
                        </Row>
                        {dataIntent}
                    </div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>View Intent</ModalHeader>
                        <ModalBody>
                            <Label>Display Name</Label>
                            <Input type="text" value={this.state.detail.display} />
                            <Label>Keyword</Label>
                            <Input className="ip3" type="textarea" value={this.state.detail.keyword} />
                            <Label>Answer</Label>
                            <Input className="ip3" type="textarea" value={this.state.detail.answer} />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </Container >
        );
    }
}
export default Dialogflows