
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddPlayerForm from '@/components/AddPlayerForm';
import { usePlayerManager } from '@/hooks/usePlayerManager';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Register = () => {
  const { addPlayer } = usePlayerManager();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Cabecera */}
        <div className="flex items-center justify-center mb-8">
          <UserPlus className="h-8 w-8 mr-3 text-blue-500" />
          <h1 className="text-3xl font-bold text-center">Registro de Jugadores</h1>
        </div>
        
        <div className="grid grid-cols-1 gap-8 mb-8">
          {/* Formulario para añadir jugadores */}
          <div className="max-w-md mx-auto w-full">
            <AddPlayerForm onAddPlayer={addPlayer} />
          </div>
          
          <div className="flex justify-center">
            <Button onClick={() => navigate('/')} className="px-6">
              Ver Ranking
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
