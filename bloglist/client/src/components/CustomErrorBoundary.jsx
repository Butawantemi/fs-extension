import React from "react";

class CustomErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(
      "CustomErrorBoundary caught a rendering crash:",
      error,
      errorInfo,
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>Something went wrong</h2>
          <p style={{ color: "gray", marginTop: "0.5rem" }}>
            A runtime rendering exception occurred.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default CustomErrorBoundary;
