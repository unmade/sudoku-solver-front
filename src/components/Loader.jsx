import React from 'react';
import { Meter } from 'grommet';


class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.state = {
      value: 0,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.incValue();
    }, 50);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  incValue() {
    const { value } = this.state;
    this.setState({
      value: (value < 100) ? value + 1 : 0,
    });
  }

  render() {
    const { value } = this.state;
    return (
      <Meter
        size="xxsmall"
        thickness="xsmall"
        type="circle"
        background="light-2"
        values={[{ value, color: 'accent-1' }]}
      />
    );
  }
}


export default Loader;
