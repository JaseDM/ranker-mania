
import { usePlayerManager } from '@/hooks/usePlayerManager';
import { Trophy, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { Player } from '@/models/Player';

const Ranking = () => {
  const { getRankedPlayers } = usePlayerManager();
  const [rankedPlayers, setRankedPlayers] = useState<Player[]>([]);
  const navigate = useNavigate();

  // Poll for updates and watch for localStorage changes
  useEffect(() => {
    console.log('Ranking screen: Setting up update listeners');
    
    // Initial load
    setRankedPlayers(getRankedPlayers());
    
    // Set up interval for reactive updates
    const intervalId = setInterval(() => {
      setRankedPlayers(getRankedPlayers());
    }, 1000);
    
    // Clean up the interval when component unmounts
    return () => clearInterval(intervalId);
  }, [getRankedPlayers]);

  // Function to manually refresh the ranking list
  const handleRefresh = () => {
    console.log('Manual refresh triggered');
    setRankedPlayers(getRankedPlayers());
  };

  // Function to determine rank style based on position
  const getRankStyle = (index: number) => {
    if (index === 0) return "text-yellow-500 font-bold"; // Gold for 1st
    if (index === 1) return "text-gray-400 font-bold"; // Silver for 2nd
    if (index === 2) return "text-amber-700 font-bold"; // Bronze for 3rd
    return "text-gray-600 dark:text-gray-300"; // Others
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Discreet action buttons */}
      <div className="absolute top-4 left-4 flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/')} 
          className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Cabecera */}
        <div className="flex items-center justify-center mb-8">
          <Trophy className="h-12 w-12 mr-3 text-yellow-500" />
          <h1 className="text-4xl md:text-5xl font-bold text-center">Ranking de Jugadores</h1>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Tabla de ranking (solo visualización) */}
          <div className="w-full overflow-hidden rounded-lg border shadow-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 dark:bg-gray-800">
                  <TableHead className="w-16 text-center text-xl py-4">#</TableHead>
                  <TableHead className="text-xl py-4">Jugador</TableHead>
                  <TableHead className="text-center text-xl py-4">Puntos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rankedPlayers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-12">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Trophy className="h-16 w-16 mb-3" />
                        <p className="text-2xl">No hay jugadores registrados</p>
                        <p className="text-xl mt-2">Añade jugadores para comenzar</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  rankedPlayers.map((player, index) => (
                    <TableRow key={player.id} className={index < 3 ? "bg-opacity-10 bg-yellow-50 dark:bg-opacity-10 dark:bg-blue-900" : ""}>
                      <TableCell className={`text-center font-medium text-2xl py-5 ${getRankStyle(index)}`}>
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-medium text-2xl py-5">{player.name}</TableCell>
                      <TableCell className="text-center text-3xl font-bold py-5 text-blue-600 dark:text-blue-400">
                        {player.score}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Sponsor Logo Section */}
          <div className="flex items-center justify-center">
            <div className="rounded-lg border p-6 flex flex-col items-center justify-center bg-white dark:bg-gray-800 h-full w-full shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop" 
                alt="Sponsor Logo" 
                className="max-w-full max-h-64 rounded-lg shadow-md"
              />
              <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-300">Patrocinador Oficial</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
