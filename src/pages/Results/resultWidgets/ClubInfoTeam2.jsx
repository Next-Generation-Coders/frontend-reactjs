
import logo from "../placeholder.png";

const ClubInfoTeam2 = ({ team2}) => {

    return (
        <div className=" info d-flex align-items-center g-20">

        <div className="main d-flex flex-column">
            <h3>{team2?.name}</h3>
        </div>
            <img className="club-logo" src= {team2?.logo} alt={team2?.name}/>
    </div>
    )
}


export default ClubInfoTeam2