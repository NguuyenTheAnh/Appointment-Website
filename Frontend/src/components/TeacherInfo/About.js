import React from 'react';

const About = (props) => {
    const { teacherInfo } = props;
    return (
        <div className='about'>
            <h4>{teacherInfo.name}</h4>
            <p>{teacherInfo.department_name}</p>
            <h6>About</h6>
            <p>
                Giáo viên nổi bật với trình độ chuyên môn cao, được đào tạo từ nước ngoài.
                Phong cách giảng dạy nghiêm túc, tận tâm, yêu cầu cao, kết hợp lý thuyết và thực hành, giúp sinh viên phát triển toàn diện.
            </p>
            <h6>Contact</h6>
            <p>
                Phone: {teacherInfo.phone}
                &nbsp; &nbsp; &nbsp; &nbsp;
                Address: {teacherInfo.address}
            </p>
        </div>
    );
};

export default About;