import { debounce, noop } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import { keyboardTracker } from '../../utils/accessibility';

import Input from '../Input';

const INITIAL_SEARCH_PAGE_SIZE = 5;
const INPUT_DEBOUNCE_PERIOD = 120;

@keyboardTracker
class SearchPicker extends React.Component {
  static propTypes = {
    /**
     * A render function that is invoked with the following info:
     *   availableEntities {Array<Entity>} - The list of entities available
     *                     based on the current input. If no query term is
     *                     entered, the default search collection is used.
     *
     *   isLoading         {Boolean} - Whether or not a search is in progress.
     *   renderInput       {Function<props>} - A function to render the <Input>
     *   searchQuery       {String} - The current search term
     *   currentFauxFocusIndex {Number} - Index of the item currently selected.
     *   resultsText       {Object} - An object containing search result
     *                     summaries based on the the types provided
     *                     See this.getResultsText
     *
     */
    children: PropTypes.func.isRequired,

    /**
     * Which index in the list is currently selected.
     * via @keyboardTracker
     */
    currentFauxFocusIndex: PropTypes.number.isRequired,

    /**
     * A handler for the input element event onKeyDown
     * via @keyboardTracker
     */
    handleKeyDown: PropTypes.object.isRequired,

    /**
     * The element ref to use for capturing keyboard input.
     * via @keyboardTracker
     */
    keyboardRef: PropTypes.shape({ current: PropTypes.elementType }),

    /**
     * Handler to call when an item is selected via the keyboard.
     */
    onItemSelected: PropTypes.func.isRequired,

    /**
     * The function to invoke to execute an authenticated public API search.
     * Different consumers will have different methods of authenticating.
     *
     * @param {Object} requestConfig
     * @return {Promise}
     */
    searchFunction: PropTypes.func.isRequired,

    /**
     * Additional options to pass to the search function when a search is
     * executed. Type and query will be overridden by this component.
     */
    searchOptions: PropTypes.object,

    /**
     * An optional list of ids which should be considered "selected".
     * If provided, these ids will be filtered out of the list.
     */
    selectedEntityIds: PropTypes.array,

    /**
     * Sets the number of items for the list index tracker.
     * via @keyboardTracker
     */
    setItemCount: PropTypes.func,

    /**
     * Sets the item select callback fn for the list index tracker.
     * via @keyboardTracker
     */
    setOnItemSelect: PropTypes.func,

    /* The entity types we should query search for. */
    supportedTypes: PropTypes.array.isRequired,
  };

  static defaultProps = {
    searchOptions: {},
    selectedEntityIds: [],
    setItemCount: noop,
    setOnItemSelect: noop,
  };

  /**
   * Notify keyboardTracker what to do when ENTER is pressed on an item
   * and kickoff the initial search to populate the default result set.
   */
  componentDidMount = () => {
    const { searchFunction, searchOptions, setOnItemSelect, supportedTypes } = this.props;
    setOnItemSelect(() => this.handleItemSelected);

    searchFunction({
      ...searchOptions,
      types: supportedTypes,
      query: '',
      per_page: INITIAL_SEARCH_PAGE_SIZE,
    }).then(results => {
      const { searchQuery } = this.state;
      this.setState({
        defaultResults: results,
      });
      if (!searchQuery) {
        this.setState({
          isLoading: false,
        });
      }
    });
  };

  /**
   * Whenever the component updates, notify the keyboardTracker
   * of how many items are currently available. (this also resets
   * the faux focus index to 0)
   */
  componentDidUpdate = () => {
    const items = this.getAvailableEntities();
    this.props.setItemCount(items.length);
  };

  state = {
    currentSearch: null,
    defaultResults: [],
    isLoading: true,
    results: null,
    searchQuery: '',
  };

  handleItemSelected = index => {
    const { onItemSelected } = this.props;
    const { searchQuery } = this.state;
    onItemSelected(index, this.getAvailableEntities(), searchQuery);
  };

  /**
   * Handles changes to the search term by calling the debounced change handler.
   * If the term is an empty string, short circuit and reset the results.
   * @param {React.SyntheticEvent} event - The onInput event
   */
  handleOnInput = event => {
    const { value } = event.target;
    this.setState({
      searchQuery: value,
    });

    if (value) {
      this.handleOnInputDebounced(value);
    } else {
      const { currentSearch } = this.state;
      if (currentSearch) {
        currentSearch.reject('Search interrupted by empty search query.');
      }
      this.setState({
        isLoading: false,
        results: null,
        currentSearch: null,
      });
    }
  };

