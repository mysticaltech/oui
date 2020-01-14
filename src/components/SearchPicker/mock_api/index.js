import MOCK_DATA from './mock_data';

export const getSearchFunction = (DELAY = 500) => ({ query, per_page }) => {
  return new Promise(r => setTimeout(r, DELAY)).then(() => {
    return MOCK_DATA.filter(item => {
      return item.name.includes(query) || item.description.includes(query);
    }).slice(0, per_page);
  });
};
