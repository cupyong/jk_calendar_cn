// import React from "react";
// import ReactDOM from "react-dom";
// import Calendar from 'rc-calendar';
// const App = () => {
//     return (
//         <div>
//             <p>React here!sdsd</p>
//             <Calendar />
//         </div>
//     );
// };
// export default App;
// ReactDOM.render(<App />, document.getElementById("app"));
/* eslint react/no-multi-comp:0, no-console:0 */
import React from 'react';
import ReactDOM from 'react-dom';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import Trigger from 'rc-trigger';
import RangeHtml from './range'
import moment from 'moment'

import './font.css'
// import Picker from 'rc-calendar/lib/Picker';
// import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
// import zhCN from 'rc-calendar/lib/locale/zh_CN';
// import enUS from 'rc-calendar/lib/locale/en_US';
// import TimePickerPanel from 'rc-time-picker/lib/Panel';
// import 'rc-calendar/assets/index.css';
// import 'rc-time-picker/assets/index.css';

// import moment from 'moment';
// import 'moment/locale/zh-cn';
// import 'moment/locale/en-gb';
// import Trigger from 'rc-trigger';
const autoAdjustOverflow = {
    adjustX: 1,
    adjustY: 1,
};

const targetOffset = [0, 0];
const placements = {
    bottomLeft: {
        points: ['tl', 'tl'],
        overflow: autoAdjustOverflow,
        offset: [0, 46],
        targetOffset,
    },
    bottomRight: {
        points: ['tr', 'tr'],
        overflow: autoAdjustOverflow,
        offset: [0, -3],
        targetOffset,
    },
    topRight: {
        points: ['br', 'br'],
        overflow: autoAdjustOverflow,
        offset: [0, 3],
        targetOffset,
    },
    topLeft: {
        points: ['bl', 'bl'],
        overflow: autoAdjustOverflow,
        offset: [0, 3],
        targetOffset,
    },
};

function noop() {
}
function refFn(field, component) {
    this[field] = component;
}

