### package.json

```
npm i  jk_calendar_cn --save

```

### examle

```
import Picker from 'jk_calendar_cn'
function submit(value) {
    console.log("submit",value)
}

function onChange  (value) {
    console.log('onChange', value);
}

ReactDOM.render(
    <Picker
        defaultValue={["2018-10-10", "2018-10-20"]}
        submit={submit}
    >
    </Picker>, document.getElementById('app'));
    }

```
![image][https://github.com/cupyong/jk_calendar_cn/blob/master/ex.jpg?raw=true]

