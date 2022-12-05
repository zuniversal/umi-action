import React from 'react';

export default ({ actions }) => Com => {
  class SmartHoc extends React.Component {
    constructor(props) {
      super(props);
      const createActions = params => {
        const actionObj = {};
        Object.keys(actions).forEach(
          key =>
            (actionObj[key] = params =>
              this.props.dispatch(actions[key](params))),
        );
        return actionObj;
      };
      this.actionProps = createActions();
    }

    render() {
      return <Com {...this.props} {...this.actionProps} />;
    }
  }

  return SmartHoc;
};
