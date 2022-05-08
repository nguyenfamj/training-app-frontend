import './App.css';

// React-router
import { Routes, Route } from 'react-router-dom';

// React-query
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// Import components
import Navbar from './Components/Navbar/Navbar';
import Customers from './Pages/Customers/Customers';
import Trainings from './Pages/Trainings/Trainings';
import TrainingCalendar from './Pages/TrainingCalendar/TrainingCalendar';

function App() {
  const queryClient = new QueryClient();

  return (
    <div className='App'>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Customers />} />
          <Route path='/trainings' element={<Trainings />} />{' '}
          <Route path='/calendar' element={<TrainingCalendar />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
