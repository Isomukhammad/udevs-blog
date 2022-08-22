import STORIES_ACTION_TYPE from "./stories.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setStoriesMap = (stories) => createAction(STORIES_ACTION_TYPE.SET_STORIES_MAP, stories);