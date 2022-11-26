import { init } from 'umi-action';
// import * as services from '@/services/template';

const namespace = 'template';
const { createAction, createDispatch } = init(namespace); // 初始化 ： 利用 函数柯理化 传入命名空间，创建生成相关方法

// 原 dva model 内容
const model = {
  namespace,

  state: {
    dataList: [],
  },

  reducers: {
    getList(state, { payload, type }) {
      return {
        ...state,
      };
    },
  },

  effects: {
    *getListAsync({ payload, action, type }, { call, put }) {
      console.log(' getListAsync ： '); //
      // 异步逻辑操作等
      // const res = yield call(services.getList, payload);
      // yield put(action({ ...res, payload }));
    },
  },
};

// 基于命名空间 暴露并生成相关 action dispatch 方法 供 class 函数式组件调用
export const actions = createAction(model);
export const mapStateToProps = state => state[namespace];
export const mapDispatchToProps = createDispatch(model);

export default model;
