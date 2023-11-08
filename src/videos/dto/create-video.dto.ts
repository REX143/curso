import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsUrl, isString } from "class-validator";

export class CreateVideoDto {

        @ApiProperty()
        id: number;

        @ApiProperty()
        @IsString()
        @IsEmail()
        usuario:      string;

        @ApiProperty()
        @IsNotEmpty()
        @IsString()
        descripcion: string;

        @ApiProperty()        
        @IsUrl()
        url:         string;


        imagen:      string;
    
    
}
