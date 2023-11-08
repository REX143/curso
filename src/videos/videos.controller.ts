import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpCode, HttpException, HttpStatus, UseInterceptors, UploadedFile, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/utils/logger/storage.handle';
import { JwtGuardGuard } from 'src/guards/jwt-guard/jwt-guard.guard';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('videos')
@ApiBearerAuth()
@ApiTags('VIDEOS')
@UseGuards(JwtGuardGuard)
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  //@HttpCode(204)
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async findAll() {
    const data = await this.videosService.findAll();
    return {
      message : 'Información cargada',
      data: data
    }
  }

  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   if (id < 1) {
  //     throw new HttpException(`Id no válido ${id}`, HttpStatus.FORBIDDEN)
  //   }
  //   return 'OK'//this.videosService.findOne(+id);
  // }
 
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
      const data = await this.videosService.findOne(id);
      return {
        message: 'Petición correcta',
        data: data
      }
    }
   
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file', {storage: storage}))
  // uploadFile(@UploadedFile() file : Express.Multer.File){
  //   console.log(file);
  // }
}
