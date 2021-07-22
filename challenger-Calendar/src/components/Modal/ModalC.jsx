import React, { useState } from "react";
import moment from "moment";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { GithubPicker } from "react-color";
import "react-datepicker/dist/react-datepicker.css";

function ReminderModal(props) {
  const API_KEY = "719c57517d2b1db16229d727f45763ac"
  const [title, changeTitle] = useState(props.toEdit.title)
  const [color, changeColor] = useState(props.toEdit.color)
  const [selectedCity, setSelectedCity] = useState(props.toEdit.city)
  // eslint-disable-next-line
  const [reminderTime, setTime] = useState(props.toEdit.time)

  const city = [
    { id: 4164138, name: "Brasilia" },
    { id: 3600949, name: "São Paulo" },
    { id: 3117735, name: "Rio de Janeiro" },
    { id: 5134295, name: "Goiania" },
    { id: 3688689, name: "Olinda" },
  ]

  const updateInputValue = (evt) => {
    changeTitle(evt.target.value)
  }

  const handleChangeComplete = (color) => {
    changeColor(color.hex)
  }
  const handleDropDownChange = (e) => {
    setSelectedCity(e.target.value)
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?id=${e.target.value}&appid=${API_KEY}`
    )
      .then((res) => res.json())

  }

  const toDay = () => {
    if (props.toEdit !== 0) {
      props.editReminder(title, color, reminderTime, selectedCity)
    } else {
      props.newReminder(title, color, reminderTime, selectedCity, props.day)
    }
    props.closeModal()
  }

  let optionCities = city.map((city) => (
    <option value={city.id} key={`modal-${city.id}`}>
      {city.name}
    </option>
  ))
  return (
    <>
      <Modal
        show={props.show}
        onHide={() => {
          props.closeModal()
          props.noEdition()
        }}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title ? title : "Novo Lembrete"}</Modal.Title>
        </Modal.Header>
        {props.toEdit !== 0 ? (
            <>
              <Row>               
                <Col className="colDelete">
                  <Button onClick={()=>props.deleteReminder(2)} className="delete">Excluir</Button>
                </Col>
              </Row>
            </>
          ) : (
            <></>
          )}
        <Modal.Body>
          <p>{moment(props.day).format("MMMM DD YYYY")}</p>
          
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Titulo do Lembrete:
              </span>
            </div>
            <input
              value={title ? title : ""}
              onChange={updateInputValue}
              type="text"
              className="form-control"
              aria-describedby="basic-addon1"
              maxLength="30"
            />
          </div>
          <p>Selecione a Cidade:</p>
          <select onChange={handleDropDownChange}>{optionCities}</select>         
          <p>Selecione a Cor:</p>
          <GithubPicker color={color} onChangeComplete={handleChangeComplete} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              props.closeModal()
              props.noEdition()
            }}
          >
            Fechar
          </Button>
          <Button variant="primary" onClick={toDay}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ReminderModal
