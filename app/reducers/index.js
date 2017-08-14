import {combineReducers} from "redux";

import userinfo from "./userinfo";
import postsListOfChannelReducer from "./posts_list_of_channel";


// 合并各个reducer
export default combineReducers({
    userInfo: userinfo,
    postsListOfChannel: postsListOfChannelReducer,

});