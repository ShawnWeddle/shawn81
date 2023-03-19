import { type AppType } from "next/app";
import { PostContextProvider } from "~/context/PostContext";
import { AuthContextProvider } from "~/context/AuthContext";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Component {...pageProps} />
      </PostContextProvider>
    </AuthContextProvider>
  );
};

export default api.withTRPC(MyApp);
