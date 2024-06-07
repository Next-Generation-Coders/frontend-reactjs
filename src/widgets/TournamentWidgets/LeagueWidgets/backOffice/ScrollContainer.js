// ScrollContainer.js
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Scroller = styled.div`
  height: ${props => props.height}px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on mobile */
  position: relative;
  width: 100%;
`;

const ScrollContainer = ({ children, height }) => {
  return (
    <Scroller height={height}>
      {children}
    </Scroller>
  );
};

ScrollContainer.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.number.isRequired,
};

export default ScrollContainer;
