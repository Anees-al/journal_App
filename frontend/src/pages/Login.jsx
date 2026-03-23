import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Lock, User, Terminal } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      if (res.data.success) {
        localStorage.setItem('auth_token', res.data.token);
        navigate('/');
      }
    } catch (err) {
      setError('AUTHENTICATION_FAILED: ACCESS_DENIED');
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] font-mono flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3fb950 1px, transparent 0)', backgroundSize: '30px 30px' }} />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-[#161b22] rounded-xl p-12 shadow-2xl border border-[#30363d] relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-[#238636]/10 text-[#3fb950] rounded-full mb-6 border border-[#238636]/30">
            <Terminal size={40} />
          </div>
          <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-[0.2em]">&gt; Login_Sequence</h1>
          <p className="text-[#7d8590] text-xs font-bold uppercase tracking-widest">Awaiting credentials for system access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7d8590] group-focus-within:text-[#3fb950] transition-colors">
              <User size={20} />
            </div>
            <input
              type="text"
              placeholder="id_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-[#0d1117] border border-[#30363d] rounded-lg outline-none focus:border-[#3fb950] transition-all font-bold text-[#e6edf3] placeholder:text-[#30363d] text-sm tracking-widest"
              required
            />
          </div>

          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7d8590] group-focus-within:text-[#3fb950] transition-colors">
              <Lock size={20} />
            </div>
            <input
              type="password"
              placeholder="id_password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-[#0d1117] border border-[#30363d] rounded-lg outline-none focus:border-[#3fb950] transition-all font-bold text-[#e6edf3] placeholder:text-[#30363d] text-sm tracking-widest"
              required
            />
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="text-rose-500 text-[10px] font-black text-center border border-rose-500/30 p-2 bg-rose-500/5 rounded uppercase tracking-[0.1em]"
            >
              [ERROR] {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 bg-[#238636] hover:bg-[#2ea043] text-white rounded-lg font-black text-xs uppercase tracking-[0.3em] shadow-lg transition-all cursor-pointer"
          >
            EXECUTE ./login.sh
          </motion.button>
        </form>

        <div className="mt-8 pt-8 border-t border-[#30363d] text-center">
          <p className="text-[10px] text-[#7d8590] uppercase tracking-widest font-bold">Encrypted Session: AES-256 Enabled</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
