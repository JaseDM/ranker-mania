
import { usePlayerManager } from '@/hooks/usePlayerManager';
import { Trophy, UserPlus, List } from 'lucide-react';
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

const Ranking = () => {
  const { getRankedPlayers } = usePlayerManager();
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
          {/* Tabla de ranking (solo visualización) */}
          <div className="w-full overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 text-center">#</TableHead>
                  <TableHead>Jugador</TableHead>
                  <TableHead className="text-center">Puntos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rankedPlayers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Trophy className="h-12 w-12 mb-2" />
                        <p className="text-lg">No hay jugadores registrados</p>
                        <p className="text-sm">Añade jugadores para comenzar</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  rankedPlayers.map((player, index) => (
                    <TableRow key={player.id}>
                      <TableCell className="text-center font-medium">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-medium">{player.name}</TableCell>
                      <TableCell className="text-center">{player.score}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Botones de navegación */}
          <div className="flex justify-center gap-4">
            <Button onClick={() => navigate('/')} className="px-6">
              Inicio
            </Button>
            <Button onClick={() => navigate('/register')} className="px-6">
              Gestionar Jugadores
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
