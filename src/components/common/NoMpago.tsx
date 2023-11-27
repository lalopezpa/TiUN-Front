'use client';
import logomini from '../../assets/logo_mini.png';
import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import { getlink } from '../../api/mpago';

const NoMpago = () => {
  const [link, setLink] = useState('');

  const handleGetLink = async () => {
    try {
      const linkFromApi = await getlink();
      setLink(linkFromApi);
    } catch (error) {
      console.error('Error obteniendo el enlace:', error);
    }
  };

  useEffect(() => {
    if (link) {
      window.location.href = link;
    }
  }, [link]);

  return (
    <div className='flex flex-col w-screen min-h-screen bg-repeat' style={{ backgroundImage: 'url(https://img.freepik.com/vector-premium/fondo-vector-bolsas-compras_615502-2466.jpg)', zIndex: -1 }}>
      <header className='flex justify-end items-end bg-verdeClaro bg-opacity-75 h-1/6'>
        <div className='flex justify-end'>
          <img src={logomini.src} alt='Logo' className='w-400 h-400 mx-auto my-4' />
        </div>
      </header>
      <main className='flex justify-center items-center bg-verdeClaro bg-opacity-75 h-2/3 flex-1 overflow-y-auto'>
        <section>
          <div className='flex justify-center items-center z-30 '>
            <div className='bg-gray p-8 rounded-full '>
              <h2 className='flex justify-center items-center text-4xl mb-4 font-poppins font-bold text-white'>
                NO ESTÁS REGISTRADO EN MERCADOPAGO
              </h2>
              <div className='bg-gray-300 p-8 rounded-lg shadow-md flex justify-center items-center'>
                <button onClick={handleGetLink}>Ir a MercadoPago</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className='h-1/6 bg-verdeClaro bg-opacity-75'>
        <Footer />
      </footer>
    </div>
  );
};

export default NoMpago;
