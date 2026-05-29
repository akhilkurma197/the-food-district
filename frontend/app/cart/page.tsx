"use client";
import { useCartStore } from '../../lib/store';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCartStore((state: any) => state);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => { setIsLoaded(true); }, []);
  if (!isLoaded) return <div className="min-h-screen bg-[#0F0F0F]" />;

  const subtotal = cart.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);

  if (cart.length === 0) return (
    <div className="h-screen flex flex-col items-center justify-center pt-20">
      <h2 className="text-4xl font-bold mb-6 text-gray-500 italic uppercase">Your bag is empty</h2>
      <Link href="/menu" className="px-10 py-4 bg-[#FF6B35] rounded-full font-black text-sm tracking-widest">GO TO MENU</Link>
    </div>
  );

  return (
    <div className="pt-40 pb-20 px-6 container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item: any) => (
            <motion.div key={item.id} layout className="glass p-6 rounded-3xl flex items-center gap-6">
              <img src={item.image} className="w-20 h-20 rounded-xl object-cover" alt={item.name} />
              <div className="flex-1">
                <h4 className="font-bold text-lg uppercase tracking-tight">{item.name}</h4>
                <p className="text-[#FF6B35] font-black">₹{item.price}</p>
              </div>
              <div className="flex items-center gap-4 glass px-4 py-2 rounded-xl">
                <button onClick={() => updateQuantity(item.id, 'dec')}><Minus size={16}/></button>
                <span className="font-bold">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 'inc')}><Plus size={16}/></button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-full transition-colors">
                <Trash2 size={20}/>
              </button>
            </motion.div>
          ))}
        </div>
        <div className="glass p-8 rounded-[40px] h-fit sticky top-40 border border-white/5 shadow-2xl">
          <h3 className="text-2xl font-black mb-6 italic tracking-tighter">SUMMARY</h3>
          <div className="space-y-4 text-gray-400 font-medium">
            <div className="flex justify-between uppercase text-[10px] tracking-widest font-black"><span>Subtotal</span><span className="text-white">₹{subtotal}</span></div>
            <div className="flex justify-between uppercase text-[10px] tracking-widest font-black"><span>Delivery</span><span className="text-white">₹40</span></div>
            <div className="h-px bg-white/10" />
            <div className="flex justify-between text-2xl text-white font-black italic"><span>Total</span><span className="text-[#FF6B35]">₹{subtotal + 40}</span></div>
          </div>
          <Link href="/checkout">
            <button className="w-full py-5 bg-white text-black font-black rounded-2xl mt-8 hover:bg-[#FF6B35] hover:text-white transition-all flex justify-center gap-2">
              PROCEED TO CHECKOUT <ArrowRight size={20}/>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}