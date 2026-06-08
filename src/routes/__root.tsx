import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient-gold">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist.</p>
        <Link to="/" className="mt-6 inline-flex items-center justify-center rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background">
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try again or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background">Try again</button>
          <a href="/" className="rounded-lg border border-border px-4 py-2 text-sm font-medium">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "InkotaSoft Tech Ltd — Innovating Digital Solutions" },
      { name: "description", content: "Premium software, mobile, and cloud engineering. We build world-class digital products for ambitious brands." },
      { name: "author", content: "InkotaSoft Tech Ltd" },
      { name: "theme-color", content: "#0B2E6B" },
      { property: "og:title", content: "InkotaSoft Tech Ltd — Innovating Digital Solutions" },
      { property: "og:description", content: "Premium software, mobile, and cloud engineering. We build world-class digital products for ambitious brands." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "InkotaSoft Tech Ltd" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "InkotaSoft Tech Ltd — Innovating Digital Solutions" },
      { name: "twitter:description", content: "Premium software, mobile, and cloud engineering. We build world-class digital products for ambitious brands." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a701bf95-4b2c-4304-9e0a-89a8c2846c5b/id-preview-b4cae329--64e2d8f1-b224-4701-888d-f1af04aaf958.lovable.app-1780905598179.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a701bf95-4b2c-4304-9e0a-89a8c2846c5b/id-preview-b4cae329--64e2d8f1-b224-4701-888d-f1af04aaf958.lovable.app-1780905598179.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </QueryClientProvider>
  );
}
