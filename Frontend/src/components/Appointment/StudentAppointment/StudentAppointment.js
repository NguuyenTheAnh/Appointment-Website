import React, { useEffect, useState } from 'react';
import StudentSidebar from './StudentSidebar';
import { getStudentAppointmentsPending } from '../../../services/apiStudent';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const StudentAppointment = () => {
    const [listAppointments, setListAppointments] = useState();
    const [detailInfo, setDetailInfo] = useState();

    //modal detail
    const [showDetail, setShowDetail] = useState(false);
    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = () => setShowDetail(true);

    const fetchDataBooked = async () => {
        const { data } = await getStudentAppointmentsPending();
        setListAppointments(data.data);
    }
    useEffect(() => {
        fetchDataBooked();
    }, []);

    return (
        <div className='appointment-student'>
            <div className='appointment-sidebar'>
                <StudentSidebar
                    setListAppointments={setListAppointments}
                />
            </div>
            <div className='appointment-content'>
                <div className='appointment-header'>
                    <p>My Appointments</p>
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
                                                    <p><span>Department: </span>{item.department_name}</p>
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
                                                                    <p><span className='point-detail'>Department: </span>{detailInfo.department_name}</p>
                                                                    <p><span className='point-detail'>Email: </span>{detailInfo.email}</p>
                                                                    <p><span className='point-detail'>Phone: </span>{detailInfo.phone}</p>
                                                                    <p>
                                                                        <span className='point-detail'>Date: </span>
                                                                        {detailInfo.date.substr(8, 2) + '-' + detailInfo.date.substr(5, 2) + '-' + detailInfo.date.substr(0, 4)}
                                                                    </p>
                                                                    <p><span className='point-detail'>Day: </span>{detailInfo.day}</p>
                                                                    <p><span className='point-detail'>At: </span>{detailInfo.start_time}</p>
                                                                    <p
                                                                        className={detailInfo.status == "Pending" ? 'pending' : (item.status == "Accepted" ? 'accepted' : 'declined')}
                                                                    >
                                                                        <span className='point-detail'>Status: </span>
                                                                        <span className='status'>{detailInfo.status}</span>
                                                                    </p>
                                                                    {
                                                                        detailInfo.status == "Pending"
                                                                            ?
                                                                            <p>
                                                                                <span className='point-detail'>My note: </span>
                                                                                {detailInfo.note_student}
                                                                            </p>
                                                                            :
                                                                            <p>
                                                                                <span className='point-detail'>Teacher's note: </span>
                                                                                {detailInfo.note_teacher ? detailInfo.note_teacher : `Don't have any notation`}
                                                                            </p>
                                                                    }

                                                                </>}
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Button variant="secondary" onClick={handleCloseDetail}>
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
        </div>
    );
};

export default StudentAppointment;