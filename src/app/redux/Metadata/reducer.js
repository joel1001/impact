import actionTypes from "./types";
import threekitConfig from '../../../config/threekitConfig';

const INIT_STATE = {
 
};

export default (state = INIT_STATE, action) => {
  let _data = state.data;
  const { payload, type } = action;
  switch (type) {
    default:
      return { ...state };
  }
};
