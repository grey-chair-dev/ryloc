import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Settings, Lightbulb, Send } from 'lucide-react';

const Engineering = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'engineering', ...formData })
    });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mb-20">
          <h1 className="text-5xl font-serif mb-8 tracking-tight">Subcontract Engineering</h1>
          <div className="bg-zinc-900/50 border-l-4 border-white p-8 mb-12">
            <p className="text-lg font-light leading-relaxed">
              Beyond our standard catalog, we offer specialized subcontract engineering services. Whether you need a custom PCB design for a rare component or a full mechanical assembly re-engineered for modern reliability, our team can work with you to bring your vision to life.
            </p>
          </div>
          <p className="text-white/50 leading-relaxed font-light">
            We also welcome part ideas from the community. If you've identified a common failure point in your classic Mercedes and have a potential solution, we'd love to collaborate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-zinc-900/30 p-10 border border-white/10">
              {submitted ? (
                <div className="text-center py-20">
                  <h3 className="text-2xl font-serif mb-4">Proposal Received</h3>
                  <p className="text-white/50">Our engineering team will review your request and reach out shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-8 text-xs uppercase tracking-widest border-b border-white/30 pb-1">New Request</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-3">Full Name</label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-transparent border-b border-white/20 py-3 text-sm focus:outline-none focus:border-white transition-colors"
                        placeholder="NAME"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-3">Email Address</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-transparent border-b border-white/20 py-3 text-sm focus:outline-none focus:border-white transition-colors"
                        placeholder="EMAIL"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-3">Project Details / Part Idea</label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 py-3 text-sm focus:outline-none focus:border-white transition-colors resize-none"
                      placeholder="DESCRIBE YOUR ENGINEERING NEED OR PART IDEA..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-white text-black uppercase tracking-[0.3em] text-[10px] font-bold px-12 py-5 hover:bg-white/90 transition-colors flex items-center space-x-3"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Proposal</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-zinc-900/50 p-8 border border-white/5">
              <Settings className="w-8 h-8 mb-6 text-white/40" />
              <h4 className="text-lg font-serif mb-4">Custom Fabrication</h4>
              <p className="text-sm text-white/50 leading-relaxed font-light">
                Small-batch production and prototyping for rare components that are no longer available from the manufacturer.
              </p>
            </div>
            <div className="bg-zinc-900/50 p-8 border border-white/5">
              <Lightbulb className="w-8 h-8 mb-6 text-white/40" />
              <h4 className="text-lg font-serif mb-4">Collaborative Design</h4>
              <p className="text-sm text-white/50 leading-relaxed font-light">
                Work directly with our engineers to refine your part ideas into production-ready components. Your feedback becomes the next revision.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Engineering;
