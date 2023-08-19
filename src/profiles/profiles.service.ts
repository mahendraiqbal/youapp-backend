import { Injectable, Inject } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Model } from 'mongoose';
import { Profile } from './interfaces/profile.interface';

@Injectable()
export class ProfilesService {
  constructor(
    @Inject('PROFILE_MODEL')
    private profileModel: Model<Profile>,
  ) {}

  create(createProfileDto: CreateProfileDto) {
    const createdProfile = new this.profileModel(createProfileDto);
    return createdProfile.save();
  }

  async findAll(): Promise<Profile[]> {
    return this.profileModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(updateProfileDto: UpdateProfileDto) {
    return new this.profileModel(updateProfileDto);
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
