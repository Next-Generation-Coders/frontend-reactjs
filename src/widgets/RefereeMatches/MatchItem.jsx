// styling
import styled from 'styled-components/macro';
import theme from 'styled-theming';

// components
import MatchScoreItem from '@components/MatchScoreItem';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Spring from '@components/Spring';

// hooks
import {useState} from 'react';

// assets
import preview from '@assets/preview.webp';
import {useNavigate} from "react-router-dom";
import MatchItemDetails from "@widgets/RefereeMatches/MatchIteamDetails";

const StyledAccordion = styled(Accordion)`
  background: ${theme('theme', {
    light: 'var(--widget) !important',
    dark: 'var(--border) !important'
})};
  box-shadow: 0 1px 8px rgba(110, 110, 110, 0.1) !important;
  border-radius: 4px !important;
  margin: 0 !important;
`;

const StyledAccordionSummary = styled(AccordionSummary)`
  padding: 0 !important;


  .MuiAccordionSummary-content {
    margin: 0 !important;
  }
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  padding: 0 !important;
  aspect-ratio: 334 / 210;
  overflow: hidden;
  border-radius: 4px;
`;

const MatchItem = ({data, index}) => {
    const [expanded, setExpanded] = useState(undefined);
    const matchDate = new Date(data.date)
    console.log("data",matchDate);
    const year =  matchDate.getFullYear();
    const month = matchDate.getMonth();
    const day = matchDate.getDate();
    const navigate = useNavigate()
    // manually handle accordion expansion
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        navigate('/agent')
    }

    return (
        <Spring type="slideUp" index={index}>
            <StyledAccordion onChange={handleChange(index)}>
                <StyledAccordionSummary>
                    <div className="d-flex align-items-center flex-1 g-20 card-padded">
                        <div className="h3">
                            {day+"-"+month+"-"+year}
                        </div>
                        <div className="flex-1">
                            <MatchItemDetails match={data}/>
                        </div>
                    </div>
                </StyledAccordionSummary>
                {/*<StyledAccordionDetails>*/}
                {/*    <img src={preview} alt="preview"/>*/}
                {/*</StyledAccordionDetails>*/}
            </StyledAccordion>
        </Spring>
    )
}

export default MatchItem