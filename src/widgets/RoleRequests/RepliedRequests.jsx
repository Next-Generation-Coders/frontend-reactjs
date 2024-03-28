// styling
import styles from './styles.module.scss';

// components
import Spring from '@components/Spring';
import {NavLink} from 'react-router-dom';
import ScrollContainer from '@components/ScrollContainer';
import TruncatedText from '@components/TruncatedText';


// hooks
import useMeasure from 'react-use-measure';

// assets
import {useGetUsers} from "@hooks/useGetUsers";
import {useBlockUser} from "@hooks/useBlockUser";
import {useEffectOnce} from "react-use";
import {useRoleRequest} from "@hooks/useRoleRequest";
import { FaCheck } from "react-icons/fa6";
import { TiCancel } from "react-icons/ti";

const RepliedRequests = () => {


    const [headerRef, {height: headerHeight}] = useMeasure();
    const [ footerRef, {height: footerHeight}] = useMeasure();
    const [nameRef, {width}] = useMeasure();
    const {fetchRequests, isLoading,requests,acceptRequest,rejectRequest} = useRoleRequest()
    const Wrapper = Spring;
    const wrapperProps = {
        className: 'card h-2 d-flex flex-column'
    };
    let pendingRequests;
    useEffectOnce(() => {
        async function fetchData() {
            await fetchRequests();
        }
        fetchData().then(()=>{

        })
    })
    pendingRequests = requests.filter(request=> request.result !== "PENDING")


    return (
        isLoading ?
        <div style={{paddingTop: 50}} className="d-flex align-items-center justify-content-center g-20">
            <div className="box"></div>
        </div>
            :
        <Wrapper {...wrapperProps}>

            <h3 className="card_header" style={{paddingBottom: 20}} ref={headerRef}>

            </h3>
            <ScrollContainer height={headerHeight + footerHeight}>
                <div className="track d-flex flex-column flex-1">

                    {
                        pendingRequests && pendingRequests.map(item => {

                            return (
                                <div className={`${styles.item} d-flex align-items-center justify-content-between g-20`}
                                     key={item.requestedRole}>
                                    <div className="d-flex align-items-center flex-1 g-10">

                                        {/*<img className="square-avatar" src={item} alt={item.requestedRole}/>*/}
                                        <div className="d-flex flex-column flex-1" ref={nameRef}>
                                            <NavLink to="/user-management">
                                                <TruncatedText className="h4" text={item.user.fullname+" ( "+item.user.email+" )"} width={width} lines={1}/>
                                            </NavLink>
                                            <span className={`label label--store 'h6'}`}>
                                                Requested role : <b>{item.requestedRole === 10 ? "USER"
                                                :
                                                item.requestedRole === 11 ? "PLAYER"
                                                    :
                                                    item.requestedRole === 12 ? "COACH"
                                                        :
                                                        item.requestedRole === 13 ? "ORGANIZER"
                                                            :
                                                            item.requestedRole === 20 ? "REFEREE"
                                                                :
                                                                "TEAM MANAGER"}</b>
                                            </span>
                                        </div>
                                    </div>
                                    {
                                    item.result === 'ACCEPTED' ?
                                       <button className="btn btn--icon" disabled={true}> <FaCheck/></button>
                                       :
                                       <button className="btn btn--outlined" disabled={true}> <TiCancel/></button>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </ScrollContainer>
        </Wrapper>
    )


}

export default RepliedRequests