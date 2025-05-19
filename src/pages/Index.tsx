
import { usePlayerManager } from '@/hooks/usePlayerManager';
import RankingTable from '@/components/RankingTable';
import AdminActions from '@/components/AdminActions';
import { Trophy, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { 
    getRankedPlayers, 
    increaseScore, 
    deletePlayer,
    resetAllScores,
    deleteAllPlayers
  } = usePlayerManager();
  
  const rankedPlayers = getRankedPlayers();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Cabecera */}
        <div className="flex items-center justify-center mb-8">
          <Trophy className="h-8 w-8 mr-3 text-yellow-500" />
          <h1 className="text-3xl font-bold text-center">Ranking de Jugadores</h1>
        </div>
      
        <div className="grid grid-cols-1 gap-8 mb-8">
          {/* Botón para ir a registrar jugadores */}
          <div className="flex justify-center mb-4">
            <Button onClick={() => navigate('/register')} className="px-6">
              <UserPlus className="mr-2 h-4 w-4" />
              Registrar Jugadores
            </Button>
          </div>
          
          {/* Tabla de ranking */}
          <div>
            <RankingTable 
              players={rankedPlayers}
              onIncreaseScore={increaseScore}
              onDeletePlayer={deletePlayer}
            />
          </div>
          
          {/* Botones de administración */}
          <AdminActions 
            onResetScores={resetAllScores} 
            onDeletePlayers={deleteAllPlayers} 
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
