import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './entities/video.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VideosService {

  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>
  ){

  }

  async create(createVideoDTO: CreateVideoDto){
    const createVideo = await this.videoRepository.create(createVideoDTO);
    return await this.videoRepository.save(createVideo);
  }

  // create(createVideoDto: CreateVideoDto) {
  //   return createVideoDto;//'This action adds a new video';
  // }

  async findAll(): Promise<Video[]> {
    return await this.videoRepository.find();
  }

  async findOne(id: number): Promise<Video> {
    const videoFound = await this.videoRepository.findOneBy({id});
    if (!videoFound) {
      throw new NotFoundException('Video no existente en la lista.')
    }

    return videoFound;
  }

  async update(id: number, updateVideoDto: UpdateVideoDto) {
    const getVideo = await this.videoRepository.findOne({
      where:{
        id
      }
    })

    if (!getVideo) {
      throw new NotFoundException('Video no existente en la lista.')
    }
    const updateVideo = await Object.assign(getVideo, updateVideoDto);
    return await this.videoRepository.save(updateVideo);

  }

  async remove(id: number) {
    return await this.videoRepository.delete(id);
  }
}
