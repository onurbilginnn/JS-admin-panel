import React from 'react';

const inValidInput = props => (
    <div className="form-group">
    <input className="form-control is-invalid" type="text" id="inputIsInValid" />
    <div className="invalid-feedback">{props.message}</div>
    </div>
)

export default inValidInput;