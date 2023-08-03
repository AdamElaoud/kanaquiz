import { ReactNode } from "@/common/types";
import { Component, ErrorInfo } from "react";

interface Props {
    children: ReactNode
};

interface State {
    error: Error | null
};

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.log("Error Boundary:", error, errorInfo);
    }

    render() {
        const { error } = this.state;
        const { children } = this.props;

        if (error)
            return (
                <div>
                    <span>Error Boundary</span>
                    <span>{error.toString()}</span>
                </div>
            );
            
        return children;
    }
}

export default ErrorBoundary;