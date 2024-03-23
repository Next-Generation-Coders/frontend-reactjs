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


const ActiveUsers = () => {

    const [headerRef, {height: headerHeight}] = useMeasure();
    const [ footerRef, {height: footerHeight}] = useMeasure();
    const [nameRef, {width}] = useMeasure();
    // const Wrapper = isPopup ? Popup : Spring;
    // const wrapperProps = isPopup ? {
    //     open: cartOpen,
    //     onClose: () => setCartOpen(false),
    //     popupClass: styles.popup
    // } : {
    //     className: 'card h-2 d-flex flex-column'
    // };
    const Wrapper = Spring;
    const wrapperProps = {
        className: 'card h-2 d-flex flex-column'
    };
    const { getUsers, isLoading,activeUsers,setActiveUsers } = useGetUsers()
    const { toggleBlock ,Loading,error } = useBlockUser()
    useEffectOnce(() => {
        async function fetchData() {
            await getUsers();
        }
        fetchData()
    })

    const handleBlock = async (item)=>{
        await toggleBlock(item._id)
        if(error === ''){
            setActiveUsers(prevActiveUsers => [...prevActiveUsers.filter((u)=> item!==u)])
        }
    }



    return (
        Loading || isLoading ?
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
                        activeUsers && activeUsers.map((item) => {

                            return (
                                <div className={`${styles.item} d-flex align-items-center justify-content-between g-20`}
                                     key={item.email}>
                                    <div className="d-flex align-items-center flex-1 g-10">

                                        <img className="square-avatar" src={item.img} alt={item.title}/>
                                        <div className="d-flex flex-column flex-1" ref={nameRef}>
                                            <NavLink to="/user-management">
                                                <TruncatedText className="h4" text={item.fullname} width={width} lines={1}/>
                                            </NavLink>
                                            <span className={`label label--store 'h6'}`}>
                                                {item.email}
                                            </span>
                                        </div>
                                    </div>
                                    {
                                        <button className="btn btn--switch" onClick={()=>handleBlock(item)}>Block</button>
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

export default ActiveUsers