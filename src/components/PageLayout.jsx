import Header from './Header';

const PageLayout = ({ children, ...headerProps }) => (
  <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans text-gray-800 dark:text-gray-200 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
    <div className="max-w-7xl mx-auto">
      <Header {...headerProps} />
      <main>{children}</main>
    </div>
  </div>
);

export default PageLayout;
