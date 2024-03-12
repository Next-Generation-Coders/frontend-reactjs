import PageHeader from '@layout/PageHeader';
import Error403 from '@components/Error403';

const Unauthorized = () => {
    return (
        <>
            <PageHeader title="Page not found" />
            <Error403/>
        </>
    )
}

export default Unauthorized