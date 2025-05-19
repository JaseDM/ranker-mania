
import { usePlayerManager } from '@/hooks/usePlayerManager';
import AddPlayerForm from '@/components/AddPlayerForm';
import RankingTable from '@/components/RankingTable';
import AdminActions from '@/components/AdminActions';
import { Trophy } from 'lucide-react';

const Index = () => {
  const { 
    addPlayer, 
    getRankedPlayers, 
    increaseScore, 
    deletePlayer,
    resetAllScores,
    deleteAllPlayers
  } = usePlayerManager();
  
  const rankedPlayers = getRankedPlayers();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Cabecera */}
        <div className="flex items-center justify-center mb-8">
          <Trophy className="h-8 w-8 mr-3 text-yellow-500" />
          <h1 className="text-3xl font-bold text-center">Ranking de Jugadores</h1>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Formulario para añadir jugadores */}
          <div className="md:col-span-1">
            <AddPlayerForm onAddPlayer={addPlayer} />
          </div>
          
          {/* Tabla de ranking */}
          <div className="md:col-span-2">
            <div className="flex flex-col gap-8">
              <RankingTable 
                players={rankedPlayers}
                onIncreaseScore={increaseScore}
                onDeletePlayer={deletePlayer}
              />
              
              {/* Botones de administración */}
              <AdminActions 
                onResetScores={resetAllScores} 
                onDeletePlayers={deleteAllPlayers} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
