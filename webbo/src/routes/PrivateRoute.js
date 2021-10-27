import { Route, Redirect } from "react-router";

/**
 * 
 * @param {}  
 * @returns 
 */
const PrivateRoute = ({ children, ...rest }) => {
	return (
		<Route
			{...rest}
			render={({ location }) => {
				return localStorage.getItem("authenticated") === "true" ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/SignIn",
							state: { from: location },
						}}
					/>
				);
			}}
		/>
	);
};

export default PrivateRoute;
