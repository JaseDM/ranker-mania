
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
                  <div className="flex justify-end gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onIncreaseScore(player.id, 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
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
