// styling
import styles from './styles.module.scss';
import { LuSendHorizonal } from "react-icons/lu";
// components
import Spring from '@components/Spring';
import ChatMessage from '@components/ChatMessage';
import DateSeparator from '@ui/DateSeparator';
import ScrollContainer from '@components/ScrollContainer';

// hooks
import useMeasure from 'react-use-measure';

// utils
import dayjs from 'dayjs';

// data placeholder
import chat from '@db/chat';
import {useForm} from "react-hook-form";
import classNames from "classnames";
import {useAuthContext} from "@hooks/useAuthContext";
import io from "socket.io-client";
import {useEffect, useState} from "react";
import {useFindUserChats} from "@hooks/useFindUserChats";
import {useSelector} from "react-redux";


const Messages = () => {
    const selectedChatId = useSelector(state => state.chats.selectedChatId);
    const selectedChat = useSelector(state => state.chats.chats.find(chat => chat._id === selectedChatId));
    let socket;
    try{
         socket = io('http://localhost:3000', { transports : ['websocket'] });
    }catch(error){
        console.log("Socket couldn't connect, ERROR:",error.message)
    }
    const {getChats} = useFindUserChats();
    const [sending,setSending] = useState(false);

    const {USER} = useAuthContext()

    const sendMessage = async (data)=>{
        setSending(true)
        socket.emit('message',data);
    }
    useEffect(() => {
        async function fetchData() {
            await getChats();
        }

        fetchData();
        // socket.off('message');
        socket.on('received',async (data)=>{
            await fetchData().then(()=>{
                setSending(false)
            })
        })
    },[])
    const messages = selectedChat ? selectedChat.messages : chat
    const {handleSubmit, register,reset} = useForm({
        defaultValues: {
            message:'',
            senderEmail: !USER ? null : USER.email,
            timestamp:Date.now(),
            avatar : !USER ? '' : USER.avatar,
            chat: null
        }
    });


    const uniqueDates = [...new Set(messages.map((item) => dayjs(item.timestamp).format('DD.MM.YY')))];
    const [footerRef, {height: footerHeight}] = useMeasure();
    const [headerRef, {height: headerHeight}] = useMeasure();



    const messagesByDate = uniqueDates.map((date) => {
        return messages.filter((item) => dayjs(item.timestamp).format('DD.MM.YY') === date);
    });
    messagesByDate.sort((a, b) => {
        const dateA = dayjs(a[0].timestamp, 'DD.MM.YY');
        const dateB = dayjs(b[0].timestamp, 'DD.MM.YY');
        return dateB - dateA;
    });

    const onSubmit = async data => {
        if(selectedChat){
            data.timestamp = Date.now()
            data.chat = selectedChat._id;
            await sendMessage(data)
            reset()
        }
    }


    return (
        <Spring className="card h-2 d-flex flex-column justify-content-between">
            <h3 className={styles.header} ref={headerRef}>Chat</h3>
            <ScrollContainer height={headerHeight + footerHeight} bg="widget-bg" isCompact={true} >
                <div className={`${styles.main} track d-flex flex-column g-10`}>
                    {
                        uniqueDates.map((date, index) => {
                            const isToday = dayjs().format('DD.MM.YY') !== date;
                            return (
                                <div key={index}>
                                    <DateSeparator date={isToday ? 'New' : date} />
                                    <div className={styles.main_group}>
                                        {
                                            messagesByDate[index].map((message, index) => {
                                                return (
                                                    <ChatMessage key={index} index={index} {...message} />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </ScrollContainer>
            {selectedChat &&
                <div className="card_footer" ref={footerRef} style={{paddingTop: 20}}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{padding: '20px 30px 10px'}}>
                    <div className="d-flex flex-row g-20">
                        <input
                            className={classNames('field')}
                            type="text"
                            placeholder="Send message..."
                            {...register('message', {required: true})}
                        />
                        <button type="submit" disabled={sending} className="btn">
                            { sending ? <span className={styles.loader}></span>
                                : <LuSendHorizonal/>}
                        </button>
                    </div>
                </form>
            </div>}
        </Spring>
    )
}

export default Messages