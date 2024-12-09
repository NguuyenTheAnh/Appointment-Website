import Pagination from 'react-bootstrap/Pagination';

let active = 2;
let items = [];
for (let number = 1; number <= 5; number++) {
    items.push(
        <Pagination.Item key={number}>
            {number}
        </Pagination.Item>,
    );
}
const Paginate = () => {
    return (
        <Pagination className='paginate'>{items}</Pagination>
    );
};

export default Paginate;