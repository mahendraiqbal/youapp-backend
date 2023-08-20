import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from '../auth/auth.guard';
import mongoose from 'mongoose';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.profilesService.findOne(+id);
  // }

  @UseGuards(AuthGuard)
  @Get('byId')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
    @Req() request: Request,
  ) {
    try {
      const objectId = new mongoose.Types.ObjectId(id); // Convert the id to ObjectId
      console.log('URL:', request.url); // Log the URL
      console.log('ID:', objectId.toHexString());

      const existingProfile = await this.profilesService.update(
        objectId.toHexString(),
        updateProfileDto,
      );
      if (!existingProfile) {
        throw new NotFoundException('Profile not found');
      }

      return existingProfile;
    } catch (error) {
      throw new NotFoundException('Invalid profile ID');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilesService.remove(+id);
  }
}
