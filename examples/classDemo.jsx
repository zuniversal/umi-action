import React, { useEffect } from 'react';
import {
  actions,
  mapStateToProps,
  mapDispatchToProps,
} from './models/template';
import { connect } from 'umi';

@connect(mapStateToProps, mapDispatchToProps)
class Demo extends PureComponent {
  getListAsync = params => {
    // 组件自动注入对应action方法
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
