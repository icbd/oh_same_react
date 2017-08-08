import {browserHistory, hashHistory} from "react-router";

let History;
if (__DEV__) {
    History = hashHistory;
} else {
    History = browserHistory;
}

export {History};