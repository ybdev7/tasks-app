import React from "react";
import ThemeHandler from "./theming/ThemeHandler";
import Layout from "./theming/Layout";

import NavbarRouter from "./components/navbar/NavbarRouter";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const App: React.FC<{}> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <ThemeHandler>
          <Layout>
            <NavbarRouter />
          </Layout>
        </ThemeHandler>
      </>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
