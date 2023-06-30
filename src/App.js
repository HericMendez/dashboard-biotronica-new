import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'font-awesome/css/font-awesome.min.css';

import Layout from './layouts/Layout';
import Login from 'components/authentication/split/Login';
import PrivateRoute from 'utils/PrivateRoute';
import ForgetPassword from 'components/authentication/split/ForgetPassword';
import Registration from 'components/authentication/split/Registration';
import PasswordReset from 'components/authentication/split/PasswordReset';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<Layout />} path="/*" />
          </Route>
          <Route path="/register" element={<Registration />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
