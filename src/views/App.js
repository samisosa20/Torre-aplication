import React from "react";
import { Form, Card, Row, Col, Image, Nav } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/App.css";

function App() {
  const [state, setState] = React.useState([]);
  let { type } = useParams();
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && event.target.value.length > 0) {
      //dispatch({ type: "SHOW_RESULT", query: false });
      load_data(event, event.target.value);
    }
  };
  async function load_data(e, data) {
    //console.log(data);
    let dic = {};
    dic["name"] = data;
    console.log(dic);
    await axios.post("http://localhost:5000/api/v1/people", dic).then((res) => {
      console.log("Axios data:");
      console.log(res.data.results);
      setState(res.data.results);
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
            : state.map((data, index) => (
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
                </Card>
              ))}
        </article>
      </main>
    </div>
  );
}

export default App;
