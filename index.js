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

// 根据相应 models 命名 初始化 相应的带该model前缀的 action 方法
// 1. 函数显示调用 简化 action 调用方法的编写   副作用的  effects 里 可直接调用传入的 修改相应的同名 reducer 的方法
// 2. 可选择性使用 自动创建项目通用的 增删改查 相关 aciton
export const isLoading = props => {
  const {
    config = [],
      extraLoading = [],
      path = '',
      actions = {},
      defConfig = [],
  } = props;
  const configs = config.length > 0 ? config : [...crudConfigs, ...extraLoading];
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
    console.log(' actionsactions ： ', actions);
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
  const createDispatch = (model) => dispatch => {
    const actions = Object.keys(model.reducers);
    const asyncActions = Object.keys(model.effects);
    const dispatchActions = {};
    [
      ...actions,
      ...asyncActions,
    ].forEach(types => (dispatchActions[types] = data => dispatch({
      type: `${prefix}/${types}`,
      payload: data,
    })));
    return dispatchActions;
  }

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
