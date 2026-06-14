export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-muted-foreground">Page not found</p>
        <a href="/admin" className="text-primary underline mt-4 inline-block">
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
