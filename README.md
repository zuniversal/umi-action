# umi project


## 库说明

```
  基于 dva 根据相应 models 命名 初始化 相应的带该model前缀的 action dispatch 方法，利用 函数柯理化 传入命名空间，创建生成相关方法
  1. 函数显示调用 简化 action 调用方法的编写 副作用的 effects 里 可直接调用传入的 修改相应的同名 reducer 的方法
  2. 可选择性使用 自动创建项目通用的 增删改查等 相关 类组件/函数式组件使用 aciton dispatch
```

## Getting Started

Install dependencies,

```bash
$ npm i umi-action

$ yarn add umi-action
```

#### 使用例子在源码包里的 examples 目录下 
  * [JSX](https://github.com/zuniversal/umi-action/blob/master/examples/template.js)

  
#### model 文件定义使用

```js
import { init } from 'umi-action';
// import * as services from '@/services/template';

const namespace = 'template';
const { createAction, createDispatch } = init(namespace);// 初始化 ： 利用 函数柯理化 传入命名空间，创建生成相关方法

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
```


#### class 类组件内使用

```jsx
import React, { useEffect } from 'react';
import { actions, mapStateToProps, mapDispatchToProps, } from '@/models/template';
import { connect } from 'umi';

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class Demo extends PureComponent {
  getListAsync = params => {
    // 组件自动注入对应action方法
    this.props.getListAsync(params);
  }

  render() {
    return (
      <div className="demo">
        Demo
        <button type="primary" onClick={this.getListAsync}>getListAsync</button>
      </div>
    );
  }
}

export default Demo
```


#### 函数式组件内使用

```jsx
import React, { useEffect } from 'react';
import { actions, mapStateToProps, mapDispatchToProps, } from '@/models/template';
import { connect } from 'umi';

const Demo = props => {
  const getListAsync = params => {
    // 组件props自动注入对应action方法
    props.getListAsync(params);
  }
  useEffect(() => {
    getListAsync({});
  }, []);

  return (
    <div className="demo">
      Demo
      <button type="primary" onClick={getListAsync}>getListAsync</button>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Demo);
```


#### 主要提供如下方法 其它方法详细作用请查看源码

```js
createActions// 生成 多个 action
createAction// 生成 单个 action
createDispatch// 生成 dispatch

transferActions
createCRUD
turnAction
batchTurn
```


#### 使用方式

```js
import { init } from 'umi-action';
const namespace = 'template';
const { createActions, createAction } = init(namespace);

const otherActions = [
  'getUserListAsync',
  'getUserAsync',
  'addUserAsync',
  'removeUserAsync',
];

const batchTurnActions = ['addToCart', 'changeName'];

// 批量创建导出对应相关方法
export const actions = {
  ...createActions(otherActions, batchTurnActions),
};
```