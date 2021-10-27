import { Switch, Route } from "react-router-dom";
import SignIn from "./components/signIn/SignIn";
import Layout from "./layout/Layout";
import PrivateRoute from "./routes/PrivateRoute";
import ErrorBoundary from "./hoc/ErrorBoundary/ErrorBoundary";
import { MsgBoxContextProvider } from "./store/MsgBoxContext";
function App() {
	return (
		<Switch>
			<Route path="/SignIn">
				<ErrorBoundary>
					<MsgBoxContextProvider >
						<SignIn />
					</MsgBoxContextProvider>
				</ErrorBoundary>
			</Route>
			<PrivateRoute>
				<ErrorBoundary>
					<Layout />
				</ErrorBoundary>
			</PrivateRoute>
		</Switch>
	);
}

export default App;
