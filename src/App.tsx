import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignupForm from "./features/representative/signup";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <SignupForm />
      </div>
    </QueryClientProvider>
  );
}

export default App;
