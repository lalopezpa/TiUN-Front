import {type LoginResponse} from './LoginResponseSchema';
import {type SignupResponse} from './SignupResponseSchema';
import {type UserRegisterData} from './UserRegisterSchema';
import {type LoginDataType} from './UserLoginSchema';
import {type UserType} from './UserSchema';

export type AuthContextType = {
	login: (user: LoginDataType) => Promise<LoginResponse>;
	signup: (user: UserRegisterData) => Promise<SignupResponse>;
	logout: () => void;
	user: UserType;
};
