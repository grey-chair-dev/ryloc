import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Package, LogOut, ShieldCheck } from 'lucide-react';
import { useAppContext } from '../AppContext';

const Account = () => {
  const { user, setUser } = useAppContext();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (data.success) {
      setUser(data.user);
    } else {
      setError(data.error || 'Authentication failed');
    }
  };

  if (user) {
    return (
      <div className="min-h-screen bg-black text-white pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h1 className="text-4xl font-serif mb-2">Welcome, {user.name}</h1>
              <p className="text-white/40 text-sm tracking-widest uppercase">{user.email}</p>
            </div>
            <button
              onClick={() => setUser(null)}
              className="flex items-center space-x-2 text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <section>
                <h3 className="text-lg font-serif mb-6 flex items-center space-x-3">
                  <Package className="w-5 h-5" />
                  <span>Recent Orders</span>
                </h3>
                <div className="border border-white/10 bg-zinc-900/30 p-12 text-center">
                  <p className="text-white/30 text-sm italic">No orders found.</p>
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <div className="bg-zinc-900 p-6 border border-white/10">
                <ShieldCheck className="w-6 h-6 mb-4 text-emerald-500" />
                <h4 className="text-sm uppercase tracking-widest mb-2">Account Status</h4>
                <p className="text-xs text-white/50 leading-relaxed">Your account is verified. You have access to priority engineering support.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24 flex items-center justify-center">
      <div className="max-w-md w-full px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif mb-4">{isLogin ? 'Sign In' : 'Create Account'}</h1>
          <p className="text-white/40 text-sm tracking-widest uppercase">Access your orders and saved parts</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6 bg-zinc-900/30 p-8 border border-white/10">
          {!isLogin && (
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Full Name</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b border-white/20 py-3 text-sm focus:outline-none focus:border-white transition-colors"
                placeholder="NAME"
              />
            </div>
          )}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Email Address</label>
            <input
              required
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-transparent border-b border-white/20 py-3 text-sm focus:outline-none focus:border-white transition-colors"
              placeholder="EMAIL"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">Password</label>
            <input
              required
              type="password"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-transparent border-b border-white/20 py-3 text-sm focus:outline-none focus:border-white transition-colors"
              placeholder="PASSWORD"
            />
          </div>

          {error && <p className="text-red-500 text-[10px] uppercase tracking-widest">{error}</p>}

          <button
            type="submit"
            className="w-full bg-white text-black uppercase tracking-[0.3em] text-[10px] font-bold py-5 hover:bg-white/90 transition-colors"
          >
            {isLogin ? 'Sign In' : 'Register'}
          </button>

          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="w-full text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Account;
