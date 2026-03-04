import { useState, useCallback } from 'react';

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export interface CepData {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  complement: string;
}

export function useCep() {
  const [loading, setLoading] = useState(false);

  const fetchCep = useCallback(async (cep: string): Promise<CepData | null> => {
    const cleaned = cep.replace(/\D/g, '');
    if (cleaned.length !== 8) return null;

    setLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleaned}/json/`);
      const data: ViaCepResponse = await res.json();
      if (data.erro) return null;
      return {
        street: data.logradouro || '',
        neighborhood: data.bairro || '',
        city: data.localidade || '',
        state: data.uf || '',
        complement: data.complemento || '',
      };
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchCep, loading };
}
