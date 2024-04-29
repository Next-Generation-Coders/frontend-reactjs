import React, {useEffect, useState} from "react";
import Spring from "@components/Spring";
import DailyIframe from '@daily-co/daily-js';
import {useAuthContext} from "@hooks/useAuthContext";
import {useWatchStream} from "@hooks/useWatchStream";


function WatchIndex() {

    const {USER} = useAuthContext();
    const {getStreamUrl,roomUrl,roomInfo,error,isLoading,joinStream} = useWatchStream();
    const [finished,setFinished] = useState(false);
    function initializeDaily() {
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
        roomInfo ? callFrame.join({
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
            if(event.participant.video){
                callFrame.destroy()
                setFinished(true);
            }
            if (event.reason === 'left') {
                console.log("Participant left the call");
                if(roomInfo){
                    callFrame.destroy()
                }
            } else if (event.reason === 'finished') {
                console.log("Host left the call");
                callFrame.destroy();
            }
        });
    }


    useEffect(()=>{
        async function fetchData() {
            await getStreamUrl();
            if(roomUrl !== ''){
                await joinStream();
                initializeDaily();
            }
        }
        fetchData();
    },[roomUrl])

    const Wrapper = Spring;
    const wrapperProps =  {className: 'card card-padded'};




    return (
        <Wrapper {...wrapperProps} >
            {
                finished ? <div>
                        Livestream has Ended!
                    </div> :
                !roomUrl && isLoading ?
                    <div>Fetching the stream's info</div>
                    :
                    roomUrl && (
                        <div id="daily-iframe-container" style={{ width: '100%', height: '600px' }} />
                    )
            }

        </Wrapper>
    );
}
export default WatchIndex;

