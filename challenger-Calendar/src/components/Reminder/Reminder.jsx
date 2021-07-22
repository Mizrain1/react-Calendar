import React from "react";
import moment from "moment";
import { Button } from "react-bootstrap";

function DateReminder(props) {
  return (
    <Button
      key={`reminder-${props.dayReminder}`}
      className="reminder"
      style={{ background: props.dayReminder.color }}
      onClick={() => props.toEdit()}
    >
      {moment(props.dayReminder.time).format('LT')}
      {props.dayReminder.title}
    </Button>
  )
}

export default DateReminder
