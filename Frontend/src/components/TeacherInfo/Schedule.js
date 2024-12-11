import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { getTeacherSchedule } from '../../services/apiStudent';

const Schedule = (props) => {
    const { teacherId } = props;
    const [bookDay, setBookDay] = useState('');
    const [listTime, setListTime] = useState();
    const [bookTime, setBookTime] = useState('');
    const listDay = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    //next week
    const getDayOfNextWeek = () => {
        const today = new Date();
        const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

        const currentDay = today.getDay(); // 0: SUN, 1: MON, ...
        const daysToNextMonday = currentDay === 0 ? 1 : 8 - currentDay;
        const nextMonday = new Date(today);
        nextMonday.setDate(today.getDate() + daysToNextMonday);

        // get Day from MON to SUN
        const weekDays = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(nextMonday);
            day.setDate(nextMonday.getDate() + i);

            weekDays.push({
                dayName: daysOfWeek[i], // Day name
                date: day.getDate() // Date
            });
        }
        return weekDays;
    }
    const nextWeek = getDayOfNextWeek();
    const handleClickDay = async (index) => { // 0:MON, 1:TUE,...6:SUN
        const dayName = listDay[index];
        setBookDay(dayName);
        setBookTime('');
        const { data } = await getTeacherSchedule(teacherId);
        const daySelected = data.find((element) => element.dayName == dayName);
        setListTime(daySelected.listStartTime);
    }
    const handleClickTime = async (index) => {
        setBookTime(listTime[index]);
    }
    return (
        <div className='schedule-nextWeek'>
            <h4 className='header'>Booking Slots</h4>
            <div className='list-day'>
                {nextWeek.map((day, index) =>
                    <div key={index} className={listDay[index] === bookDay ? 'day active' : 'day'}
                        onClick={() => { handleClickDay(index) }}
                    >
                        <p>{day.dayName}</p>
                        <p>{day.date}</p>
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
            <Button variant="dark" className='btn-book'>Make an appointment</Button>
        </div>
    );
};

export default Schedule;