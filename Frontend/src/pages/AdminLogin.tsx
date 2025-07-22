import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

const AdminLogin = ({ onLogin }: { onLogin: (token: string) => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:12046/auth/login', { username, password });
      onLogin(res.data.token);
    } catch {
      setMsg('Invalid credentials');
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>Admin Login</Typography>
      <TextField label="Username" fullWidth sx={{ mb: 2 }} value={username} onChange={e => setUsername(e.target.value)} />
      <TextField label="Password" fullWidth type="password" sx={{ mb: 2 }} value={password} onChange={e => setPassword(e.target.value)} />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
      {msg && <Typography sx={{ mt: 2 }} color="error">{msg}</Typography>}
    </Box>
  );
};

export default AdminLogin;
