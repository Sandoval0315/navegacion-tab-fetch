import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import Navigation from './src/navigation/Navegation';

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}