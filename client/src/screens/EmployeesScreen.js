import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Form,
  Button,
  Container,
  Card,
  Badge,
} from 'react-bootstrap';
import {
  addEmployees,
  deleteEmployeesInfo,
  findEmployeesById,
  getEmployeesInfo,
  updateEmployeesInfo,
} from '../actions/employeesAction';

const EmployeesScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [species, setSpecies] = useState(true);
  const [chooseButton, setChooseButton] = useState(null);

  const dispatch = useDispatch();

  const { employeesInfo, editEmployee } = useSelector(
    (state) => state.getEmployees
  );
  const reverseInfo = useMemo(
    () => employeesInfo && employeesInfo.reverse(),
    [employeesInfo]
  );
  useEffect(() => {
    dispatch(getEmployeesInfo());
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addEmployees(name, email, phone, species));
    setName('');
    setEmail('');
    setPhone('');
    setSpecies('');
  };

  const updateEmployeesHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateEmployeesInfo(editEmployee._id, name, email, phone, species)
    );
    setName('');
    setEmail('');
    setPhone('');
    setSpecies(false);
    setChooseButton(null);
  };

  const deleteHandler = (id) => {
    dispatch(deleteEmployeesInfo(id));
    setName('');
    setEmail('');
    setPhone('');
    setSpecies(false);
  };

  const EditForm = (id) => {
    dispatch(findEmployeesById(id));
    let willUpdateEmployees = employeesInfo.find((info) => info._id === id);
    setChooseButton(willUpdateEmployees);
    setName(willUpdateEmployees.name);
    setEmail(willUpdateEmployees.email);
    setPhone(willUpdateEmployees.phone);
    setSpecies(willUpdateEmployees.species);
  };

  return (
    <Container>
      <Row className="justify-content-md-center py-4">
        <Col xs={12} md={12}>
          <Row>
            {chooseButton ? (
              <Col className="py-2 px-4" md={6}>
                <h3 className="pb-3">Add Employees</h3>
                <Form onSubmit={updateEmployeesHandler}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="string"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Row>
                      <Col>
                        <div>
                          <Form.Check
                            name="species"
                            inline
                            type="radio"
                            id="Insured"
                            label="Insured"
                            value="Insured"
                            onChange={(e) => setSpecies(e.target.value)}
                          />

                          <Form.Check
                            name="species"
                            inline
                            type="radio"
                            id="Contractual"
                            label="Contractual"
                            value="Contractual"
                            onChange={(e) => setSpecies(e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Update
                  </Button>
                </Form>
              </Col>
            ) : (
              <Col className="py-2 px-4" md={6}>
                <h3 className="pb-3">Add Employees</h3>
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="string"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Row>
                      <Col>
                        <div>
                          <Form.Check
                            name="species"
                            inline
                            type="radio"
                            id="Insured"
                            label="Insured"
                            value="Insured"
                            onChange={(e) => setSpecies(e.target.value)}
                          />

                          <Form.Check
                            name="species"
                            inline
                            type="radio"
                            id="Contractual"
                            label="Contractual"
                            value="Contractual"
                            onChange={(e) => setSpecies(e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Col>
            )}

            <Col className="py-2 px-4" md={6}>
              <h3 className="pb-3">Employees Informations</h3>
              {reverseInfo && reverseInfo.length > 0 ? (
                reverseInfo.map((singleEmployee) => (
                  <Card key={singleEmployee._id}>
                    <Card.Header as="h5">
                      <Row>
                        <Col>{singleEmployee.name}</Col>
                        <Col md={3} xs={3} className="bg-primary text-center ">
                          <Badge bg="primary">{singleEmployee.species}</Badge>
                        </Col>
                      </Row>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        <i className="fas fa-envelope"></i>{' '}
                        {singleEmployee.email}
                      </Card.Text>
                      <Card.Text>
                        <i className="fas fa-phone-alt"></i>{' '}
                        {singleEmployee.phone}
                      </Card.Text>
                      <Button
                        onClick={() => EditForm(singleEmployee._id)}
                        variant="primary"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteHandler(singleEmployee._id)}
                        className="mx-2"
                        variant="primary"
                      >
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p>No Data</p>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeesScreen;
