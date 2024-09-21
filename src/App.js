import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function App() {

  const [formValues, setFormValues] = useState({email:"", password:"", favClass:"1"})

  const [validationStates, setValidationStates] = useState({emailState:true, passwordState: true})

  const handleEmailChange = ((e) => {
    setFormValues({...formValues, email: e.target.value})
  });
 
  const handlePasswordChange = ((e) => {

    let algun_numero = false;
    let alguna_letra = false;

    for (const char of e.target.value) {
        if(isNaN(char)){
          algun_numero = true;
        }
        else{
          alguna_letra = true;
        }
    };

    if(e.target.value.length > 8 && algun_numero && alguna_letra){
      setValidationStates({...validationStates, passwordState : true})
    }
    else{
      setValidationStates({...validationStates, passwordState : false})
    }

    setFormValues({...formValues, password: e.target.value})
  });
 
  const handleSelectChange = ((e) => {
    setFormValues({...formValues, favClass: e.target.value})
  });

  const clickSubmit = (() => {
    if(!formValues.email.includes("@")){
      setValidationStates({...validationStates, emailState : false})
    }
    else{
      setValidationStates({...validationStates, emailState : true})

      if(validationStates.passwordState){
        alert(JSON.stringify(formValues));
      }
    }
    
  })



  return (
    <div>
      <h1>Ejemplo de formularios!</h1>
     
      <Form>
      <Form.Group className="mb-6" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} value={formValues.email} style={{border: validationStates.emailState? "": "2px solid red"}}/>
        { !validationStates.emailState && <Form.Text className="text-muted">Your email should follow an established format</Form.Text>}
      </Form.Group>
 
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control style={{border: validationStates.passwordState? "": "2px solid red"}} type="password" placeholder="Password" onChange={handlePasswordChange} value={formValues.password} />
        { !validationStates.passwordState && <Form.Text className="text-muted">Your password should be have numbers and letters and should be at least 9 char long</Form.Text>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Label>Favorite Class</Form.Label>
        <Form.Select onChange={handleSelectChange}>
          <option value="1">ISIS3710</option>
          <option value="2">Programación con tecnologias web</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" onClick={clickSubmit}>
        Submit
      </Button>
    </Form>
    </div>
  );
}

export default App;