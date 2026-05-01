import { createTheme, DirectionProvider, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import '@mantine/notifications/styles.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignupForm from "./features/representative/signup";

const queryClient = new QueryClient();

const theme = createTheme({
  fontFamily: "IRANYekanXFaNum, sans-serif",
  primaryColor: "cyan",
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DirectionProvider>
        <MantineProvider theme={theme}>
          <main>
            <SignupForm />
          </main>

          <Notifications />
        </MantineProvider>
      </DirectionProvider>
    </QueryClientProvider>
  );
}

export default App;
