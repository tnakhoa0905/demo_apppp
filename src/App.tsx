// import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
// import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

// import { notificationProvider, RefineSnackbarProvider } from "@refinedev/mui";

// import CssBaseline from "@mui/material/CssBaseline";
// import GlobalStyles from "@mui/material/GlobalStyles";
// import routerBindings, {
//   DocumentTitleHandler,
//   UnsavedChangesNotifier,
// } from "@refinedev/react-router-v6";
// import dataProvider from "@refinedev/simple-rest";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { ColorModeContextProvider } from "./contexts/color-mode";

// function App() {
//   return (
//     <BrowserRouter>
//       <GitHubBanner />
//       <RefineKbarProvider>
//         <ColorModeContextProvider>
//           <CssBaseline />
//           <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
//           <RefineSnackbarProvider>
//             <Refine
//               notificationProvider={notificationProvider}
//               routerProvider={routerBindings}
//               dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
//               options={{
//                 syncWithLocation: true,
//                 warnWhenUnsavedChanges: true,
//               }}
//             >
//               <Routes>
//                 <Route index element={<WelcomePage />} />
//               </Routes>
//               <RefineKbar />
//               <UnsavedChangesNotifier />
//               <DocumentTitleHandler />
//             </Refine>
//           </RefineSnackbarProvider>
//         </ColorModeContextProvider>
//       </RefineKbarProvider>
//     </BrowserRouter>
//   );
// }

// export default App;
import { Refine } from "@refinedev/core";
import {
    ThemedLayoutV2,
    ErrorComponent,
    RefineThemes,
    RefineSnackbarProvider,
    notificationProvider,
} from "@refinedev/mui";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import routerBindings, {
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { MuiInferencer } from "@refinedev/inferencer/mui";

import { BlogPostList } from "pages/blog-posts/list";
import { BlogPostEdit } from "pages/blog-posts/edit";
import { BlogPostShow } from "pages/blog-posts/show";
import { BlogPostCreate } from "pages/blog-posts/create";



const App: React.FC = () => {
    return (
        <ThemeProvider theme={RefineThemes.Blue}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>
                <BrowserRouter>
                    <Refine
                        routerProvider={routerBindings}
                        dataProvider={dataProvider(
                            "https://api.fake-rest.refine.dev",
                        )}
                        notificationProvider={notificationProvider}
                        resources={[
                            {
                                name: "blog_posts",
                                list: "/blog-posts",
                                show: "/blog-posts/show/:id",
                                create: "/blog-posts/create",
                                edit: "/blog-posts/edit/:id",
                                meta: {
                                  canDelete: true,
                              },
                            },
                        ]}
                        options={{
                          syncWithLocation: true,
                          warnWhenUnsavedChanges: true,
                      }}
                    >
                        <Routes>
                            <Route
                                element={
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                }
                            >
                                <Route index element={<NavigateToResource resource="blog_posts" />} />
                                <Route path="blog-posts">
                                    <Route index element={<BlogPostList />} />
                                    {/* <Route index element={<MuiInferencer />} /> */}
                                    <Route
                                        path="show/:id"
                                        element={<BlogPostShow />}
                                    />
                                     <Route
                                        path="edit/:id"
                                        element={<BlogPostEdit />}
                                    />
                                     <Route
                                        path="create"
                                        element={<BlogPostCreate />}
                                    />
                                </Route>
                                <Route path="*" element={<ErrorComponent />} />
                            </Route>
                        </Routes>
                        <UnsavedChangesNotifier />
                    </Refine>
                </BrowserRouter>
            </RefineSnackbarProvider>
        </ThemeProvider>
    );
};

export default App;