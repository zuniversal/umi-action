const suffix = 'Async';

export const action = type => payload => ({
  type,
  payload,
});

export const crudConfigs = [
  'getListAsync',
  'getItemAsync',
  'addItemAsync',
  'editItemAsync',
  'removeItemAsync',
  'removeItemsAsync',
];

export const commonConfigs = ['setSearchInfo', 'showFormModal', 'onCancel'];

export const isLoading = props => {
  const {
    config = [],
    extraLoading = [],
    path = '',
    actions = {},
    defConfig = [],
  } = props;
  const configs =
    config.length > 0 ? config : [...crudConfigs, ...extraLoading];
  return configs.some(asyncSuffix => {
    return actions[`${path}/${asyncSuffix}`];
  });
};

export const init = (prefix, noDefault) => {
  const isCrudArr = noDefault ? [] : crudConfigs;
  const turnAction = (types = '') => payload => ({
    type: prefix + '/' + types,
    payload,
    action: action(types),
  });
  const createAction = (types = '') => payload => ({
    type: prefix + '/' + types,
    payload,
    action: action(types.split(suffix)[0]),
  });
  const transferActions = (config = []) => {
    const actions = {};
    config.forEach(types => (actions[types] = createAction(types)));
    return actions;
  };
  const createCRUD = (config = []) => {
    const actions = {};
    config.forEach(types => (actions[types] = createAction(types)));
    return actions;
  };
  const batchTurn = (config = []) => {
    const actions = {};
    config.forEach(types => (actions[types] = turnAction(types)));
    return actions;
  };
  const createDispatch = model => dispatch => {
    const actions = Object.keys(model.reducers);
    const asyncActions = Object.keys(model.effects);
    const dispatchActions = {};
    [...actions, ...asyncActions].forEach(
      types =>
        (dispatchActions[types] = data =>
          dispatch({
            type: `${prefix}/${types}`,
            payload: data,
          })),
    );
    return dispatchActions;
  };

  return {
    names: 'zyb',
    transferActions: (config = []) => transferActions(config),
    createCRUD: (config = []) => createCRUD([...isCrudArr, ...config]),
    turnAction,
    batchTurn: (config = []) => batchTurn([...commonConfigs, ...config]),
    createActions: (asyncConfig = [], config = []) => ({
      ...createCRUD([...isCrudArr, ...asyncConfig]),
      ...batchTurn([...commonConfigs, ...config, 'reset']),
    }),
    createAction: model => {
      const actions = Object.keys(model.reducers);
      const asyncActions = Object.keys(model.effects);
      return {
        ...batchTurn(actions),
        ...createCRUD(asyncActions),
      };
    },
    createDispatch,
  };
};
