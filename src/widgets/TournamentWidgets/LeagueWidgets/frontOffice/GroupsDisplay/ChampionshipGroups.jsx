// components
import Spring from '@components/Spring';
import SelectionList from '@ui/SelectionList';

import ScrollContainer from '@components/ScrollContainer';

// hooks
import {useState, useRef, useEffect} from 'react';
import useMeasure from 'react-use-measure';

// constants
import {GROUPS_OPTIONS} from '@constants/selection_options';

// data placeholder
import groups_matches from '@db/groups_matches';
import GroupStandingsDisplay from './GroupStandings';

const ChampionshipGroups = (selectedTournamentId) => {
    const [ref, {height}] = useMeasure();
    const trackRef = useRef(null);
    const [group, setGroup] = useState(GROUPS_OPTIONS[0].value);
    const groupMatches = groups_matches.filter(match => match.group.toLowerCase() === group);
    const[tID , setTID] = useState(selectedTournamentId.selectedTournamentId)
const [Tournament , settournament] = useState();
const [Standings , setStandings] = useState();

    useEffect(() => {
        trackRef.current && trackRef.current.scrollTo({top: 0, behavior: 'smooth'});
    }, [group]);
    useEffect(() => {
        const fetchTournamentDetails = async () => {
          try {
            
            if (selectedTournamentId) {
              const response = await fetch(`http://localhost:3000/Tournament/getbyid/${tID}`);
              if (!response.ok) {
                throw new Error('Failed to fetch tournament details');
              }
              const tournamentData = await response.json();
              settournament(tournamentData);
            }
          } catch (error) {
            console.error('Error fetching tournament details:', error);
          }
        };
    if(tID){
        fetchTournamentDetails();
    }
      }, [tID]);


      useEffect(() => {
        const fetchStandingsIds = async () => {
        try {
            if (tID) {
                const response = await fetch(`http://localhost:3000/Tournament/GetGroupsAndStandings/${tID}`);
                if (!response.ok) {
                  throw new Error('Failed to fetch tournament details');
                }
                const standingIds = await response.json();
                setStandings(standingIds.StandingsByGroup);
              }
            } catch (error) {
    
        }

        };
        if(Tournament){
            fetchStandingsIds();
        }
      }, [Tournament,tID])
      

    

    

const [groupNames ,setGroupNames] = useState([]);
useEffect(() => {
    const generateGroupNames = async () => {
        console.log(Standings);
        const generatedGroupOptions = Standings.map((_, index) => ({
            label: `Group ${String.fromCharCode(65 + index)}`,
            value: String.fromCharCode(97 + index)
        }));
        setGroupNames(generatedGroupOptions);
    };

    if (Standings) {
        generateGroupNames();
    }
}, [Standings]);

useEffect(() => {
    console.log(groupNames);
}, [groupNames]);

      
return (
    <>
        {groupNames.length > 0 && (
            <Spring className="card h-4">
                <SelectionList options={Standings.map((standing, index) => ({ label: `Group ${String.fromCharCode(65 + index)}`, value: String.fromCharCode(97 + index) }))} active={group} setActive={setGroup} innerRef={ref}/>
                <ScrollContainer height={height}>
                    <div className="track d-flex flex-column g-20" ref={trackRef} style={{padding: 20}}>

                        <GroupStandingsDisplay StandingsId={Standings[group.charCodeAt(0) - 97]} />
                    </div>
                </ScrollContainer>
            </Spring>
        )}
    </>
)
}

export default ChampionshipGroups;