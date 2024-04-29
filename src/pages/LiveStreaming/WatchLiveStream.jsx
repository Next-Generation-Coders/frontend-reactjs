// components
import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';
import WatchIndex from "@components/StreamingComponents/WatchStream/WatchIndex";

const widgets = {
    live: <WatchIndex variant="big" />,
}

const WatchStream = () => {
    return (
        <>
            <PageHeader title="Manage Stream" />
            <AppGrid id="live_stream" widgets={widgets} />
        </>
    )
}

export default WatchStream