// Context/UserContext.tsx
'use client';
import type React from 'react';
import {createContext, useContext, useState, type ReactNode} from 'react';

// Define the shape of the user
type User = {
	id: number;
	email: string;
	// Add more user-related properties if needed
};

// Define the shape of the context
type UserContextType = {
	user: User | undefined;
	login2: (userData: User) => void;
	logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}

	return context;
};

type UserProviderProps = {
	children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
	const [user, setUser] = useState<User | undefined>(undefined);

	const login2 = (userData: User) => {
		setUser(userData);
	};

	const logout = () => {
		setUser(undefined);
	};

	const contextValue: UserContextType = {
		user,
		login2,
		logout,
	};

	return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};
