import React from 'react'

const InputField = props => {
  return (
    <div class="form-group">
      <input className="form-control" 
        type={props.type} 
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder= {props.placeholder}
      />
    </div>
  )
}

export default InputField;
