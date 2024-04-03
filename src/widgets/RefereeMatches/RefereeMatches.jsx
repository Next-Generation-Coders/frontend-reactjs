// components
import Spring from '@components/Spring';
import ScrollContainer from '@components/ScrollContainer';
import {TabsList} from '@mui/base/TabsList';
import {TabPanel} from '@mui/base/TabPanel';
import {Tabs} from '@mui/base/Tabs';
import MatchCard from '@components/MatchCard';
import TabButton from '@ui/TabButton';

// hooks
import useMeasure from 'react-use-measure';
import {useState, useEffect, useRef} from 'react';

// data placeholder
import MatchResultBasic from "@widgets/MatchResultBasic";
import Matches from "@widgets/RefereeMatches/Matches";
import {useRefereeMatches} from "@hooks/useRefereeMatches";

const RefereeMatches = () => {

    const [activeTab, setActiveTab] = useState('live');
    const [ref, {height}] = useMeasure();
    const trackRef = useRef(null);

    const {findMatches, isLoading, error,matches} = useRefereeMatches()

    useEffect(()=>{
        async function fetchData(){
            await findMatches()
        }
        fetchData()
    },[])

    useEffect(() => {
        trackRef.current && trackRef.current.scrollTo(0, 0);
    }, [activeTab]);

    return (
        isLoading ? <div className="box"></div> :
        <Spring className="card h-3">
            <Tabs className="h-100" value={activeTab}>
                <ScrollContainer height={height}>
                    <div className="track" style={{padding: '0 var(--card-padding)'}} ref={trackRef}>
                        <TabPanel className="h-100" value="live" onClick={() => setActiveTab('live')}>
                            <div className="d-flex flex-column g-24" style={{paddingBottom: 24}}>
                                <Matches matches={matches} isLoading={isLoading}/>
                            </div>
                        </TabPanel>
                    </div>
                </ScrollContainer>
            </Tabs>
        </Spring>
    )
}

export default RefereeMatches