// styling
import styled from 'styled-components/macro';
import theme from 'styled-theming';

// components
import Spring from '@components/Spring';

// utils
import dayjs from 'dayjs';
import {useAuthContext} from "@hooks/useAuthContext";

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  
  .sender {
    display: block;
    margin-bottom: 4px;
  }
  
  .sender, .timestamp {
    color: ${theme('theme', {
      light: '#8C9876',
      dark: '#fff',
    })};
  }
`;

const MessageContainer = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: ${theme('theme', {
    light: 'var(--body)',
    dark: 'var(--border)',
  })};
  border-radius: 8px;

  .text {
    flex: 1;
  }

  .timestamp {
    position: absolute;
  }
`;
const MyMessageContainer = styled.div`
  padding: 15px 20px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: ${theme('theme', {
    light: '#001F3F',
    dark: '#001F3F',
})};
  border-radius: 8px;

  .text {
    flex: 1;
  }

  .timestamp {
    position: absolute;
  }
`;

const ChatMessage = ({sender, message, timestamp, index, senderEmail,avatar}) => {
    const {USER} = useAuthContext()

    return (
        senderEmail !== USER.email ?
        <Spring type="slideUp" index={index}>
            <MessageHeader>
                <span className="sender text-12 text-600">{senderEmail}</span>
                <span className="timestamp text-10">{dayjs(timestamp).format('HH:mm')}</span>
            </MessageHeader>
            <MessageContainer>
                <img className="square-avatar" src={avatar} alt={sender}/>
                <p className="text">{message}</p>
            </MessageContainer>
        </Spring>
            :
            <Spring type="slideUp" index={index}>
                <MessageHeader>
                    <span className="timestamp text-10">{dayjs(timestamp).format('HH:mm')}</span>
                    <span className="sender text-12 text-600">{senderEmail}</span>
                </MessageHeader>
                <MyMessageContainer>
                    <p className="text">{message}</p>
                    <img className="square-avatar" src={USER.avatar} alt={sender}/>
                </MyMessageContainer>

            </Spring>
    )
}

export default ChatMessage