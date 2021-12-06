import { combineReducers } from "redux";
import Threekit from './Threekit/reducer';
import Config from './Config/reducer';
import Metadata from "./Metadata/reducer";

const reducers = combineReducers({
    Threekit,
    Config,
    Metadata
});

export default reducers;
