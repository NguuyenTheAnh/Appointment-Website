import React, { useState } from 'react';
import TeacherSidebar from './TeacherSidebar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const TeacherAppointment = () => {

    const [day, setDay] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [second, setSecond] = useState('');

    const [showSchedule, setShowSchedule] = useState(false);
    const [showAppointment, setShowAppointment] = useState(true);

    //modal add free time
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div className='appointment-teacher'>
            <div className='appointment-sidebar'>
                <TeacherSidebar setShowAppointment={setShowAppointment} setShowSchedule={setShowSchedule} />
            </div>
            <>
                {
                    showAppointment &&
                    <div className='appointment-content-appointment'>

                    </div>
                }
            </>
            <>
                {showSchedule &&
                    <div className='appointment-content-schedule'>
                        <div className='appointment-header'>
                            <p>Next week</p>
                        </div>
                        <div className='appointment-body'>
                            <div className='schedule'>
                                <div className='calendar'>
                                    <div className='calendar-title'>
                                        <span>Calendar</span>
                                    </div>
                                    <div className='calendar-content'>
                                        <div className={day == 'MON' ? 'day active MON' : 'day MON'} onClick={() => setDay('MON')}>
                                            <span>MON</span>
                                            <p>1</p>
                                        </div>
                                        <div className={day == 'TUE' ? 'day active TUE' : 'day TUE'} onClick={() => setDay('TUE')}>
                                            <span>TUE</span>
                                            <p>1</p>
                                        </div>
                                        <div className={day == 'WED' ? 'day active WED' : 'day WED'} onClick={() => setDay('WED')}>
                                            <span>WED</span>
                                            <p>1</p>
                                        </div>
                                        <div className={day == 'THU' ? 'day active THU' : 'day THU'} onClick={() => setDay('THU')}>
                                            <span>THU</span>
                                            <p>1</p>
                                        </div>
                                        <div className={day == 'FRI' ? 'day active FRI' : 'day FRI'} onClick={() => setDay('FRI')}>
                                            <span>FRI</span>
                                            <p>1</p>
                                        </div>
                                        <div className={day == 'SAT' ? 'day active SAT' : 'day SAT'} onClick={() => setDay('SAT')}>
                                            <span>SAT</span>
                                            <p>1</p>
                                        </div>
                                        <div className={day == 'SUN' ? 'day active SUN' : 'day SUN'} onClick={() => setDay('SUN')}>
                                            <span>SUN</span>
                                            <p>1</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='time'>
                                    <div className='time-title'>
                                        <span>Time</span>
                                    </div>
                                    <div className='time-content'>
                                        <div className='list-free-time'></div>
                                        <div className='add-free-time'>
                                            <Button variant="primary" onClick={handleShow}>
                                                Add a free time
                                            </Button>

                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Free time information</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Form>
                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                            <Form.Label>Hour</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="From 7am to 22pm"
                                                                value={hour}
                                                                onChange={(event) => setHour(event.target.value)}
                                                                autoFocus
                                                            />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                                            <Form.Label>Minute</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="From 00 to 60"
                                                                value={minute}
                                                                onChange={(event) => setMinute(event.target.value)}
                                                            />
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                                            <Form.Label>Second</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="From 00 to 60"
                                                                value={second}
                                                                onChange={(event) => setSecond(event.target.value)}
                                                            />
                                                        </Form.Group>
                                                    </Form>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose}>
                                                        Close
                                                    </Button>
                                                    <Button variant="primary" onClick={handleClose}>
                                                        Save
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>
        </div>
    );
};

export default TeacherAppointment;