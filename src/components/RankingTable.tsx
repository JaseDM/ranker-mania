
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { Player } from '@/models/Player';
import { Plus, UserX, Trophy } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface RankingTableProps {
  players: Player[];
  onIncreaseScore: (playerId: string, points: number) => void;
  onDeletePlayer: (playerId: string) => void;
}

const RankingTable = ({ 
  players, 
  onIncreaseScore, 
  onDeletePlayer 
}: RankingTableProps) => {
  // Estado para manejar puntos personalizados por jugador
  const [customPoints, setCustomPoints] = useState<Record<string, number>>({});

  const handlePointsChange = (playerId: string, value: string) => {
    const points = parseInt(value) || 0;
    setCustomPoints({
      ...customPoints,
      [playerId]: points
    });
  };

  const handleAddPoints = (playerId: string) => {
    const points = customPoints[playerId] || 1;
    onIncreaseScore(playerId, points);
    // Reiniciar el campo después de añadir puntos
    setCustomPoints({
      ...customPoints,
      [playerId]: 1
    });
  };

  // Function to determine rank style based on position
  const getRankStyle = (index: number) => {
    if (index === 0) return "text-yellow-500 font-bold"; // Gold for 1st
    if (index === 1) return "text-gray-400 font-bold"; // Silver for 2nd
    if (index === 2) return "text-amber-700 font-bold"; // Bronze for 3rd
    return "text-gray-600 dark:text-gray-300"; // Others
  };

  return (
    <div className="w-full overflow-hidden rounded-lg border shadow-lg">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 dark:bg-gray-800">
            <TableHead className="w-16 text-center text-lg">#</TableHead>
            <TableHead className="text-lg">Jugador</TableHead>
            <TableHead className="text-center text-lg">Puntos</TableHead>
            <TableHead className="text-right text-lg">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-10">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <Trophy className="h-14 w-14 mb-3" />
                  <p className="text-xl">No hay jugadores registrados</p>
                  <p className="text-lg mt-1">Añade jugadores para comenzar</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            players.map((player, index) => (
              <TableRow key={player.id} className={index < 3 ? "bg-opacity-10 bg-yellow-50 dark:bg-opacity-10 dark:bg-blue-900" : ""}>
                <TableCell className={`text-center font-medium text-xl py-4 ${getRankStyle(index)}`}>
                  {index + 1}
                </TableCell>
                <TableCell className="font-medium text-xl py-4">{player.name}</TableCell>
                <TableCell className="text-center text-2xl font-bold py-4 text-blue-600 dark:text-blue-400">
                  {player.score}
                </TableCell>
                <TableCell className="text-right py-4">
                  <div className="flex justify-end gap-2 items-center">
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="1"
                        className="w-20 h-9 text-center text-lg"
                        value={customPoints[player.id] || 1}
                        onChange={(e) => handlePointsChange(player.id, e.target.value)}
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAddPoints(player.id)}
                        className="h-9 px-3"
                      >
                        <Plus className="h-5 w-5" />
                      </Button>
                    </div>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => onDeletePlayer(player.id)}
                      className="h-9"
                    >
                      <UserX className="h-5 w-5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RankingTable;
