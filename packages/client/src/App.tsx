import React, { useState } from "react";
import ReactDOM from "react-dom";
import { httpBatchLink } from '@trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FrontPage from "./FrontPage";

import "./index.scss";
import { trpc } from "./trpc";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:8080/trpc',
          // optional
          fetch(url, options) {
            return fetch(url, {
              ...options,
            });
          },
        }),
      ],
    }),
  );



  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <FrontPage />
      </QueryClientProvider>
    </trpc.Provider >
  )
};
ReactDOM.render(<App />, document.getElementById("app"));

