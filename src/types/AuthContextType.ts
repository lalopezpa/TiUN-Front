import {type LoginResponse} from './LoginResponseSchema';
import {type SignupResponse} from './SignupResponseSchema';
import {type UserType} from './UserSchema';

export type AuthContextType = {
	login: (user: UserType) => Promise<LoginResponse>;
	signup: (user: UserType) => Promise<SignupResponse>;
	logout: () => void;
	user: UserType;
};
