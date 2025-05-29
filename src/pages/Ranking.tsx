
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
    if (index === 0) return "text-yellow-400 font-bold text-shadow-lg"; // Gold for 1st
    if (index === 1) return "text-gray-300 font-bold text-shadow-lg"; // Silver for 2nd
    if (index === 2) return "text-amber-600 font-bold text-shadow-lg"; // Bronze for 3rd
    return "text-white font-semibold"; // Others
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800" style={{background: 'linear-gradient(135deg, #DB0007 0%, #FFBC0D 100%)'}}>
      {/* Discreet action buttons */}
      <div className="absolute top-6 left-6 flex items-center space-x-3">
        <Button 
          variant="ghost" 
          size="lg" 
          onClick={() => navigate('/')} 
          className="text-white hover:text-yellow-300 hover:bg-white/10 text-xl p-4"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="lg"
          onClick={handleRefresh}
          className="text-white hover:text-yellow-300 hover:bg-white/10 text-xl p-4"
        >
          <RefreshCw className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="container mx-auto px-8 py-12 max-w-7xl">
        {/* Cabecera */}
        <div className="flex items-center justify-center mb-16">
          <Trophy className="h-20 w-20 mr-6 text-yellow-400 drop-shadow-lg" />
          <h1 className="text-7xl md:text-8xl font-bold text-center text-white drop-shadow-2xl">
            Ranking de Jugadores
          </h1>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Tabla de ranking (solo visualización) */}
          <div className="w-full overflow-hidden rounded-2xl shadow-2xl" style={{backgroundColor: 'rgba(255, 255, 255, 0.95)'}}>
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-red-600 to-yellow-500">
                  <TableHead className="w-24 text-center text-3xl py-8 text-white font-bold">#</TableHead>
                  <TableHead className="text-3xl py-8 text-white font-bold">Jugador</TableHead>
                  <TableHead className="text-center text-3xl py-8 text-white font-bold">Puntos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rankedPlayers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-20">
                      <div className="flex flex-col items-center justify-center text-gray-600">
                        <Trophy className="h-24 w-24 mb-6 text-gray-400" />
                        <p className="text-4xl font-semibold">No hay jugadores registrados</p>
                        <p className="text-3xl mt-4">Añade jugadores para comenzar</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  rankedPlayers.map((player, index) => (
                    <TableRow key={player.id} className={index < 3 ? "bg-gradient-to-r from-yellow-50 to-red-50" : "bg-white hover:bg-gray-50"}>
                      <TableCell className={`text-center font-bold text-5xl py-8 ${getRankStyle(index)}`}>
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-bold text-4xl py-8 text-gray-800">
                        {player.name}
                      </TableCell>
                      <TableCell className="text-center text-6xl font-black py-8" style={{color: '#DB0007'}}>
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
            <div className="rounded-2xl border-4 border-white p-8 flex flex-col items-center justify-center bg-white h-full w-full shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop" 
                alt="Sponsor Logo" 
                className="max-w-full max-h-80 rounded-xl shadow-lg"
              />
              <p className="mt-6 text-2xl font-bold" style={{color: '#DB0007'}}>Patrocinador Oficial</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
