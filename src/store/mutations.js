import { UPDATE_DATA, ADD_SELECTED, REMOVE_SELECTED } from './mutation-type';

export default {
  [UPDATE_DATA](state, data) {
    state.data = data;
  },
  [ADD_SELECTED](state, data) {
    if (state.selected.includes(data)) return;
    state.selected.push(data);
  },
  [REMOVE_SELECTED](state, data) {
    state.selected = state.selected.filter(item => item !== data);
  }
};
