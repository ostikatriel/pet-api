import { IsNotEmpty } from 'class-validator';

export class CreatePetDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  species: string;
}
