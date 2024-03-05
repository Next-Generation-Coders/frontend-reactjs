import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import PageHeader from '@layout/PageHeader';

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
`;

const SuccessTitle = styled.h2`
    color: #00a859;
    font-size: 28px;
    margin-bottom: 20px;
`;

const SuccessMessage = styled.p`
    font-size: 18px;
    line-height: 1.6;
`;

const IconWrapper = styled.div`
    color: #00a859;
    font-size: 48px;
    margin-bottom: 20px;
`;

const SuccessPayment = () => {

    const navigate = useNavigate();
    useEffect(() => {
        const redirectToPayment = () => {
            navigate('/');  
        };
    
        const timeoutId = setTimeout(redirectToPayment, 6000);  
    
        return () => clearTimeout(timeoutId); 
    }, []);
    return (
        <>
            <PageHeader title="Payment Success" />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <SuccessContainer>
                <IconWrapper>
                    <FontAwesomeIcon icon={faCheckCircle} />
                </IconWrapper>
                <SuccessTitle>Payment Successful!</SuccessTitle>
                <SuccessMessage>
                    Thank you for your payment. Your transaction was successful.
                    Incase of any inqueries contact the support at{" "}<bR></bR>
                    <strong>support@linkupTournament.com</strong>     
                   </SuccessMessage>
            </SuccessContainer>
        </>
    );
}

export default SuccessPayment;
