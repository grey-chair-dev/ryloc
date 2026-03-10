/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Parts from './pages/Parts';
import PartDetail from './pages/PartDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Engineering from './pages/Engineering';
import Cart from './pages/Cart';
import Account from './pages/Account';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-black flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/parts" element={<Parts />} />
              <Route path="/parts/:id" element={<PartDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/engineering" element={<Engineering />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}
