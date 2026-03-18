/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import { apiEndpoints } from '../util/apiEndpoints';

const CreditsContext = createContext();

export function CreditsProvider({ children }) {
  // start with default 5 free credits until backend provides actual value
  const [credits, setCredits] = useState(5);
  const { getToken } = useAuth();

  const fetchCredits = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(apiEndpoints.CREDITS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCredits(response.data.credits);
    } catch (error) {
      console.error('Failed to fetch credits', error);
    }
  };

  useEffect(() => {
    // fetchCredits is safe to call here; adding getToken as dependency
    fetchCredits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getToken]);

  return (
    <CreditsContext.Provider value={{ credits, fetchCredits }}>
      {children}
    </CreditsContext.Provider>
  );
}

export function useCredits() {
  return useContext(CreditsContext);
}
