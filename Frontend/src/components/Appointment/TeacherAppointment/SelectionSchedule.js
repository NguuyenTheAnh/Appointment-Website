import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { getTeacherSchedule } from '../../../services/apiStudent';

const SelectionSchedule = () => {

    const account = useSelector((state) => state.user.account);
    const [day, setDay] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [listTimeOfDate, setListTimeOfDate] = useState();

    //add new schedule
    const [newHour, setNewHour] = useState('');
    const [newMinute, setNewMinute] = useState('');
    const [newSecond, setNewSecond] = useState('');
    const [nextWeek, setNextWeek] = useState();

    //update schedule
    const [updateHour, setUpdateHour] = useState('');
    const [updateMinute, setUpdateMinute] = useState('');
    const [updateSecond, setUpdateSecond] = useState('');

    //modal add free time
    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    //modal update
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    //modal delete
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    const fetchDataSchedule = async () => {
        const data = await getTeacherSchedule(account.id);
        setNextWeek(data.data);
    }

    useEffect(() => {
        fetchDataSchedule();
    }, []);

    return (
        <div className='appointment-content-schedule'>
            <div className='appointment-header'>
                <p>Next week</p>
            </div>
            <div className='appointment-body'>
                {nextWeek &&
                    <div className='schedule'>
                        <div className='calendar'>
                            <div className='calendar-title'>
                                <span>Calendar</span>
                            </div>
                            <div className='calendar-content'>
                                <div className={day == 'MON' ? 'day active MON' : 'day MON'}
                                    onClick={() => {
                                        setTime('');
                                        setListTimeOfDate(nextWeek[0].listStartTime);
                                        setDay(nextWeek[0].dayName);
                                        setDate(nextWeek[0].date);
                                    }}
                                >
                                    <span>MON</span>
                                    <p>{nextWeek[0].date.substr(8, 2)}</p>
                                </div>
                                <div className={day == 'TUE' ? 'day active TUE' : 'day TUE'}
                                    onClick={() => {
                                        setTime('');
                                        setListTimeOfDate(nextWeek[1].listStartTime);
                                        setDay(nextWeek[1].dayName);
                                        setDate(nextWeek[1].date);
                                    }}
                                >
                                    <span>TUE</span>
                                    <p>{nextWeek[1].date.substr(8, 2)}</p>
                                </div>
                                <div className={day == 'WED' ? 'day active WED' : 'day WED'}
                                    onClick={() => {
                                        setTime('');
                                        setListTimeOfDate(nextWeek[2].listStartTime);
                                        setDay(nextWeek[2].dayName);
                                        setDate(nextWeek[2].date);
                                    }}
                                >
                                    <span>WED</span>
                                    <p>{nextWeek[2].date.substr(8, 2)}</p>
                                </div>
                                <div className={day == 'THU' ? 'day active THU' : 'day THU'}
                                    onClick={() => {
                                        setTime('');
                                        setListTimeOfDate(nextWeek[3].listStartTime);
                                        setDay(nextWeek[3].dayName);
                                        setDate(nextWeek[3].date);
                                    }}
                                >
                                    <span>THU</span>
                                    <p>{nextWeek[3].date.substr(8, 2)}</p>
                                </div>
                                <div className={day == 'FRI' ? 'day active FRI' : 'day FRI'}
                                    onClick={() => {
                                        setTime('');
                                        setListTimeOfDate(nextWeek[4].listStartTime);
                                        setDay(nextWeek[4].dayName);
                                        setDate(nextWeek[4].date);
                                    }}
                                >
                                    <span>FRI</span>
                                    <p>{nextWeek[4].date.substr(8, 2)}</p>
                                </div>
                                <div className={day == 'SAT' ? 'day active SAT' : 'day SAT'}
                                    onClick={() => {
                                        setTime('');
                                        setListTimeOfDate(nextWeek[5].listStartTime);
                                        setDay(nextWeek[5].dayName);
                                        setDate(nextWeek[5].date);
                                    }}
                                >
                                    <span>SAT</span>
                                    <p>{nextWeek[5].date.substr(8, 2)}</p>
                                </div>
                                <div className={day == 'SUN' ? 'day active SUN' : 'day SUN'}
                                    onClick={() => {
                                        setTime('');
                                        setListTimeOfDate(nextWeek[6].listStartTime);
                                        setDay(nextWeek[6].dayName);
                                        setDate(nextWeek[6].date);
                                    }}
                                >
                                    <span>SUN</span>
                                    <p>{nextWeek[6].date.substr(8, 2)}</p>
                                </div>
                            </div>
                        </div>
                        <div className='time'>
                            <div className='time-title'>
                                <span>Time</span>
                            </div>
                            <div className='time-content'>
                                {listTimeOfDate
                                    ?
                                    <>
                                        <div className='list-free-time'>
                                            {listTimeOfDate.length !== 0
                                                ?
                                                listTimeOfDate.map((timeOfDate, index) => {
                                                    return (
                                                        <span key={index}
                                                            onClick={() => (
                                                                setTime(timeOfDate)
                                                            )}
                                                            className={time == timeOfDate ? 'active' : ''}
                                                        >{timeOfDate}</span>
                                                    );
                                                })
                                                :
                                                <p className='not-have-free-time'>Not schedule yet</p>
                                            }
                                        </div>
                                        <div className='add-free-time'>
                                            <>
                                                <Button variant="primary" className='btn-add' onClick={handleShowAdd}>
                                                    Add
                                                </Button>
                                                <Button variant="primary"
                                                    className={time ? 'btn-update-delete can-press' : 'btn-update-delete'}
                                                    onClick={() => {
                                                        if (time) handleShowUpdate();
                                                    }}
                                                >
                                                    Update
                                                </Button>
                                                <Button variant="primary"
                                                    className={time ? 'btn-update-delete can-press' : 'btn-update-delete'}
                                                    onClick={() => {
                                                        if (time) handleShowDelete();
                                                    }}
                                                >
                                                    Delete
                                                </Button>

                                                {/* modal add free time */}
                                                <Modal show={showAdd}
                                                    onHide={() => {
                                                        handleCloseAdd();
                                                        setNewHour('');
                                                        setNewMinute('');
                                                        setNewSecond('');
                                                    }}
                                                >
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
                                                                    value={newHour}
                                                                    onChange={(event) => setNewHour(event.target.value)}
                                                                    autoFocus
                                                                />
                                                            </Form.Group>
                                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                                                <Form.Label>Minute</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="From 00 to 60"
                                                                    value={newMinute}
                                                                    onChange={(event) => setNewMinute(event.target.value)}
                                                                />
                                                            </Form.Group>
                                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                                                <Form.Label>Second</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="From 00 to 60"
                                                                    value={newSecond}
                                                                    onChange={(event) => setNewSecond(event.target.value)}
                                                                />
                                                            </Form.Group>
                                                        </Form>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary"
                                                            onClick={() => {
                                                                handleCloseAdd();
                                                                setNewHour('');
                                                                setNewMinute('');
                                                                setNewSecond('');
                                                            }}
                                                        >
                                                            Close
                                                        </Button>
                                                        <Button variant="primary"
                                                            onClick={() => {
                                                                handleCloseAdd();
                                                                setNewHour('');
                                                                setNewMinute('');
                                                                setNewSecond('');
                                                            }}
                                                        >
                                                            Save
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>

                                                {/* modal update free time */}
                                                <Modal show={showUpdate}
                                                    onHide={() => {
                                                        handleCloseUpdate();
                                                        setUpdateHour('');
                                                        setUpdateMinute('');
                                                        setUpdateSecond('');
                                                    }}
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Update time</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <div className='time-curr'>
                                                            <span className='time-curr-title'>Current time:</span>
                                                            <span className='time-curr-content'>{time}</span>
                                                        </div>
                                                        <div className='time-update'>
                                                            <span className='time-update-title'>Update time</span>
                                                            <div className='time-update-content'>
                                                                <input type='text' placeholder='HH' autoFocus
                                                                    value={updateHour}
                                                                    onChange={(event) => setUpdateHour(event.target.value)}
                                                                />
                                                                <span>:</span>
                                                                <input type='text' placeholder='MM'
                                                                    value={updateMinute}
                                                                    onChange={(event) => setUpdateMinute(event.target.value)}
                                                                />
                                                                <span>:</span>
                                                                <input type='text' placeholder='SS'
                                                                    value={updateSecond}
                                                                    onChange={(event) => setUpdateSecond(event.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary"
                                                            onClick={() => {
                                                                handleCloseUpdate();
                                                                setUpdateHour('');
                                                                setUpdateMinute('');
                                                                setUpdateSecond('');
                                                            }}
                                                        >
                                                            Close
                                                        </Button>
                                                        <Button variant="primary"
                                                            onClick={() => {
                                                                handleCloseUpdate();
                                                                setUpdateHour('');
                                                                setUpdateMinute('');
                                                                setUpdateSecond('');
                                                            }}
                                                        >
                                                            Save Changes
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>

                                                {/* modal delete free time */}
                                                <Modal show={showDelete} onHide={handleCloseDelete}>
                                                    <Modal.Header className='delete-time-title' closeButton>
                                                        <Modal.Title >Delete time</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>Are you sure?</Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleCloseDelete}>
                                                            Cancel
                                                        </Button>
                                                        <Button variant="primary" onClick={handleCloseDelete}>
                                                            Delete
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </>
                                        </div>
                                    </>
                                    :
                                    <p className='not-select-date'>Select a date</p>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default SelectionSchedule;