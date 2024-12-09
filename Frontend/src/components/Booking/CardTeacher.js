import Card from 'react-bootstrap/Card';

const CardTeacher = (props) => {
    const { image, name, department } = props;
    return (
        <Card style={{ width: '16rem', height: '23rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {department}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default CardTeacher;