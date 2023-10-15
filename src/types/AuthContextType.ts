import {type LoginResponse} from './LoginResponseSchema';
import {type SignupResponse} from './SignupResponseSchema';
import {type UserRegisterData} from './UserRegisterSchema';
import {type LoginDataType} from './UserLoginSchema';

export type AuthContextType = {
	login: (user: LoginDataType) => Promise<LoginResponse | undefined>;
	signup: (user: UserRegisterData) => Promise<SignupResponse | undefined>;
	logout: () => void;
};
