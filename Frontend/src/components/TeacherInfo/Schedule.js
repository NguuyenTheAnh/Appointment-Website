import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { bookSchedule, getTeacherSchedule } from '../../services/apiStudent';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';

const Schedule = (props) => {
    const { teacherId, teacherInfo } = props;
    const [bookDate, setBookDate] = useState('');
    const [bookTime, setBookTime] = useState('');
    const [bookNote, setBookNote] = useState('');
    const [teacherSchedules, setTeacherSchedules] = useState();
    const [listDateOfNextWeek, setListDateOfNextWeek] = useState();
    const [listTime, setListTime] = useState();

    //modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        if (!bookTime && !bookDate || bookTime == '') {
            toast.error(`Please choose a teacher's free time`)
        }
        else {
            setShow(true);
        }
    };

    //note
    const handleNote = (event) => {
        setBookNote(event.target.value);
    }

    //next week
    const fetchDataTeacherSchedules = async () => {
        const { data } = await getTeacherSchedule(teacherId);
        let listDates = [];
        data.forEach(element => {
            listDates.push(element.date);
        });
        setListDateOfNextWeek(listDates);
        setTeacherSchedules(data);
    }
    useEffect(() => {
        fetchDataTeacherSchedules();
    }, [])
    const handleClickDay = async (index) => { // 0:MON, 1:TUE,...6:SUN
        const date = listDateOfNextWeek[index];
        setBookDate(date);
        setBookTime('');
        const { data } = await getTeacherSchedule(teacherId);
        const daySelected = data.find((element) => element.date == date);
        setListTime(daySelected.listStartTime);
    }
    const handleClickTime = async (index) => {
        setBookTime(listTime[index]);
    }

    const handleClickBookSchedule = async () => {
        handleClose();
        const { data } = await bookSchedule(teacherId, bookTime, bookDate, bookNote);
        if (data.errorCount == 0) toast.success(data.message);
    }

    return (
        <div className='schedule-nextWeek'>
            <h4 className='header'>Booking Slots</h4>
            <div className='list-day'>
                {teacherSchedules &&
                    teacherSchedules.map((day, index) =>
                        <div key={index} className={listDateOfNextWeek[index] === bookDate ? 'day active' : 'day'}
                            onClick={() => { handleClickDay(index) }}
                        >
                            <p>{day.dayName}</p>
                            <p>{day.date.substr(8, 2) + '/' + day.date.substr(5, 2)}</p>
                        </div>
                    )}
            </div>
            <div className='list-time' >
                {listTime
                    ?
                    (listTime.length != 0
                        ?
                        listTime.map((time, index) =>
                            <div key={index} className={listTime[index] === bookTime ? 'time active' : 'time'}
                                onClick={() => { handleClickTime(index) }}
                            >
                                {time}
                            </div>
                        )
                        : <div className='no-free-time'>No free time.</div>
                    )
                    : <div className='text'>Booking a day for next week.</div>
                }
            </div>
            <Button
                variant="dark"
                className='btn-book'
                onClick={handleShow}
            >Make an appointment</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Please confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3 schedule-info" controlId="exampleForm.ControlInput1">
                            <Form.Label>Schedule's information</Form.Label>
                            <p>You will have a appointment with teacher {teacherInfo.name} <br /> At {bookTime}, {bookDate}</p>
                        </Form.Group>
                        <Form.Group
                            className="mb-3 note"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>If you want to leave a note</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={bookNote}
                                onChange={(event) => handleNote(event)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleClickBookSchedule()}>
                        Book schedule
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Schedule;