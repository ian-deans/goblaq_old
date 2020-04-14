import React from "react";

export class ErrorBoundary extends React.Component<
  {},
  { hasError: boolean; info: any }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false, info: undefined };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // console.error(error, errorInfo);
    this.setState({ ...this.state, info: error.message });
  }

  render() {
    const { hasError, info } = this.state;
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h1>An Error Occured!</h1>
          <p>{info}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
