import { Injectable, Inject, NotFoundException } from '@nestjs/common';
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

  update(id: string, updateProfileDto: UpdateProfileDto) {
    const existingProfile = this.profileModel.findByIdAndUpdate(
      id,
      updateProfileDto,
      { new: true },
    );
    if (!existingProfile) {
      throw new NotFoundException('Task not found');
    }
    return existingProfile;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
