// styling
import styles from './styles.module.scss';

// components
import Collapse from '@mui/material/Collapse';
import BasicCheckbox from '@ui/BasicCheckbox';

// utils
import dayjs from 'dayjs';

// actions
import {toggleComplete, removeTodo,toggleCollapse} from '@features/chats/chatSlice';

// constants
import {CHAT_LEGEND} from '@constants/chat';

// hooks
import {useDispatch, useSelector} from 'react-redux';
import {useThemeProvider} from '@contexts/themeContext';
import MinimalCheckbox from "@ui/MinimalCheckbox";
import moment from "moment";

const Chat = ({data, variant}) => {
    const selectedChatId = useSelector(state => state.chats.selectedChatId);
    const {theme} = useThemeProvider();
    const _id = data._id;
    const label = data.label;
    const type = data.type;
    const complete = data._id === selectedChatId
    const uniqueDates = [...new Set(data.messages.map((item) => dayjs(item.timestamp).format('DD.MM.YY')))];
    const messagesByDate = uniqueDates.map((date) => {
        return data.messages.filter((item) => dayjs(item.timestamp).format('DD.MM.YY') === date);
    });
    messagesByDate.sort((a, b) => {
        const dateA = dayjs(a[0].timestamp, 'DD.MM.YY');
        const dateB = dayjs(b[0].timestamp, 'DD.MM.YY');
        return dateB - dateA;
    });
    const latestMessage = data.messages[data.messages.length-1]
    const timestamp = data.messages ? data.messages[data.messages.length-1].timestamp : moment().set({date: 17, month: 3, year: 2022, hour: 12, minute: 20}).valueOf();
    const dispatch = useDispatch();
    const checkboxColor = CHAT_LEGEND.find(item => item.text.toLowerCase() === type.toLowerCase()).color;
    const handleClick = (_id)=>{
        dispatch(toggleCollapse({ id: _id }));
    }
    const ChatLayout = () => {

        switch (variant) {
            default:
            case 'list':
                return (
                    <div className={styles.list_item} tabIndex={0} style={{
                        backgroundColor:complete ? "rgba(230, 230, 230, 0.1)" : "rgba(0, 0, 0, 0.5)"
                    }} onClick={() => handleClick(_id)}>
                        <div className={styles.content} >
                            <BasicCheckbox id={`${_id}`}
                                           color={checkboxColor}
                                           checked={complete}
                                           onChange={() => dispatch(toggleCollapse({id:_id}))}/>
                            <div className="d-flex flex-column g-2 flex-1">
                                <input className={`${styles.label} text-overflow`} type="text" defaultValue={label} readOnly={true}/>
                                <input className={`${styles.sender} text-overflow`} type="text" defaultValue={latestMessage.senderEmail} readOnly={true}/>
                                <span className="label h6">
                                    {dayjs(timestamp).format('DD MMM YYYY / HH:mm')}
                                </span>
                            </div>
                            <div className={styles.secondary}>
                                {/*<button className={`${styles.delete} label h6`}*/}
                                {/*        onClick={() => dispatch(removeTodo({_id}))}>*/}
                                {/*   Remove*/}
                                {/*</button>*/}
                                <div className={styles.category}>
                                    <span className={`${styles.category_label} label h6`}>{type}</span>
                                    <span className={styles.category_color}
                                          style={{backgroundColor: `var(--${checkboxColor})`}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case 'planner':
                return (
                    // <div className={`${styles.planner_item} ${styles[theme]} ${complete ? styles.checked : ''}`} tabIndex={0}
                    <div className={`${styles.planner_item} ${styles[theme]} ${styles.checked}`} tabIndex={0}
                        onClick={()=>dispatch(toggleComplete({_id}))}
                    >
                        <div className="d-flex flex-column g-8">
                            <span className={styles.title}>{label}</span>
                            <div className="d-flex align-items-center g-8">
                                    <span className={styles.category_color}
                                          style={{backgroundColor: `var(--${checkboxColor})`}}/>
                                    <span className={`${theme === 'dark' ? styles.timestamp : ''} label h6`}>
                                        {dayjs(timestamp).format('DD MMM YYYY')}
                                    </span>
                            </div>
                        </div>
                        <MinimalCheckbox id={`${_id}`}
                                         // checked={complete}
                                         checked={false}
                                         onChange={() => dispatch(toggleComplete({_id}))}/>
                    </div>
                )
        }
    }

    return (
        <Collapse in={true} timeout={300}>
            <ChatLayout/>
        </Collapse>
    )
}

export default Chat