  /**
   * Execute the search function in a way that is cancellable by storing
   * the Promise resolution methods in state.
   * This enables subsequent invocations to cancel an in progress
   * search in favor of a new one.
   * @param {string} query - The term to search for.
   * @returns {Promise<Array>}
   */
  executeNewSearch = query =>
    new Promise((resolve, reject) => {
      const { searchFunction, searchOptions, supportedTypes } = this.props;
      const { currentSearch } = this.state;
      if (currentSearch) {
        currentSearch.reject(`Search interrupted by new search query: ${query}`);
      }
      this.setState({
        currentSearch: {
          resolve,
          reject,
        },
        isLoading: true,
      });
      searchFunction({
        ...searchOptions,
        types: supportedTypes,
        query: query.toLowerCase(),
      })
        .then(resolve, reject);
    });

  /**
   * A debounced method to invoke the search and store the result in state.
   * @param {string} query - The term to search for.
   */
  handleOnInputDebounced = debounce(query => {
    this.executeNewSearch(query).then(results => {
      const { searchQuery } = this.state;
      this.setState({
        isLoading: false,
        currentSearch: null,
      });
      // Ensure the query wasn't killed while waiting for the result.
      if (searchQuery) {
        this.setState({
          results,
        });
      }
    }, e => { /** Swallow rejections */});
  }, !!process.env.JEST_WORKER_ID ? 0 : INPUT_DEBOUNCE_PERIOD);

  /**
   * Filter the current result set to exclude selected entities.
   * @returns {Array<Object>}
   */
  getAvailableEntities = () => {
    const { selectedEntityIds } = this.props;
    return this.getResultSet().filter(result => !selectedEntityIds.includes(result.id));
  };

  /**
   * Helper method to return the current result set,
   * falling back to the default.
   * @returns {Array<Object>}
   */
  getResultSet = () => {
    const { results, defaultResults } = this.state;
    return results || defaultResults;
  };

  /**
   * Compute a human readable result text.
   * @returns {Object}
   */
  getResultsText = () => {
    const { supportedTypes } = this.props;
    const { isLoading, searchQuery } = this.state;
    const resultCount = this.getResultSet().length;
    const summaryNoun = supportedTypes.length > 1 ? 'entities' : `${supportedTypes[0]}s`;
    let summary = `Recently created ${summaryNoun}`;

    if (isLoading) {
      summary = `Searching for "${summaryNoun}" matching "${searchQuery}"`;
    } else if (searchQuery) {
      if (resultCount) {
        summary = `Found ${resultCount} ${summaryNoun} matching "${searchQuery}"`;
      } else {
        summary = `No ${summaryNoun} found matching "${searchQuery}"`;
      }
    }

    return {
      summary,
    };
  };

  /**
   * A render method passed to children so that they can render the search
   * input component wherever they like.
   * @param {Object} props - Any additional props to pass to the <Input>.
   * @returns {React.Component}
   */
  renderInput = (props = {}) => {
    const { handleKeyDown, supportedTypes } = this.props;
    const { searchQuery } = this.state;
    const { handleOnInput } = this;
    const placeholderNoun = supportedTypes.map(i => `${i}s`).join(',');
    return (
      <Input
        isFilter={ true }
        onInput={ handleOnInput }
        placeholder={ `Search for ${placeholderNoun}` }
        testSection={ `filter-${placeholderNoun}-input` }
        type="search"
        value={ searchQuery }
        onKeyDown={ handleKeyDown }
        { ...props }
      />
    );
  };

  /**
   * A simple render method that passes relevant state and controls to the
   * children.
   * @returns {React.Component}
   */
  render() {
    const { children, currentFauxFocusIndex } = this.props;
    const { searchQuery, isLoading } = this.state;
    const { renderInput } = this;
    const availableEntities = this.getAvailableEntities();
    return (
      children({
        availableEntities,
        isLoading,
        renderInput,
        searchQuery,
        currentFauxFocusIndex,
        resultsText: this.getResultsText(),
      })
    );
  }
}

export default SearchPicker;
