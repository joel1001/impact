import { combineReducers } from "redux";
import Threekit from './Threekit/reducer';
import Config from './Config/reducer';

const reducers = combineReducers({
    Threekit,
    Config,
});

export default reducers;
