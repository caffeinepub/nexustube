import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import VideoPlaybackPage from './pages/VideoPlaybackPage';

const rootRoute = createRootRoute({
    component: () => (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
                <div id="router-outlet" />
            </main>
            <Footer />
            <Toaster />
        </div>
    )
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage
});

const videoRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/video/$videoId',
    component: VideoPlaybackPage
});

const routeTree = rootRoute.addChildren([indexRoute, videoRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

function App() {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
