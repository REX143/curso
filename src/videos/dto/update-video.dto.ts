import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateVideoDto } from './create-video.dto';

// export class UpdateVideoDto extends PartialType(CreateVideoDto) {}
export class UpdateVideoDto extends PartialType(OmitType(CreateVideoDto, ['id','url'] as const)) {}
