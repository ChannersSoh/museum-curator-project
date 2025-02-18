export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <div className="text-center max-w-2xl p-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Welcome to the Museum Curator
        </h1>
        <p className="text-lg text-gray-800 dark:text-gray-300 mb-6">
          Discover and explore historical exhibits from the Harvard Art Museums 
          and the Smithsonian Institution.
        </p>
        <a
          href="/exhibits"
          className="px-6 py-3 bg-blue-500 dark:bg-blue-600 text-white text-lg font-bold rounded-lg shadow-md hover:bg-blue-600 dark:hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
