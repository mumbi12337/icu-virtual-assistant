import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center space-y-8">
        <img src="/logo.png" alt="ICU University Logo" className="w-40 h-40 mx-auto object-contain" />
        <h1 className="text-5xl font-extrabold text-blue-900 tracking-tight">
          Welcome to ICU
        </h1>
        <p className="text-xl text-gray-600">
          The Official University Website.
        </p>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-left space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Student Announcements</h2>
          <div className="p-4 bg-blue-50 text-blue-800 rounded-lg">
            Registration for the Spring semester is now open. Make sure to consult with your advisor.
          </div>
          <div className="p-4 bg-green-50 text-green-800 rounded-lg">
            Congratulations to our graduates! The commencement ceremony details have been posted.
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-12">
          Need help? Try asking our Virtual Assistant in the bottom right corner!
        </p>
      </div>

      <Chatbot />
    </div>
  );
}

export default App;
