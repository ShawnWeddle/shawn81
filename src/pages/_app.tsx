import { type AppType } from "next/app";
import { PostContextProvider } from "~/context/PostContext";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <PostContextProvider>
      <Component {...pageProps} />
    </PostContextProvider>
  );
};

export default api.withTRPC(MyApp);
