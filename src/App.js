import React from "react";
import "./styles.css";

// Normal counter component
class NormalCounter extends React.Component {
  constructor() {
    super();
    this.state = { count: 0 };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    this.setState((prevState) => ({
      count: prevState.count + 1
    }));
  }

  decrement() {
    this.setState((prevState) => ({
      count: prevState.count - 1
    }));
  }

  render() {
    return (
      <>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
      </>
    );
  }
}

// Patterns for sharing stateful logic in react

/* ------ 1.Counter with hooks pattern ------ */
// Default way to share stateful logic in modern react
function useCounter() {
  const [count, setCount] = React.useState(0);

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }

  return [count, increment, decrement];
}

function HooksCounter() {
  const [count, increment, decrement] = useCounter();

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </>
  );
}
/* ------ 1.Counter with hooks pattern end ------ */

/* ------ 2.Counter with render props pattern ------ */
// Before hooks render props was the favored way of sharing
// stateful logic in the react community.
// For more info: https://medium.com/componentdidblog/use-a-render-prop-50de598f11ce
// Used in many places like react-router, formik, downshift and etc...
class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0
    };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    this.setState((prevState) => ({
      count: prevState.count + 1
    }));
  }

  decrement() {
    this.setState((prevState) => ({
      count: prevState.count - 1
    }));
  }

  render() {
    const { children } = this.props;
    const { count } = this.state;

    return children(count, this.increment, this.decrement);
  }
}
/* ------ 2.Counter with render props pattern end ------ */

/* ------ 3.Counter with higher order component pattern ------ */
function withCounter(Component) {
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        count: 0
      };

      this.increment = this.increment.bind(this);
      this.decrement = this.decrement.bind(this);
    }

    increment() {
      this.setState((prevState) => ({ count: prevState.count + 1 }));
    }

    decrement() {
      this.setState((prevState) => ({ count: prevState.count - 1 }));
    }

    render() {
      const { count } = this.state;
      return (
        <Component
          {...{
            ...this.props,
            count,
            increment: this.increment,
            decrement: this.decrement
          }}
        />
      );
    }
  };
}

const HOCCounter = withCounter(CompnentNeedingCounterFunctionality);
/* ------ 3.Counter with higher order component pattern end ------ */

function CompnentNeedingCounterFunctionality({ count, increment, decrement }) {
  return (
    <>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </>
  );
}

export default function App() {
  return (
    <div className="App">
      <div>
        <p>Normal Counter</p>
        <NormalCounter />
      </div>

      <div>
        <p>Counter with hooks:</p>
        <HooksCounter />
      </div>
      {/* Ask for questions */}
      <div>
        <p>Counter with render props:</p>
        <Counter>
          {(count, increment, decrement) => (
            <CompnentNeedingCounterFunctionality
              count={count}
              increment={increment}
              decrement={decrement}
            />
          )}
        </Counter>
      </div>
      {/* Ask for questions */}
      <div>
        <p>Counter with higher order component:</p>
        <HOCCounter />
      </div>
      {/* Ask for questions */}
    </div>
  );
}
