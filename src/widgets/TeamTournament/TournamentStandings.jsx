// styling
import styled from 'styled-components/macro';
import theme from 'styled-theming';

// components
import Spring from '@components/Spring';
import LeagueHeader from '@components/LeagueHeader';
import {StyledRow} from '@components/TeamScoreRow';

// hooks
import {useThemeProvider} from '@contexts/themeContext';

//styles
import styles from './styles.module.scss'

// data placeholder
import league_standings from '@db/league_standings';
import TeamRow from "@components/TeamRow/TeamRow";
import {useFindUserTour} from "@hooks/useFindUserTour";
import {useEffect} from "react";

const TableHeader = styled(StyledRow)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${theme('theme', {
    light: 'var(--body)',
    dark: '#414D55'
})};
  color: var(--btn-text) !important;

  &.ltr {
    padding: 0 4px 0 10px;
  }

  &.rtl {
    padding: 0 10px 0 4px;
  }

  div {
    background: ${theme('theme', {
    light: 'var(--body)',
    dark: '#414D55'
})};
  }

  .points {
    margin-right: 4px;
  }
`;

const MyTournament = ({tournament}) => {
    const {direction} = useThemeProvider();
    const tableData = league_standings.sort((a, b) => b.pts - a.pts);

    const handleClick = ()=>{
    }
    const {findTeams,teams,userTeam} = useFindUserTour();
    let length = teams.length;
    useEffect(() => {
        async function fetchData() {
            await findTeams(tournament)
        }

        fetchData().then(()=>{
            length = teams.length;
            console.log(length," Teams, data :",teams);
            console.log(userTeam)
        })
    }, [length]);
    return (
        <Spring className="card d-flex flex-column g-20 card-padded">
            <div className={styles.myTournamentWidget} onClick={handleClick}>
            <LeagueHeader title={<><span className="d-block">{tournament.title}</span></>}
                          img={tournament.logo}
                          variant="compact"/>
            <div className="d-flex flex-column g-4 justify-content-center">
                <TableHeader className={`label h6 ${direction}`}>
                    <span className="flex ">Participating teams</span>
                </TableHeader>
                <div className="d-flex flex-column g-1">
                    {
                        teams.map((item, index) => (
                            item._id !== userTeam._id ?
                            <TeamRow key={index} team={item} index={index} myTeam={false} variant="league"/>
                                :
                            <TeamRow key={index} team={item} index={index} myTeam={true} variant="minimal"/>
                        ))
                    }
                </div>
            </div>
            </div>
        </Spring>
    )
}

export default MyTournament