import Pagination from 'react-bootstrap/Pagination';

const Paginate = (props) => {
    const { pages, pageCurr, setPageCurr } = props;
    return (
        <Pagination className='paginate'>
            {pages.map((page) =>
                <Pagination.Item key={page} active={page === pageCurr} onClick={() => { setPageCurr(page) }} >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
};

export default Paginate;