import './App.css';
import PostsList from './features/posts/PostsList';
import AddPostForm from './features/posts/AddPostForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
      <main className='App'>
        <AddPostForm />
        <PostsList post={{
          userId: 0,
          id: 0,
          title: '',
          body: ''
        }} />
      </main>
    </QueryClientProvider>
  );
}

export default App;
