import {createContext, useState, useContext} from 'react';
import {loginRequest} from '../api/auth';

export const AuthContext = createContext(null);
// Este hook es para usar el contexto sin necesidad de importar useContext, hace el uso del contexto por mi
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth debe estar dentro del proveedor AuthContext');
	}

	return context;
};

export const AuthProvider = ({children}) => {
	const [user, setUser] = useState(null);
	const login = async (user: any) => {
		const res = await loginRequest(user);
		console.log(res);
		setUser(res.user);
	};

	return (
		<AuthContext.Provider
			value={{
				login,
				user,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

