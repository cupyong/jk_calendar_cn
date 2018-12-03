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
import Picker from 'rc-calendar/lib/Picker';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import 'rc-calendar/assets/index.css';
import 'rc-time-picker/assets/index.css';
import createReactClass from 'create-react-class';

import moment from 'moment';
import 'moment/locale/zh-cn';
// import 'moment/locale/en-gb';
import Trigger from 'rc-trigger';
import './index.css'
// import { aa, bb } from 'test';

// const cn = location.search.indexOf('cn') !== -1;
const cn = true

if (cn) {
    moment.locale('zh-cn');
} else {
    moment.locale('en-gb');
}

const now = moment();
if (cn) {
    now.utcOffset(8);
} else {
    now.utcOffset(0);
}

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

const timePickerElement = (
    <TimePickerPanel
        defaultValue={[moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]}
    />
);

function newArray(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}

function disabledDate(current) {
    const date = moment();
    date.hour(0);
    date.minute(0);
    date.second(0);
    return current.isBefore(date);  // can not select days before today
}

function disabledTime(time, type) {
    console.log('disabledTime', time, type);
    if (type === 'start') {
        return {
            disabledHours() {
                const hours = newArray(0, 60);
                hours.splice(20, 4);
                return hours;
            },
            disabledMinutes(h) {
                if (h === 20) {
                    return newArray(0, 31);
                } else if (h === 23) {
                    return newArray(30, 60);
                }
                return [];
            },
            disabledSeconds() {
                return [55, 56];
            },
        };
    }
    return {
        disabledHours() {
            const hours = newArray(0, 60);
            hours.splice(2, 6);
            return hours;
        },
        disabledMinutes(h) {
            if (h === 20) {
                return newArray(0, 31);
            } else if (h === 23) {
                return newArray(30, 60);
            }
            return [];
        },
        disabledSeconds() {
            return [55, 56];
        },
    };
}

const formatStr = 'YYYY-MM-DD HH:mm:ss';
function format(v) {
    return v ? v.format(formatStr) : '';
}

function isValidRange(v) {
    return v && v[0] && v[1];
}

// function onStandaloneChange(value) {

// }

function onStandaloneSelect(value) {
    console.log('onSelect');
    console.log(format(value[0]), format(value[1]));
}

function onOk(date) {
    console.log('onSelect');
}

