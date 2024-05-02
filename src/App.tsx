import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostsScreen from "./components/screens/PostsScreen";
import Home from "./components/screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/navigation/Layout";
import GalleryScreen from "./components/screens/GalleryScreen";
import PhotoCard from "./components/photos/Photo";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Suspense } from 'react';


function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route
              path="posts"
              element={
                <PostsScreen
                  post={{
                    id: 0,
                    title: "",
                    content: "",
                  }}
                />
              }
            />
            <Route path="gallery" element={<GalleryScreen />}></Route>
            <Route path="/photo/:id" element={<PhotoCard />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
