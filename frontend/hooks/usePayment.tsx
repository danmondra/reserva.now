import { useState } from 'react';

export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  const createPayment = async (amount: number, description: string, clienteId: string, proveedorId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          description,
          clienteId,
          proveedorId
        })
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error);
      }

      setPaymentData(result);
      return result;

    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const completePayment = async (quoteId: string, continueUri: string, continueToken: string) => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/payments/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quoteId,
          continueUri, 
          continueToken
        })
      });

      const result = await response.json();
      return result;

    } catch (error) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const getPaymentUsers = async () => {
    try {
      const response = await fetch('/api/payments/users');
      const result = await response.json();
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return {
    loading,
    error,
    paymentData,
    createPayment,
    completePayment,
    getPaymentUsers
  };
};