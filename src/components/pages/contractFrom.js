import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { formVals } from '../../actions';
class ContactForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    console.log(this.props);
    return (
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label>First Name</label>
          <Field name="firstName" component="input" type="text"/>
        </div>
        <div>
          <label>Last Name</label>
          <Field name="lastName" component="input" type="text"/>
        </div>
        <div>
          <label>Email</label>
          <Field name="email" component="input" type="email"/>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

// Decorate the form component
ContactForm = reduxForm({
  form: 'contact' // a unique name for this form
})(ContactForm);

// You have to connect() to any reducers that you wish to connect to yourself
ContactForm = connect(
  state => ({
    initialValues: state.contractFromVals.data // pull initial values from account reducer
  }),
  { load: formVals }, // bind account loading action creator
)(ContactForm);

function submit(values) {
  console.log(values);
}


export default ContactForm;