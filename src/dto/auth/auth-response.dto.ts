import { User } from 'src/schema/user.schema';

export interface AuthResponseDto {
  success: boolean;
  message: string;
  data?: User | User[];
  size?: number;
}
