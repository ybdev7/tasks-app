import React from "react";
import { FC, ReactElement } from "react";
import GeneralError from "../components/errors/ErrorBox";
const Error: FC<{}> = (): ReactElement => {
  return (
    <>
      <GeneralError message="Page not found" />
    </>
  );
};

export default Error;
