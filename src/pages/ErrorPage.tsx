// ErrorPage.tsx
import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  // Type guard to check if error is an instance of Error
  const isError = (error: unknown): error is Error => {
    return error instanceof Error;
  };

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{isError(error) ? error.message : "Unknown error"}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
