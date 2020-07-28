import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import userContext from "../../context/userContext";

function ProtectedRoute({ path, component: Component }) {
  const { user } = useContext(userContext);

  return (
    <Route
      path={path}
      render={(props) =>
        user ? (
          <Component user={user} {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;