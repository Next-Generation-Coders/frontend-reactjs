// utils

// constants
import logo from "../placeholder.png";

const ClubInfoTeam1 = ({ team1 }) => {

    return (
        <div className=" info d-flex align-items-center g-20">
            <img className="club-logo" src={ team1?.logo} alt={team1?.name}/>
            <div className="main d-flex flex-column">
                <h3>{team1?.name}</h3>
            </div>
        </div>
    )
}



export default ClubInfoTeam1