const Picker = createReactClass({
    propTypes: {
        submit: PropTypes.func,
        animation: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
        disabled: PropTypes.bool,
        transitionName: PropTypes.string,
        // onChange: PropTypes.func,
        onOpenChange: PropTypes.func,
        children: PropTypes.func,
        getCalendarContainer: PropTypes.func,
        calendar: PropTypes.element,
        style: PropTypes.object,
        open: PropTypes.bool,
        defaultOpen: PropTypes.bool,
        prefixCls: PropTypes.string,
        placement: PropTypes.any,
        value: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array,
        ]),
        defaultValue: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array,
        ]),
        setDefaultValue: PropTypes.func,
        align: PropTypes.object,
    },
    getDefaultProps() {
        return {
            prefixCls: 'rc-calendar-picker',
            style: {},
            align: {},
            placement: 'bottomLeft',
            defaultOpen: false,
            onChange: noop,
            onOpenChange: noop,
        };
    },

    getInitialState() {
        const props = this.props;
        let open;
        if ('open' in props) {
            open = props.open;
        } else {
            open = props.defaultOpen;
        }
        const value = props.value || props.defaultValue;
        this.saveCalendarRef = refFn.bind(this, 'calendarInstance');
        return {
            open,
            value,
        };
    },

    componentWillReceiveProps(nextProps) {
        const { value, open } = nextProps;
        if ('value' in nextProps) {
            this.setState({
                value,
            });
        }
        if (open !== undefined) {
            this.setState({
                open,
            });
        }
    },

    componentDidUpdate(_, prevState) {
        if (!prevState.open && this.state.open) {
            // setTimeout is for making sure saveCalendarRef happen before focusCalendar
            this.focusTimeout = setTimeout(this.focusCalendar, 0, this);
        }
    },

    componentWillUnmount() {
        clearTimeout(this.focusTimeout);
    },

    onCalendarKeyDown(event) {
        if (event.keyCode === KeyCode.ESC) {
            event.stopPropagation();
            this.close(this.focus);
        }
    },

    onCalendarSelect(value, cause = {}) {
        const props = this.props;
        if (!('value' in props)) {
            this.setState({
                value,
            });
        }
        if (
            cause.source === 'keyboard' ||
            (!props.calendar.props.timePicker && cause.source !== 'dateInput') ||
            cause.source === 'todayButton') {
            this.close(this.focus);
        }
        props.onChange(value);
    },

    onKeyDown(event) {
        if (event.keyCode === KeyCode.DOWN && !this.state.open) {
            this.open();
            event.preventDefault();
        }
    },

    onCalendarOk() {
        this.close(this.focus);
    },

    onCalendarClear() {
        this.close(this.focus);
    },

    onVisibleChange(open) {
        this.setOpen(open);
    },

    getCalendarElement() {
        const props = this.props;
        const state = this.state;
        const calendarProps = props.calendar.props;
        const { value } = state;
        const defaultValue = value;
        const extraProps = {
            ref: this.saveCalendarRef,
            defaultValue: defaultValue || calendarProps.defaultValue,
            selectedValue: value,
            onKeyDown: this.onCalendarKeyDown,
            onOk: createChainedFunction(calendarProps.onOk, this.onCalendarOk),
            onSelect: createChainedFunction(calendarProps.onSelect, this.onCalendarSelect),
            onClear: createChainedFunction(calendarProps.onClear, this.onCalendarClear),
        };

        return React.cloneElement(props.calendar, extraProps);
    },
    getCalendarElement1() {
        return React.cloneElement(rangeHtml1, {});
    },

    setOpen(open, callback) {
        const { onOpenChange } = this.props;
        if (this.state.open !== open) {
            if (!('open' in this.props)) {
                this.setState({
                    open,
                }, callback);
            }
            onOpenChange(open);
        }
    },

    open(callback) {
        this.setOpen(true, callback);
    },

    close(callback) {
        this.setOpen(false, callback);
    },

    focus() {
        if (!this.state.open) {
            ReactDOM.findDOMNode(this).focus();
        }
    },

    focusCalendar() {
        if (this.state.open && !!this.calendarInstance) {
            this.calendarInstance.focus();
        }
    },
    submit(value) {
        this.props.submit(value)
        this.setState({
            value: value
        })
        this.close()
    },
    closeButton() {
        this.close()
    },
    setValue(value) {
        this.setState({
            value: value
        })

    },
    render() {
        const props = this.props;
        const {
      prefixCls, placement,
            style, getCalendarContainer,
            align, animation,
            disabled,
            dropdownClassName,
            transitionName, children,
            defaultValue,
    } = props;
        const state = this.state;
        let propsVaule = state.value || this.props.value
        let inputValue = ""
        let rangeValue = "";
        if (propsVaule instanceof Array) {
            if (propsVaule.length == 2) {
                inputValue = propsVaule[0] + "至" + propsVaule[1]
                rangeValue = [moment(propsVaule[0]), moment(propsVaule[1])]
            }
        }
        if (inputValue.length == 0) {
            inputValue = "请选择时间范围"
        }
        let rangeHtml1 = (<RangeHtml submit={this.submit} value={propsVaule} close={this.closeButton} />)
        // popup={rangeHtml(rangeValue,this.submit,this.closeButton,this.setValue)}
        return <Trigger
            popup={rangeHtml1}
            popupAlign={align}
            builtinPlacements={placements}
            popupPlacement={placement}
            action={(disabled && !state.open) ? [] : ['click']}
            destroyPopupOnHide
            getPopupContainer={getCalendarContainer}
            popupStyle={style}
            popupAnimation={"slide-up"}
            popupTransitionName={transitionName}
            popupVisible={state.open}
            onPopupVisibleChange={this.onVisibleChange}
            prefixCls={prefixCls}
            popupClassName={dropdownClassName}
        >
            <div className="report-date-picker-wrap">
                <span className="iconfont icon-rili"></span>
                <input id="inputDate" type="text" className="form-control active" readOnly="readonly"
                    value={inputValue}
                />
            </div>
        </Trigger>
    }
})
export default Picker;
