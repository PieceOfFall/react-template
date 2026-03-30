import { Link } from 'react-router';
import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFoundRoute = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="rounded-full bg-muted p-4">
        <FileQuestion className="h-12 w-12 text-muted-foreground" />
      </div>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">404 - Not Found</h1>
      <p className="mt-4 text-muted-foreground">Sorry, the page you are looking for does not exist.</p>
      <div className="mt-8">
        <Button asChild>
          <Link to="/app">Go back home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundRoute;
