// styling
import styles from './styles.module.scss';

// components
import Spring from '@components/Spring';
import LegendItem from '@ui/LegendItem';
import ScrollContainer from '@components/ScrollContainer';
import DnDLayout from '@components/ChatList/DnDLayout';
import CustomSelect from '@ui/CustomSelect';
import AddFormContainer from '@components/AddFormContainer';

// hooks
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useMeasure from 'react-use-measure';
import {Controller, useForm} from 'react-hook-form';

// utils
import classNames from 'classnames';

// actions
import {addChat, toggleCollapse} from '@features/chats/chatSlice';

// constants
import {CHAT_LEGEND, CHAT_OPTIONS} from '@constants/chat';
import CustomMultiSelect from "@ui/CustomMultiSelect";
import {useChat} from "@hooks/useChat";

const ChatList = ({userChats,isLoading,selected}) => {

    const {control, handleSubmit, register, reset, formState: {errors}} = useForm({
        defaultValues: {
            owner: null,
            label: '',
            type: 'group',
        }
    });
    const [formVisible, setFormVisible] = useState(false);

    const [headerRef, {height: headerHeight}] = useMeasure();
    const [footerRef, {height: footerHeight}] = useMeasure();
    const trackRef = useRef(null);

    const dispatch = useDispatch();


    const [users, setUsers] = useState([]);
    const [fetchingUsers,setFetchingUsers]=useState(true);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_BASE_URL+`/User/for-chat`,{
                    method: 'GET',
                        headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });
                return response.json()
            } catch (error) {
                console.error('Error fetching users:', error);
                throw error;
            }
        };
        fetchUsers().then((json)=>{
            const data = json.data.map(user=> ({
                value: user.email,
                label:user.fullname ? user.fullname+" ( "+user.email+" ) " : user.email,
            }))
            setUsers(data);
            setFetchingUsers(false)
        }).catch(e=>{
            setUsers([]);
            setFetchingUsers(false)
            console.log(e.message);
        })
    }, []);

    const {createChat,chat} = useChat();

    const onSubmit = async data => {
        dispatch(addChat({
            type: data.type.value,
            label: data.label,
            expanded: false
        }));
        let participants = [];
        data.participants.forEach(user=>{
            const participant = user.value
            participants.push(participant);
        })
        console.log(participants);
        const Chat = {
            label:data.label,
            owner:null,
            participants: participants,
            type: data.type.value,
            messages: [],
        }

        await createChat(Chat).then((chat)=>{
            console.log(Chat);
            setFormVisible(false);
            setTimeout(() => dispatch(toggleCollapse({id:chat._id})), 300);
            data.participants=null;
            reset();
        });

    }

    const onReset = () => {
        reset();
        setFormVisible(false);
    }

    useEffect(() => {
        trackRef.current && trackRef.current.scrollTo(0, 0);
    }, [formVisible]);

    return (
        isLoading ? <div className="box">
            </div>
            :
        <Spring className="card h-2 d-flex flex-column justify-content-between">
            <div className={`${styles.header} card_header d-flex`} ref={headerRef}>
                <h3>Chat list</h3>
                <div className="d-flex g-16" style={{
                    margin:"20px"
                }}>
                    {
                        CHAT_LEGEND.map((item, index) => (
                            <LegendItem key={index} {...item}/>
                        ))
                    }
                </div>
            </div>
            <ScrollContainer height={headerHeight + footerHeight} isCompact={true}>
                <div className={`${styles.main} track`} ref={trackRef}>
                    <AddFormContainer open={formVisible}>
                        <form className="d-flex flex-column g-20"
                              onSubmit={handleSubmit(onSubmit)}
                              style={{padding: '20px 30px 10px'}}>
                            <div className="d-flex flex-column g-20">
                                <input className={classNames('field', {'field--error': errors.title})}
                                       type="text"
                                       placeholder="Chat name"
                                       {...register('label', {required: true})}/>
                                <Controller name="type"
                                            control={control}
                                            rules={{required: true}}
                                            render={({field}) => (
                                                <CustomSelect
                                                              value={field.value}
                                                              variant='basic'
                                                              onChange={field.onChange}
                                                              innerRef={field.ref}
                                                              options={CHAT_OPTIONS}
                                                              placeholder="Chat type"
                                                              className={classNames('field', {'field--error': errors.type})}/>
                                            )}/>
                                <Controller
                                    name="participants"
                                    control={control}
                                    rules={{ required: true}}
                                    render={({ field }) =>
                                        fetchingUsers ? <div className="box"></div> :
                                        <CustomMultiSelect
                                            // value={field.email}
                                            defaultValue={[]}
                                            name="participants"
                                            options={users}
                                            onChange={field.onChange}
                                            className={classNames('field', {'field--error': errors.participants})}
                                        />}
                                />
                            </div>
                            <div className="d-grid col-2 g-20">
                                <button className="btn">Submit</button>
                                <button className="btn btn--outlined" type="reset" onClick={onReset}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </AddFormContainer>
                    {userChats.length !== 0 ? <DnDLayout variant="list" data={userChats} selected={selected}/> : <DnDLayout variant="planner" data={[]}/>}
                </div>
            </ScrollContainer>
            <div className="card_footer" ref={footerRef} style={{paddingTop: 20}}>
                <button className="btn w-100" onClick={() => setFormVisible(true)} disabled={formVisible}>
                    Create new chat
                </button>
            </div>
        </Spring>
    )
}

export default ChatList