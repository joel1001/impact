import axios from "axios";

import actions from "./types";

const saveMetadata = (payload) => ({
  type: actions.METADATA,
  payload,
});

// Actions
export const SaveMetadada = (data) => async (dispatch) => {
  try {
    dispatch(saveMetadata(data));
  } catch (e) {}
};
