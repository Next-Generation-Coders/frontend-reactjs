import BasicSelect from './styles';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { components } from 'react-select';
import { memo } from 'react';
import styles from './styles.module.scss'
const CustomIconSelect = ({ options, value, onChange, variant = 'basic', ...props }) => {
    const [uniqueId] = useState(() => 'select_' + Math.random().toFixed(5).slice(2));

    const Control = ({ children, ...props }) => {
        const selectedOption = options.find(option => option.value === value);
        const icon = selectedOption?.icon;
        const val = selectedOption?.value;

        return (
            <components.Control className={variant === 'basic' ? 'field-input' : ''} {...props}>
                {children}
                {icon && <div><span className={styles.iconPrefix}>{icon}</span>{val}</div>}
                {
                    variant === 'minimal' ?
                        <i className="icon icon-caret-down"/>
                        :
                        <i className="icon icon-chevron-down"/>
                }
            </components.Control>
        );
    };

    // custom option renderer
    const Option = props => {
        const { data } = props;
        const icon = data?.icon; // Get the icon for the option

        return (
            <components.Option {...props}>
                {icon && <span className="icon-prefix">{icon}</span>} {/* Render the icon prefix */}
                {data.label}
            </components.Option>
        );
    };

    // select props
    const selectProps = {
        classNamePrefix: 'select',
        id: props.id || uniqueId,
        isSearchable: true,
        options,
        value,
        onChange,
        placeholder: props.placeholder,
        openMenuOnFocus: true,
        blurInputOnSelect: true,
        ref: props.innerRef,
        defaultValue: props.defaultValue,
        onMenuClose: () => {
            const menuEl = document.querySelector(`#${props.id || uniqueId} .select__menu`);
            const containerEl = menuEl?.parentElement;
            const clonedMenuEl = menuEl?.cloneNode(true);

            if (!clonedMenuEl) return;

            clonedMenuEl.classList.add('close');
            clonedMenuEl.addEventListener('animationend', () => {
                containerEl?.removeChild(clonedMenuEl);
            });

            containerEl?.appendChild(clonedMenuEl);
        },
        components: {
            Control,
            Option,
        },
    };

    return <BasicSelect {...selectProps} />;
};

CustomIconSelect.propTypes = {
    options: PropTypes.array.isRequired,
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
};

export default memo(CustomIconSelect);
