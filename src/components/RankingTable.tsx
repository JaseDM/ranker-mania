
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

  return (
    <div className="w-full overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-center">#</TableHead>
            <TableHead>Jugador</TableHead>
            <TableHead className="text-center">Puntos</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <Trophy className="h-12 w-12 mb-2" />
                  <p className="text-lg">No hay jugadores registrados</p>
                  <p className="text-sm">Añade jugadores para comenzar</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            players.map((player, index) => (
              <TableRow key={player.id}>
                <TableCell className="text-center font-medium">
                  {index + 1}
                </TableCell>
                <TableCell className="font-medium">{player.name}</TableCell>
                <TableCell className="text-center">{player.score}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2 items-center">
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="1"
                        className="w-16 h-8 text-center"
                        value={customPoints[player.id] || 1}
                        onChange={(e) => handlePointsChange(player.id, e.target.value)}
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAddPoints(player.id)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => onDeletePlayer(player.id)}
                    >
                      <UserX className="h-4 w-4" />
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
