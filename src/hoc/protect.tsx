import { useAuth } from "@/hooks";
import hoistNonReactStatics from "hoist-non-react-statics";
import { ComponentType } from "react";
import { Redirect, RedirectProps } from "react-router";

export const protect = <P,>(
  Component: ComponentType<P>,
  redirectProps: RedirectProps
) => {
  const NewCompoennt = (props: P) => {
    const [isLogin] = useAuth();
    if (isLogin) {
      return <Component {...props} />;
    } else {
      return <Redirect {...redirectProps} />;
    }
  };
  return hoistNonReactStatics<any, any, any>(NewCompoennt, Component);
};
