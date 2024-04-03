// components
import PageHeader from '@layout/PageHeader';
import AppGrid from '@layout/AppGrid';
// import Testimonials from '@widgets/Testimonials';
import Messages from "@widgets/Chat/Messages";
import ChatList from "@widgets/Chat/ChatList";
import {useFindUserChats} from "@hooks/useFindUserChats";
import LoadingScreen from "@components/LoadingScreen";

const Chat = () => {

    const {isLoading, userChats,selected} = useFindUserChats()

    const widgets = {
        // testimonials: <Testimonials />,
        chat_list: <ChatList userChats={userChats} selected={selected} isLoading={isLoading} />,
        messages: <Messages selected={selected} />
    }


    return (
        isLoading ? <LoadingScreen/> :
        <>
            <PageHeader title="Chat" />
            <AppGrid id="chat" widgets={widgets}/>
        </>
    )
}

export default Chat