const rangeHtml1 = createReactClass({

    componentWillMount() {
    },
    componentDidMount() {
    },
    componentWillReceiveProps(nextProps) {
    },
    getInitialState() {
        const props = this.props;
        // let defaultValue = [now, now.clone().add(1, 'days')]
        // if (this.props.defaultValue) {
        //     defaultValue = this.props.defaultValue
        // }
        //  let inputValue=""
        // if (defaultValue instanceof Array) {
        //     if (defaultValue.length == 2) {
        //         inputValue = moment(defaultValue[0]).format('YYYY-MM-DD') + "至" + moment(defaultValue[1]).format('YYYY-MM-DD')
        //     }
        // }
        return {
            // momentValue:inputValue,
            value: props.value
        }

    },
    format(v) {
        return v ? v.format('YYYY-MM-DD') : '';
    },
    onStandaloneChange(value) {
        console.log('onChange');
        if (value[0] && value[1]) {
            this.setState({
                value: [this.format(value[0]), this.format(value[1])]
            })
        }
        // console.log(value[0] && format(value[0]), value[1] && format(value[1]));
    },
    submit() {
        this.props.submit(this.state.value)
    },

    getLast30Days() {
        let date = []
        date.push(moment().subtract('days', 30).format('YYYY-MM-DD'))
        date.push(moment().subtract('days', 1).format('YYYY-MM-DD'))
        return date
    },
    getLast7Days() {
        let date = []
        date.push(moment().subtract('days', 7).format('YYYY-MM-DD'))
        date.push(moment().subtract('days', 1).format('YYYY-MM-DD'))
        return date
    },
    getLastWeekDays() {
        let date = []
        let weekOfday = parseInt(moment().format('d')) // 计算今天是这周第几天  周日为一周中的第一天
        let start = moment().subtract(weekOfday + 6, 'days').format('YYYY-MM-DD') // 周一日期
        let end = moment().subtract(weekOfday , 'days').format('YYYY-MM-DD') // 周日日期
        date.push(start)
        date.push(end)
        return date
    },
    getLastMonthDays() {
        let date = []
        let start = moment().subtract('month', 1).format('YYYY-MM') + '-01'
        let end = moment(start).subtract('month', -1).add('days', -1).format('YYYY-MM-DD')
        date.push(start)
        date.push(end)
        return date
    },
    getCurrWeekDays() {
        let date = []
        let weekOfday = parseInt(moment().format('d')) // 计算今天是这周第几天 周日为一周中的第一天
        let start = moment().subtract(weekOfday-1, 'days').format('YYYY-MM-DD') // 周一日期
        let end = moment().add(7 - weekOfday , 'days').format('YYYY-MM-DD') // 周日日期
        date.push(start)
        date.push(end)
        return date
    },
    getCurrMonthDays() {
        let date = []
        let start = moment().add('month', 0).format('YYYY-MM') + '-01'
        let end = moment(start).add('month', 1).add('days', -1).format('YYYY-MM-DD')
        date.push(start)
        date.push(end)
        return date
    },
    shortcut() {
        let yesterday = [moment().subtract(1, 'days').format('YYYY-MM-DD'), moment().subtract(1, 'days').format('YYYY-MM-DD')]
        let today = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
        let LastWeekDays = this.getLastWeekDays()
        let CurrWeekDays = this.getCurrWeekDays()
        let LastMonthDays = this.getLastMonthDays()
        let CurrMonthDays = this.getCurrMonthDays()
        let Last7Days = this.getLast7Days()
        let Last30Days = this.getLast30Days()
        return [yesterday, today, LastWeekDays, CurrWeekDays, LastMonthDays, CurrMonthDays, Last7Days, Last30Days]
    },
    setShortcut(value) {
        this.setState({value:value})
        this.props.submit(value)
    },
    getSelectClassName(value){
        if(value[0]==this.state.value[0]&&value[1]==this.state.value[1]){
            return "active"
        }
        return ""
    },
    render() {
        let rangeValue = [now, now.clone().add(1, 'days')]
        if (this.state.value) {
            if (this.state.value instanceof Array) {
                if (this.state.value.length == 2) {
                    rangeValue = [moment(this.state.value[0]), moment(this.state.value[1])]
                }
            }
        }
        let inputValue = this.format(rangeValue[0]) + "至" + this.format(rangeValue[1])
        
        let shortcut = this.shortcut()
        return (
            <div className="daterangepicker">
                <div className="title"><div className="real-time">{inputValue}</div></div>
                <div className="calendar-wrap" style={{ margin: 10, display: "flex" }}>
                    <div className="ranges">
                        <ul>
                            <li className={this.getSelectClassName(shortcut[0])}  onClick={() => { this.setShortcut(shortcut[0]) }}>昨日</li>
                            <li className={this.getSelectClassName(shortcut[1])}  onClick={() => { this.setShortcut(shortcut[1]) }}>今日</li>
                            <li className={this.getSelectClassName(shortcut[2])}  onClick={() => { this.setShortcut(shortcut[2]) }}>上周</li>
                            <li className={this.getSelectClassName(shortcut[3])}  onClick={() => { this.setShortcut(shortcut[3]) }}>本周</li>
                            <li className={this.getSelectClassName(shortcut[4])}  onClick={() => { this.setShortcut(shortcut[4]) }}>上月</li>
                            <li className={this.getSelectClassName(shortcut[5])}  onClick={() => { this.setShortcut(shortcut[5]) }}>本月</li>
                            <li className={this.getSelectClassName(shortcut[6])}  onClick={() => { this.setShortcut(shortcut[6]) }}>过去 7 天</li>
                            <li className={this.getSelectClassName(shortcut[7])}  onClick={() => { this.setShortcut(shortcut[7]) }}>过去 30 天</li>
                        </ul>
                    </div>
                    <RangeCalendar
                        showWeekNumber={false}
                        dateInputPlaceholder={['开始时间', '结束时间']}
                        defaultSelectedValue={rangeValue}
                        locale={zhCN}
                        disabledTime={disabledTime}
                        showToday={false}
                        onOk={onOk}
                        onChange={this.onStandaloneChange}
                        showToday={false}
                        showDateInput={false}
                    />
                </div>
                <div className="toolbar">
                    <span className="item">
                        <button className="cancelBtn btn btn-link btn-small"
                            onClick={() => { this.props.close({}) }}
                        >取消</button>&nbsp;
        <button className="applyBtn btn btn-primary btn-small"
                            onClick={() => { this.submit({}) }}
                        >确定</button>
                    </span>
                </div>
            </div>
        );
    }
})

export default rangeHtml1;

// export function rangeHtml(defaultValue, submit,close) {

//     if (!defaultValue) {
//         defaultValue = [now, now.clone().add(1, 'days')]
//     }
//     return <div className="daterangepicker">
//         <div className="title"><div className="real-time">2018-10-20至2018-11-18</div></div>
//         <div className="calendar-wrap" style={{ margin: 10, display: "flex" }}>
//             <div className="ranges">
//                 <ul>
//                     <li className="">昨日</li>
//                     <li className="">今日</li>
//                     <li className="">上周</li>
//                     <li className="">本周</li>
//                     <li className="">上月</li>
//                     <li className="">本月</li>
//                     <li className="">去年</li>
//                     <li className="active">本年</li>
//                     <li className="">过去 7 天</li>
//                     <li className="">过去 30 天</li>
//                     <li className="">过去 60 天</li>
//                 </ul>
//             </div>
//             <RangeCalendar
//                 showWeekNumber={false}
//                 dateInputPlaceholder={['开始时间', '结束时间']}
//                 defaultSelectedValue={defaultValue}
//                 locale={zhCN}
//                 disabledTime={disabledTime}
//                 showToday={false}
//                 onOk={onOk}
//                 onChange={onStandaloneChange}
//                 showToday={false}
//                 showDateInput={false}
//             />
//         </div>
//         <div className="toolbar">
//             <span className="item">
//                 <button className="cancelBtn btn btn-link btn-small"
//                    onClick={() => { close({}) }}
//                 >取消</button>&nbsp;

//         <button className="applyBtn btn btn-primary btn-small"
//                  onClick={() => { submit({}) }}
//                 >确定</button>
//             </span>
//         </div>
//     </div>
// }

