import { UPDATE_DATA } from './mutation-type';

function getTag({ commit, state }) {
  const reqUrl = `${endpoint}?target=tag&page=${state.tag.nextPage}`;
  fetch(reqUrl, { mode: 'cors' })
    .then(response => response.json())
    .then(({ body, nextPage }) => {
      commit(UPDATE_LIST, { data: JSON.parse(body), nextPage, target: 'tag' });
    });
}

export default {
  getTag,
  getChineseTag
};
