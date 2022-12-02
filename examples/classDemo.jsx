import React from 'react';
import {
  actions,
  mapStateToProps,
  mapDispatchToProps,
} from './models/template';
import SmartHoc from './SmartHoc';
import { connect } from 'umi';

@connect(mapStateToProps, mapDispatchToProps)
// 结合自定义 高阶组件 自动注入相关action方法
@SmartHoc({
  actions,
})
class Demo extends PureComponent {
  getListAsync = params => {
    // 组件自动注入获取到对应简化后可以被调用action方法
    this.props.getListAsync(params);
  };

  render() {
    return (
      <div className="demo">
        Demo
        <button type="primary" onClick={this.getListAsync}>
          getListAsync
        </button>
      </div>
    );
  }
}

export default Demo;
