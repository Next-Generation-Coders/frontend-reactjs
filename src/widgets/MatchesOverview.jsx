// components
import Spring from '@components/Spring';
import ScrollContainer from '@components/ScrollContainer';
import {TabsList} from '@mui/base/TabsList';
import {TabPanel} from '@mui/base/TabPanel';
import {Tabs} from '@mui/base/Tabs';
import MatchCard from '@components/MatchCard';
import TabButton from '@ui/TabButton';
import axios from 'axios';
// hooks
import useMeasure from 'react-use-measure';
import {useState, useEffect, useRef} from 'react';

// data placeholder
import matches from '@db/matches';
import MatchScoreWidget from '@pages/Results/resultWidgets/MatchScoreWidget';
import MatchesWidgets from '@pages/Results/resultWidgets/MatchesWidgets';

const MatchesOverview = () => {
    const [activeTab, setActiveTab] = useState('finished');

    const [matches, setMatches] = useState([]);

    const [ref, {height}] = useMeasure();
    const trackRef = useRef(null);
    const [matchesLive, setMatchesLive] = useState([]);
    const [matchesFinished, setMatchesFinished] = useState([]);

    //const matchesFinished = matches.filter(match => match.active === false);


    useEffect(() => {
        // Fetch current result when component mounts
        const fetchResult = async () => {
          try {
            const response = await axios.get('http://localhost:3000/result/resultsSorted'); // Assuming you have an endpoint to get the current result
            const { finishedResults, upcomingResults } = response.data;
            setMatchesLive(upcomingResults); // Assuming upcoming matches are considered live
            setMatchesFinished(finishedResults);

            console.log(response.data);
  
          } catch (error) {
            console.error('Error fetching current result:', error);
          }

        }
        fetchResult();

        })
    useEffect(() => {
        trackRef.current && trackRef.current.scrollTo(0, 0);
    }, [activeTab]);

    return (
        <Spring className="card h-3">
            <Tabs className="h-100" value={activeTab}>
                <div className="card-padded" ref={ref}>
                    <TabsList className="tab-nav col-2">
                    <TabButton title="Finished"
                                   onClick={() => setActiveTab('finished')}
                                   active={activeTab === 'finished'}/>
                        <TabButton title="Upcoming"
                                   onClick={() => setActiveTab('live')}
                                   active={activeTab === 'live'}/>
                        
                    </TabsList>
                </div>
                <ScrollContainer height={height}>
                    <div className="track" style={{padding: '0 var(--card-padding)'}} ref={trackRef}>
                        <TabPanel className="h-100" value="live" onClick={() => setActiveTab('live')}>
                            <div className="d-flex flex-column g-24" style={{paddingBottom: 24}}>
                                {
                                    matchesLive.map((match, index) => (
                                        <MatchesWidgets key={index} score={match} />
                                    ))
                                }
                            </div>
                        </TabPanel>
                        <TabPanel className="h-100" value="finished" onClick={() => setActiveTab('finished')}>
                            <div className="d-flex flex-column g-24" style={{paddingBottom: 24}}>
                                {
                                    matchesFinished.map((match, index) => (
                                        <MatchesWidgets key={index} score={match}/>
                                    ))
                                }
                            </div>
                        </TabPanel>
                    </div>
                </ScrollContainer>
            </Tabs>
        </Spring>
    )
}

export default MatchesOverview