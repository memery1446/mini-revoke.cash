import React from 'react';
import TokenAllowanceManager from './components/TokenAllowanceManager';

function App() {
  return (
    <div className="App">
      <header className="bg-gray-800 text-white p-4 mb-8">
        <h1 className="text-2xl font-bold text-center">Own Your Permissions</h1>
      </header>
      <main>
        <TokenAllowanceManager />
      </main>
    </div>
  );
}

export default App;
