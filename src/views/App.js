import React from "react";
import {
  Form,
  Card,
  Row,
  Col,
  Image,
  Nav,
  Button,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/App.css";

function App() {
  const [state, setState] = React.useState([]);
  const [info, setInfo] = React.useState([]);
  const [show, setShow] = React.useState(false);
  let { type } = useParams();
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && event.target.value.length > 0) {
      load_data(event, event.target.value);
    }
  };
  const handleShow = () => setShow(!show);

  const show_moreInfo = (e, id) => {
    console.log(id);
    load_info(id);
    handleShow();
  };
  async function load_data(e, data) {
    //console.log(data);
    let dic = {};
    dic[type] = data;
    console.log(dic);
    await axios
      .post("http://localhost:5000/api/v1/" + type, dic)
      .then((res) => {
        console.log(res.data.results);
        setState(res.data.results);
      });
  }
  async function load_info(id) {
    //console.log(data);
    let dic = {};
    dic[type] = id;
    console.log(dic);
    await axios
      .get("http://localhost:5000/api/v1/" + type + "/" + id, dic)
      .then((res) => {
        console.log(res.data);
        setInfo(res.data);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <Nav
          className="justify-content-center"
          variant="tabs"
          defaultActiveKey={"/search/" + type}
        >
          <Nav.Item>
            <Nav.Link href="/search/people">PERSONAS</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/search/job">EMPLEOS</Nav.Link>
          </Nav.Item>
        </Nav>
      </header>
      <main>
        <Form.Control
          className="col-sm-12 mt-3"
          style={{ borderRadius: "20px", height: "40px" }}
          type="text"
          placeholder={type === "people" ? "Buscar personas" : "Buscar empleos"}
          onKeyPress={handleKeyPress}
        />
        <article className="col-sm-12 pt-1 mt-1 pb-1">
          {$.isEmptyObject(state[0])
            ? ""
            : type === "people"
            ? state.map((data, index) => (
                <Card
                  className="col-sm-12 text-dark text-left mt-2 mr-1 pt-2"
                  key={index}
                >
                  <Row>
                    <Col className="col-sm-1">
                      <Image
                        roundedCircle
                        src={
                          !data.picture
                            ? window.location.origin + "/defaultUser.png"
                            : data.picture
                        }
                      />
                    </Col>
                    <Col className="col-sm-10 ml-2">
                      <Card.Title className="mb-1">{data.name}</Card.Title>

                      <Card.Text className="mt-0 mb-1">
                        {data.professionalHeadline}
                      </Card.Text>
                      <Card.Text className="pl-0 mb-0 col-12 location">
                        {data.locationName}
                      </Card.Text>
                    </Col>
                  </Row>
                  <Row className="chips pl-3">
                    {data.skills.map((skills, index) => (
                      <span key={index}>{skills.name}</span>
                    ))}
                  </Row>
                  <Row className="card__interests pl-3 mt-3 mb-2">
                    {data.openTo ? <span>Abierto a:</span> : ""}
                    <ul>
                      {data.openTo
                        ? data.openTo.map((openTo, index) => (
                            <li key={index}>
                              <span>
                                {openTo === "freelance-gigs"
                                  ? "Trabajos temporales/freelance"
                                  : openTo === "full-time-employment"
                                  ? "Empleo"
                                  : ""}
                              </span>
                            </li>
                          ))
                        : ""}
                    </ul>
                  </Row>
                  <Button
                    className="btn float-right btn-torre mb-2"
                    onClick={(e) => show_moreInfo(e, data.username)}
                  >
                    Mas info
                  </Button>
                </Card>
              ))
            : type === "job"
            ? state.map((value, index) => (
                <Card
                  className="col-sm-12 text-dark text-left mt-2 mr-1 pt-2"
                  key={index}
                >
                  <Row>
                    <Col className="col-sm-1">
                      <Image
                        roundedCircle
                        src={
                          !value.organizations[0].picture
                            ? window.location.origin + "/defaultUser.png"
                            : value.organizations[0].picture
                        }
                      />
                    </Col>
                    <Col className="col-sm-10 ml-2">
                      <Card.Title className="mb-1">
                        {value.organizations[0].name}
                      </Card.Title>

                      <Card.Text className="mt-0 mb-1">
                        {value.objective}
                      </Card.Text>
                      <Card.Text className="pl-0 mb-0 col-12 location">
                        {value.remote
                          ? value.locations[0]
                            ? "Remoto - " + value.locations[0]
                            : "Remoto"
                          : value.locations[0]}
                      </Card.Text>
                      <Card.Text className="mt-0 mb-1">
                        {value.compensation
                          ? value.compensation.data.code === "range"
                            ? value.compensation.data.currency +
                              " " +
                              value.compensation.data.minAmount +
                              " - " +
                              value.compensation.data.maxAmount +
                              " " +
                              value.compensation.data.periodicity
                            : value.compensation.data.currency +
                              " " +
                              value.compensation.data.minAmount +
                              " " +
                              value.compensation.data.periodicity
                          : ""}
                      </Card.Text>
                    </Col>
                  </Row>
                  <Row className="chips pl-3">
                    {value.skills.map((skills, index) => (
                      <span key={index}>{skills.name}</span>
                    ))}
                  </Row>
                  <Row className="card__interests pl-3 mt-3 mb-2">
                    {value.openTo ? <span>Abierto a:</span> : ""}
                    <ul>
                      {value.openTo
                        ? value.openTo.map((openTo, index) => (
                            <li key={index}>
                              <span>
                                {openTo === "freelance-gigs"
                                  ? "Trabajos temporales/freelance"
                                  : openTo === "full-time-employment"
                                  ? "Empleo"
                                  : ""}
                              </span>
                            </li>
                          ))
                        : ""}
                    </ul>
                  </Row>
                  <div className="float-right mb-2">
                    <Button
                      className="btn btn-torre "
                      onClick={(e) => show_moreInfo(e, value.id)}
                    >
                      Mas info
                    </Button>
                  </div>
                </Card>
              ))
            : ""}
        </article>
      </main>
      <Modal
        show={show}
        size="lg"
        onHide={handleShow}
        backdrop="static"
        keyboard={false}
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Mas información sobre
            {$.isEmptyObject(info)
              ? ""
              : type === "job"
              ? " " + info.organizations[0].name
              : " " + info.person.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {$.isEmptyObject(info) ? (
            ""
          ) : type === "job" ? (
            <div>
              <h4>{info.objective}</h4>
              <p>
                {info.place.remote
                  ? "Remoto - " + info.place.location[0].id
                  : info.place.location[0].id
                  ? info.place.location[0].id
                  : ""}
              </p>
              <p>{"Compensation: " + info.compensation.code}</p>
              {info.details.map((value, index) => (
                <div key={index}>
                  <h5>{value.code}</h5>
                  <p>{value.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h4>{info.person.professionalHeadline}</h4>
              <h5>Sumary</h5>
              <p>{info.person.summaryOfBio}</p>
              <h5>Experiences</h5>
              {info.experiences.map((value, index) => (
                <div key={index}>
                  <h6>{value.category + " - " + value.name}</h6>
                  <p>{value.responsibilities[0]}</p>
                </div>
              ))}
              <h5>Education</h5>
              {info.education.map((value, index) => (
                <div key={index}>
                  <h6>
                    {value.name +
                      " - " +
                      value.fromMonth +
                      "/" +
                      value.fromYear}
                  </h6>
                  <p>{value.organizations[0].name}</p>
                </div>
              ))}
              <h5>Languages</h5>
              {info.languages.map((value, index) => (
                <div key={index}>
                  <h6>{value.language + " - " + value.fluency}</h6>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
