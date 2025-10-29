export const LoadingOverlay = ({ message }: { message: string }) => (
  <div className="fixed inset-0 bg-accent/60 flex items-center justify-center z-50 dark:bg-accent-dark/60">
    <div className="bg-primary p-6 rounded-xl shadow-lg flex flex-col items-center text-secondary dark:bg-primary-dark dark:text-accent">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-secondary border-t-transparent mb-4 dark:border-secondary-dark"></div>
      <p className="text-lg text-white font-medium">{message}</p>
    </div>
  </div>
);
