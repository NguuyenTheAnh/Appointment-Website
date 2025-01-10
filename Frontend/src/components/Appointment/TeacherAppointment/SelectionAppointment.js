import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { changeStatusOfAppointment, getAllTeacherAppointments, getTeacherAppointmentsByStatus } from '../../../services/apiTeacher';
import { toast } from 'react-toastify';

const SelectionAppointment = () => {

    const [listAppointments, setListAppointments] = useState();
    const [detailInfo, setDetailInfo] = useState();
    const [noteTeacher, setNoteTeacher] = useState('');
    const [status, setStatus] = useState('');
    const [appointmentId, setAppointmentId] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    //modal detail
    const [showDetail, setShowDetail] = useState(false);
    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = () => setShowDetail(true);

    //modal accept
    const [showAccept, setShowAccept] = useState(false);
    const handleCloseAccept = () => setShowAccept(false);
    const handleShowAccept = () => setShowAccept(true);

    //modal decline
    const [showDecline, setShowDecline] = useState(false);
    const handleCloseDecline = () => setShowDecline(false);
    const handleShowDecline = () => setShowDecline(true);

    const fetchDataAllAppointments = async () => {
        const { data } = await getAllTeacherAppointments();
        setListAppointments(data.data);
    }
    const fetchDataAppointmentsByStatus = async () => {
        if (filterStatus != "All") {
            console.log(filterStatus);
            const { data } = await getTeacherAppointmentsByStatus(filterStatus);
            console.log(data);
            setListAppointments(data.data);
        }
        else {
            await fetchDataAllAppointments();
        }
    }
    useEffect(() => {
        fetchDataAllAppointments();
    }, []);

    useEffect(() => {
        fetchDataAppointmentsByStatus();
    }, [filterStatus])

    const handleAcceptConfirm = async () => {
        // call api
        const { data } = await changeStatusOfAppointment(appointmentId, status, noteTeacher);
        if (data.errorCount == 0) {
            toast.success(data.message);
            await fetchDataAllAppointments();
            //reset
            handleCloseAccept();
            setAppointmentId('');
            setNoteTeacher('');
            setStatus('');
        }
        else toast.error(data.message);
    }

    const handleDeclineConfirm = async () => {
        // call api
        const { data } = await changeStatusOfAppointment(appointmentId, status, noteTeacher);
        if (data.errorCount == 0) {
            toast.success(data.message);
            await fetchDataAllAppointments();
            //reset
            handleCloseDecline();
            setAppointmentId('');
            setNoteTeacher('');
            setStatus('');
        }
        else toast.error(data.message);
    }

    return (
        <div className='appointment-content-appointment'>
            <div className='appointment-header'>
                <p>My Appointments</p>
                <div className='dd-toggle'>
                    <DropdownButton id="dropdown-basic-button" title="Filter by ">
                        <Dropdown.Item onClick={() => setFilterStatus("All")}>All</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilterStatus("Pending")}>Pending</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilterStatus("Accepted")}>Accepted</Dropdown.Item>
                        <Dropdown.Item onClick={() => setFilterStatus("Declined")}>Declined</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
            <div className='appointment-body'>
                <div className='content'>
                    {
                        listAppointments &&
                        <>
                            {
                                listAppointments.map((item, index) => {
                                    return (
                                        <div key={index} className='info'>
                                            <div className='avt'>
                                                <img src={item.image} />
                                            </div>
                                            <div className='detail'>
                                                <p className='teacher-name'>{item.name}</p>
                                                <div className='date-detail'>
                                                    <p>
                                                        <span>Date: </span>
                                                        {item.date.substr(8, 2) + '-' + item.date.substr(5, 2) + '-' + item.date.substr(0, 4)}
                                                    </p>
                                                    <p><span>Day: </span>{item.day}</p>
                                                </div>
                                                <p><span>At: </span>{item.start_time}</p>
                                                <p
                                                    className={item.status == "Pending" ? 'pending' : (item.status == "Accepted" ? 'accepted' : 'declined')}
                                                >
                                                    <span>Status: </span>
                                                    <span className='status'>{item.status}</span>
                                                </p>
                                            </div>
                                            <div className='info-button'>
                                                <Button variant="light"
                                                    onClick={() => {
                                                        handleShowDetail();
                                                        setDetailInfo(item);
                                                    }}>
                                                    Detail
                                                </Button>

                                                {/* modal watch detail */}
                                                <Modal show={showDetail} onHide={handleCloseDetail}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Information Detail</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        {detailInfo &&
                                                            <>
                                                                <p className='teacher-name'><span className='point-detail'>Teacher: </span>{detailInfo.name}</p>
                                                                <p><span className='point-detail'>Email: </span>{detailInfo.email}</p>
                                                                <p><span className='point-detail'>Phone: </span>{detailInfo.phone}</p>
                                                                <p>
                                                                    <span className='point-detail'>Date: </span>
                                                                    {detailInfo.date.substr(8, 2) + '-' + detailInfo.date.substr(5, 2) + '-' + detailInfo.date.substr(0, 4)}
                                                                </p>
                                                                <p><span className='point-detail'>Day: </span>{detailInfo.day}</p>
                                                                <p><span className='point-detail'>At: </span>{detailInfo.start_time}</p>
                                                                <p
                                                                    className={detailInfo.status == "Pending" ? 'pending' : (detailInfo.status == "Accepted" ? 'accepted' : 'declined')}
                                                                >
                                                                    <span className='point-detail'>Status: </span>
                                                                    <span className='status'>{detailInfo.status}</span>
                                                                </p>
                                                                {
                                                                    detailInfo.status == "Pending"
                                                                        ?
                                                                        <p>
                                                                            <span className='point-detail'>Student's note: </span>
                                                                            {detailInfo.note_student ? detailInfo.note_student : `Don't have any notation`}
                                                                        </p>
                                                                        :
                                                                        <p>
                                                                            <span className='point-detail'>My note: </span>
                                                                            {detailInfo.note_teacher ? detailInfo.note_teacher : `Don't have any notation`}
                                                                        </p>
                                                                }

                                                            </>}
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        {
                                                            detailInfo &&
                                                            <>
                                                                {
                                                                    detailInfo.status == "Pending"
                                                                        ?
                                                                        <>
                                                                            <Button variant="secondary" className='accept-btn'
                                                                                onClick={() => {
                                                                                    handleShowAccept();
                                                                                    handleCloseDetail();
                                                                                    setAppointmentId(detailInfo.appointment_id);
                                                                                    setStatus("Accepted");
                                                                                }}
                                                                            >
                                                                                Accept
                                                                            </Button>
                                                                            <Button variant="secondary" className='decline-btn'
                                                                                onClick={() => {
                                                                                    handleShowDecline();
                                                                                    handleCloseDetail();
                                                                                    setAppointmentId(detailInfo.appointment_id);
                                                                                    setStatus("Declined");
                                                                                }}
                                                                            >
                                                                                Decline
                                                                            </Button>
                                                                            <Button variant="secondary" onClick={handleCloseDetail}>
                                                                                Close
                                                                            </Button>
                                                                        </>
                                                                        :
                                                                        <Button variant="secondary" onClick={handleCloseDetail}>
                                                                            Close
                                                                        </Button>
                                                                }
                                                            </>
                                                        }
                                                    </Modal.Footer>
                                                </Modal>

                                                {/* modal accept */}
                                                <Modal show={showAccept} onHide={() => {
                                                    handleCloseAccept();
                                                    setAppointmentId('');
                                                    setNoteTeacher('');
                                                    setStatus('');
                                                }}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Confirmation</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <p className='confirmation'> Are you sure you accept this appointment?</p>
                                                        <p className='point-detail'>Note</p>
                                                        <textarea type='text' value={noteTeacher}
                                                            className='note-teacher-confirmation'
                                                            placeholder='If you want to leave a note'
                                                            onChange={(event) => setNoteTeacher(event.target.value)}
                                                        />
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" className='accept-btn' onClick={handleAcceptConfirm}>
                                                            Accept
                                                        </Button>
                                                        <Button variant="secondary" onClick={() => {
                                                            handleCloseAccept();
                                                            setAppointmentId('');
                                                            setNoteTeacher('');
                                                            setStatus('');
                                                        }}>
                                                            Close
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>

                                                {/* modal decline */}
                                                <Modal show={showDecline} onHide={() => {
                                                    handleCloseDecline();
                                                    setAppointmentId('');
                                                    setNoteTeacher('');
                                                    setStatus('');
                                                }}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Confirmation</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <p className='confirmation'> Are you sure you decline this appointment?</p>
                                                        <p className='point-detail'>Note</p>
                                                        <textarea type='text' value={noteTeacher}
                                                            className='note-teacher-confirmation'
                                                            placeholder='If you want to leave a note'
                                                            onChange={(event) => setNoteTeacher(event.target.value)}
                                                        />
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" className='decline-btn' onClick={handleDeclineConfirm}>
                                                            Decline
                                                        </Button>
                                                        <Button variant="secondary" onClick={() => {
                                                            handleCloseDecline();
                                                            setAppointmentId('');
                                                            setNoteTeacher('');
                                                            setStatus('');
                                                        }}>
                                                            Close
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>

                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default SelectionAppointment;