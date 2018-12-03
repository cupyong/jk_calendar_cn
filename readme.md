###package.json

```Son
"calendar_cn": "git+ssh://code@code.timectrl.net:10022/components/calendar_cn.git#1.0.1",
```



### examle

```
import Picker from 'calendar_cn'
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

