import { Outlet } from 'react-router';

// TODO: implement phone ShopLayout in '@/components/layouts and use it to wrap Outlet';

export const ErrorBoundary = () => {
  return <div>Something went wrong!</div>;
};

const AppRoot = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AppRoot;
