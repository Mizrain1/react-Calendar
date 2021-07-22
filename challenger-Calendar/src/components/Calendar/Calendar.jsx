import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
import 'moment/locale/pt-br'
import SingleDay from "./Dias";
import "./calendar.css";

const Calendar = () => {
  moment.locale('pt-br')
  // eslint-disable-next-line
  const [currentDate, setCurrentDate] = useState(new Date())
  const [reminders, setReminders] = useState([])

  const header = () => {
    return (     
        <Row className="header">
          <Col>
            <strong>{moment(currentDate).format('LLLL')}</strong>
          </Col>
        </Row>    
    )
  }

  const weekDays = () => {
    const weekDays = moment.weekdays()
    const days = []

    weekDays.forEach((week, index) => {
      days.push(
        <div className="col col-center" key={`skeleton1-${index}`}>
          {week}
        </div>
      )
    })
    return <div className="days row">{days}</div>
  }

  const weekMonth = () => {
    const firstDayMonth = moment(currentDate).startOf("month")
    const lastDayMonth = moment(currentDate).endOf("month")
    const firstDate = moment(firstDayMonth).startOf("week")
    const lastDate = moment(lastDayMonth).endOf("week")
    const row = []

    let days = []
    let day = firstDate
    let dateFormat = ""

    while (day <= lastDate) {
      for (let i = 0; i < 7; i++) {
        dateFormat = moment(day).format("D")
        days.push(
          <SingleDay
            monthDay={firstDayMonth}
            day={day}
            numberDate={dateFormat}
            index={i}
            key={day - i}
            reminders={reminders}
            setReminders={(reminder)=>addNewReminder(reminder)}
          />
        )
        day = moment(day).add(1, "d")
      }
      row.push(<Row key={`skeleton-${day}`}>{days}</Row>)
      days = []
    }
    return <div className="body">{row}</div>
  }
  const addNewReminder = (reminder) =>{
      setReminders(reminder)
  }

  return (
    <div className="calendar">
      <div>{header()}</div>
      <div>{weekDays()}</div>
      <div>{weekMonth()}</div>
    </div>
  )
}

export default Calendar
