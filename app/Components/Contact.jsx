import React, { Component, PropTypes } from 'react';
import Header from './Header.jsx';
import RichEditor from './RichEditor.jsx';
import Validation from 'react-validation'

export class Contact extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = (event) => {
      event.preventDefault();
      if (this.refs.form.forceValidate(true)) {

      }
    }
  }
  render(){
    return(
      <div>
        <Header />
        <div className="outer-container">
          <div className="content-editor">
            <h1 style={headingStyle}>Want to reach me? Send me a message with the form below!</h1>
            <div style={headingStyle}>
              <h3>
                <label style={emailLabelStyle}>Email:</label>
                <Validation.Form onSubmit={this.onSubmit} ref='form'>
                  <Validation.Input
                    name="email"
                    ref="email"
                    validations={[
                      {
                        rule: 'isRequired',
                      },
                      {
                        rule: 'isEmail',
                      }
                    ]}
                  />
                </Validation.Form>
              </h3>
            </div>
            <RichEditor 
            />
          </div>
        </div>
      </div>
    )
  }
}

const headingStyle = {
  backgroundColor: "white",
  padding: "1em",
  marginBottom: "1em",
  border: "1px solid #ddd",
}

const emailLabelStyle = {
  marginRight: "1em",
  letterSpacint: "1px",
}
