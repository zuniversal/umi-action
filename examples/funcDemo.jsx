import React, { useEffect } from 'react';
import {
  actions,
  mapStateToProps,
  mapDispatchToProps,
} from '@/models/template';
import { connect } from 'umi';

const Demo = props => {
  const getListAsync = params => {
    // 组件props自动注入对应简化后可以被调用的action方法
    props.getListAsync(params);
  };
  useEffect(() => {
    getListAsync({});
  }, []);

  return (
    <div className="demo">
      Demo
      <button type="primary" onClick={getListAsync}>
        getListAsync
      </button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Demo);
