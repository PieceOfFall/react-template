import { Link } from 'react-router';
import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFoundRoute = () => {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="bg-muted rounded-full p-4">
        <FileQuestion className="text-muted-foreground h-12 w-12" />
      </div>
      <h1 className="text-foreground mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
        404 - Not Found
      </h1>
      <p className="text-muted-foreground mt-4">
        Sorry, the page you are looking for does not exist.
      </p>
      <div className="mt-8">
        <Button asChild>
          <Link to="/app">Go back home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundRoute;
