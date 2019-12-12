import React from 'react'

const InputField = props => {
  return (
    <div>
      <div className="form-group">
        <label>{props.label}</label>
        <input
          type={props.type}
          name={props.name}
          onChange={props.onChange}
          value={props.value}
          className="form-control" />
      </div>
    </div>
  )
}

export default InputField;
