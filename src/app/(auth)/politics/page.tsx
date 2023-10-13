'use client';
import type React from 'react';
import fondo from '../../../assets/fondo.jpg';
import logo from '../../../assets/logo.png';
import FooterLogin from '../../../components/common/FooterLogin';

const Politics: React.FC = () => (
	<>
		<div className='bg-gris dark:bg-grisOscuro'>
			<main className='flex min-h-screen bg-verdeClaro bg-opacity-75 dark:bg-verdeOscuro md:full'>
				{/* División izquierda */}
				<section className='w-1/2 flex-col justify-center items-center overflow-hidden min-h-max relative hidden md:flex sm:w-100%'>
					<div className='w-full h-full absolute top-0 left-0 z-10'>
						<img src={fondo.src} alt='fondobolsas' className='w-full h-full opacity-5 bg-cover' />
					</div>
					<figure className='z-20'>
						<img src={logo.src} alt='logo' className='w-[24rem] h-[24rem] px-4 lg:w-[36rem] lg:h-[36rem] lg:px-0' />
					</figure>
				</section>
				{/* División derecha */}
				<section className=' bg-opacity-90 w-full md:w-1/2  flex flex-col justify-between items-center md:pt-36'>
					<h1 className='text-3xl font-bold text-white '>Términos y condiciones de uso del sitio</h1>
					<div className=' bg-white justify-between rounded-lg shadow-lg p-4 m-14'>
						<p>Versión vigente: 18 de Septiembre, 2023 </p>
						<ul className='list-disc m-5 p-4 '>
							<li className=''>
                            TiUN es una plataforma de tecnología que ofrece servicios como intermediario entre los estudiantes de la Universidad Nacional de Colombia, TiUN no se hace responsable por defectos en las ventas o problemas con los pagos.
							</li>
							<li className=''>
                            En TiUN pueden pueden vender y comprar productos usando distintas soluciones de pago y envío, dependiendo de cada usuario.
							</li>
							<li className=''>
                            TiUN solo permite la venta de artículos legales en Colombia.
							</li>
						</ul>
						<div className=' flex  justify-center'>
							<button className='m-2 bg-vinotinto text-white text-bold px-4 py-2 rounded border-solid hover:brightness-125 border-gris'>
                            Rechazar
							</button>
							<button className='m-2 bg-verdeClaro text-white text-bold px-4 py-2 rounded border-solid hover:brightness-125 border-gris'>
                            Aceptar
							</button>
						</div>

					</div>
					<FooterLogin />
				</section>
			</main>
		</div>
	</>
);

export default Politics;
