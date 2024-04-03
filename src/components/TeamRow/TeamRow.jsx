// styling
import styled from 'styled-components/macro';
import theme from 'styled-theming';

// components
import Spring from '@components/Spring';

// hooks
import {useThemeProvider} from '@contexts/themeContext';

// utils
import PropTypes from 'prop-types';
import {useFindUserTour} from "@hooks/useFindUserTour";

export const StyledRow = styled.div`
  height: 25px;
  display: grid;
  grid-template-columns: minmax(0, calc(100% - 28px)) 28px;
  gap: 2px;
  border-radius: 4px;
  overflow: hidden;

  &.reverse {
    grid-template-columns: 28px minmax(0, calc(100% - 28px));
  }

  &.top div {
    background: var(--border);
  }

  div {
    height: 25px;
    background: ${theme('theme', {
    light: 'var(--body)',
    dark: 'var(--black-2)'
})};
    display: flex;
    align-items: center;
    text-transform: uppercase;
    color: var(--btn-text);
    line-height: 1;

    &.total {
      justify-content: center;
    }

    .index {
      width: 30px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }
  }

  .points {
    display: grid;
    grid-template-columns: repeat(3, 28px);
    text-align: center;
  }

  &.rtl div.info {
    border-right: 4px solid ${props => props.color ? `var(--${props.color})` : 'transparent'};

    &.minimal {
      padding-right: 8px;
    }
  }

  &.ltr div.info {
    border-left: 4px solid ${props => props.color ? `var(--${props.color})` : 'transparent'};

    &.minimal {
      padding-left: 8px;
    }
  }
`;

const TeamRow = ({team, index, variant = 'minimal',myTeam}) => {
    const {direction} = useThemeProvider();

    return (
        <Spring index={index} type="slideUp">
            <StyledRow className={`${myTeam ? 'top' : ''} ${direction} label h6`} color={team.color}>
                <div className={`info ${variant}`}>
                    {variant === 'league' && <span className="index">-</span>}
                    <span className="flex-1 text-overflow">{team.name}</span>
                    {
                        variant === 'league' && (
                            <div className="points">
                                <span>{team.w}</span>
                                <span>{team.d}</span>
                                <span>{team.l}</span>
                            </div>
                        )
                    }
                </div>
                <div className="total">{variant === 'minimal' ? team.score : team.pts}></div>
            </StyledRow>
        </Spring>
    );
}

TeamRow.propTypes = {
    index: PropTypes.number.isRequired,
    team: PropTypes.object.isRequired,
    variant: PropTypes.oneOf(['minimal', 'league'])
}

export default TeamRow