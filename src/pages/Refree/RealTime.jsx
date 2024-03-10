// components
import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';
import StadiumDisplay from '@widgets/Refree/StadiumDisplay';
import TeamFullInfo from '@widgets/Refree/realtime/TeamFullInfo';

import ReviewsA from '@widgets/Refree/realtime/ReviewsA';
import ReviewsB from '@widgets/Refree/realtime/ReviewsB';

const widgets = {
    product_display: <StadiumDisplay />,
    ReviewsA: <ReviewsA standalone />,
    ReviewsB: <ReviewsB standalone />,
    team_full_info: <TeamFullInfo id="bayern"/>,
    team_full_infoo: <TeamFullInfo id="bayern"/>,
}

const RealTime = () => {
    return (
        <>
             <PageHeader title=" Teams Linup" />
            <AppGrid  id="club_summary" widgets={widgets}/>
        </>
    )
}

export default RealTime