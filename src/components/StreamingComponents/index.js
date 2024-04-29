import React, { useEffect, useState} from "react";
import Spring from "@components/Spring";
import classNames from "classnames";
import DailyIframe from '@daily-co/daily-js';
import {useCreateStream} from "@hooks/useCreateStream";
import {useAuthContext} from "@hooks/useAuthContext";
import {Controller, useForm} from "react-hook-form";


function StreamIndex() {

    const {register, handleSubmit, formState: {errors}, control, watch} = useForm({
        defaultValues: {
            title: '',
        }
    });
    const {USER} = useAuthContext();
    const [filledForm,setFilledForm]= useState(false);
    const {createRoom,error,isLoading,roomUrl,roomInfo} = useCreateStream();
    const [finished,setFinished] = useState(false);
    let [roomName,setRoomName] = useState(null);
    function initializeDaily(roomUrl) {
        const callFrame = DailyIframe.createFrame({
            showLeaveButton: true,
            showFullscreenButton: true,
            iframeStyle: {
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                border: 0,
                borderRadius: '10px',
            },
        });
        roomInfo.token ? callFrame.join({
            url: roomUrl,
            showLeaveButton:true,
            userName: USER ? USER.fullname : "Unknown Participant",
            token:roomInfo.token,
        }) : callFrame.join({
            url: roomUrl,
            showLeaveButton:true,
            userName: USER ? USER.fullname : "Unknown Participant",
        });
        callFrame.setTheme({
            colors: {
                accent: '#E83551',
                accentText: '#FFFFFF',
                background: '#071D3A',
                backgroundAccent: '#222E5E',
                baseText: '#FFFFFF',
                border: '#26346B',
                mainAreaBg: '#031429',
                mainAreaBgAccent: '#071D3A',
                mainAreaText: '#FFFFFF',
                supportiveText: '#FFFFFF',
            },
        });
        callFrame.on('participant-left', async (event) => {
            console.log("LEFT!");
            if(event.participant.video){
                callFrame.destroy();
                setFinished(true);
            }
        });

    }


    useEffect(()=>{
        if (roomUrl && filledForm) {
            initializeDaily(roomUrl);
        }
        if(filledForm && !roomUrl){
            async function fetchData() {
                await createRoom(roomName)
            }
            fetchData();
        }
    },[roomUrl,filledForm])

    const Wrapper = Spring;
    const wrapperProps =  {className: 'card card-padded'};

    //Function on submit !
    const onSubmit = async (data) => {
        const title = data.title;
        setRoomName(title);
        roomName = title;
        console.log(data.title);
        console.log(roomName);
        setFilledForm(true);
    }


    return (
        <Wrapper {...wrapperProps} >
            {
                finished ? <div>
                        Livestream has Ended!
                </div> :
                !filledForm && !roomUrl ? <div>
                        <b>Choose a title for your stream before you begin</b>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="d-flex flex-column g-20" style={{margin: '20px 0 30px'}}>
                                <input className={classNames('field', {'field--error': errors.title})}
                                       type="text"
                                       placeholder="Your stream title..."
                                       {...register('title', {required: true})}/>
                            </div>
                            <div style={{
                                justifyContent:"center",
                                textAlign:"center",
                                alignContent:"center",
                            }}>
                                <button disabled={isLoading} type="submit" className="btn w-100">Proceed ></button>
                            </div>
                            {error && <div className="__progress-bar--error" >{error}</div>}
                            <br/><br/>
                            <div style={{
                                justifyContent:"center",
                                textAlign:"center",
                                alignContent:"center"
                            }}>
                            </div>


                        </form>

                    </div>
                    : filledForm && !roomUrl && isLoading ? <div>Preparing your stream...</div> :
                        roomUrl && (
                            <div id="daily-iframe-container" style={{ width: '100%', height: '600px' }} />
                )
            }

        </Wrapper>
    );
}
export default StreamIndex;

