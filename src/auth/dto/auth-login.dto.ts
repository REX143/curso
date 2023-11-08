import { IsEmail, IsString, Matches, MinLength } from "class-validator";


export class AuthLoginDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(5)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password is too weak' })
    password: string;
}
