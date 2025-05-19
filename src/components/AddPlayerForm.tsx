
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';

interface AddPlayerFormProps {
  onAddPlayer: (name: string) => void;
}

const AddPlayerForm = ({ onAddPlayer }: AddPlayerFormProps) => {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddPlayer(playerName);
    setPlayerName('');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Añadir Jugador</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <Input
              placeholder="Nombre del jugador"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={!playerName.trim()}>
            <UserPlus className="mr-2 h-4 w-4" />
            Añadir Jugador
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AddPlayerForm;
