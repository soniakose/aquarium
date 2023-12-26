import React from "react";
import { ConfigProvider as AntConfigProvider } from "antd";
import { ConfigProviderProps as AntConfigProviderProps } from "antd";

export interface IConfigProviderProps extends AntConfigProviderProps {
}

export const ConfigProvider = (props: IConfigProviderProps) => {
  return <>
    <AntConfigProvider {...props}/>
  </>;
};