import React, { Component } from "react";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";
import { logger } from "../../hooks/functions/Logger";

/**
 * hoc component for catch exeptions
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        //   logErrorToMyService(error, errorInfo);
        logger.error({ error: error, errorInfo: errorInfo });
        this.setState({
            errorName: error.name,
            errorMessage: error.message,
        });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <ErrorMessage
                    name={this.state.errorName}
                    message={this.state.errorMessage}
                />
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
