// components
import PageHeader from '@layout/PageHeader';
import AffichageCrud from '@widgets/Admin/AffichageCrud';

const Player = () => {
    return (
        <>
            <PageHeader title="List of Joueurs" />
            <br></br>
            <br></br>

            <AffichageCrud/>
        </>
    )
}

export default Player