// // Profile.tsx
// import React from 'react';
// import {useUser} from '../../context/userContext.tsx';
// // Import {useDarkMode} from '../../hooks/useDarkMode.ts';
// import Background from '../../components/common/Background';
// import DarkModeToggle from '../../components/common/DarkModeToggle';

// const Profile = (): JSX.Element => {
// 	// Const {modoOscuro, toggleModoOscuro} = useDarkMode();
// 	const {user} = useUser();

// 	return (
// 		<>
// 			<Background >
// 				{/* Agregar imagen del usuario */}
// 				{/* <img src={user?.photo} alt="User Photo" /> */}

// 				{/* Información del usuario */}
// 				<div>
// 					{/* <h2>{user?.name}</h2> */}
// 					<p>Correo: {user?.email}</p>
// 					{/* <p>Teléfono: {user?.phone}</p> */}
// 				</div>

// 				{/* Historial de órdenes */}
// 				<div>
// 					<h3>Mis Órdenes</h3>
// 					<ul>
// 						<li>Por Pagar</li>
// 						<li>Enviado</li>
// 						<li>Por Revisar</li>
// 					</ul>
// 				</div>
// 			</Background>

// 			{/* Componentes comunes */}
// 			<DarkModeToggle modoOscuro={modoOscuro} toggleModoOscuro={toggleModoOscuro} />

// 		</>
// 	);
// };

// export default Profile;

