import "../styles/globals.less";
import "antd/dist/antd.less";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { NextAdapter } from "next-query-params";
import { QueryParamProvider } from "use-query-params";
import React from "react";
import LayoutPage from "../../component/LayoutPage";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <LayoutPage>
          <QueryParamProvider adapter={NextAdapter}>
            <Auth>
              <Component {...pageProps} />
            </Auth>
          </QueryParamProvider>
        </LayoutPage>
      ) : (
        <LayoutPage>
          <QueryParamProvider adapter={NextAdapter}>
            <Component {...pageProps} />
          </QueryParamProvider>
        </LayoutPage>
      )}
    </SessionProvider>
    // <SessionProvider session={session}>
    //   <LayoutPage>
    //     <QueryParamProvider adapter={NextAdapter}>
    //       <Component {...pageProps} />
    //     </QueryParamProvider>
    //   </LayoutPage>
    // </SessionProvider>
  );
}
export default MyApp;

function Auth({ children }) {
  const { data: session, status } = useSession();
  const isUser = !!session?.user;

  React.useEffect(() => {
    if (status === "loading") return;
    if (!isUser) signIn();
  }, [isUser, status]);

  if (isUser) {
    return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
}
