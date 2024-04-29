// components
import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';
import StreamIndex from "@components/StreamingComponents";

const widgets = {
    live: <StreamIndex variant="big" />,
}

const LiveStream = () => {
    return (
        <>
            <PageHeader title="Manage Stream" />
            <AppGrid id="live_stream" widgets={widgets} />
        </>
    )
}

export default LiveStream