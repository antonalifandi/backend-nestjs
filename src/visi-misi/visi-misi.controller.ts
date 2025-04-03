import { Controller, Get, Post, Patch, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { VisiMisiService } from './visi-misi.service';
import { CreateVisiMisiDto } from 'src/dto/create-visi-misi.dto';
import { UpdateVisiMisiDto } from 'src/dto/update-visi-misi.dto';

@ApiTags('visi-misi')
@Controller('visi-misi')
export class VisiMisiController {
  constructor(private readonly visiMisiService: VisiMisiService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new visi misi' })
  @ApiResponse({ status: 201, description: 'Visi misi successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createVisiMisiDto: CreateVisiMisiDto) {
    return this.visiMisiService.create(createVisiMisiDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get the current visi misi' })
  @ApiResponse({ status: 200, description: 'Visi misi data.' })
  @ApiResponse({ status: 404, description: 'Visi misi not found.' })
  async findOne() {
    return this.visiMisiService.findOne();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update visi misi information' })
  @ApiResponse({ status: 200, description: 'Visi misi updated successfully.' })
  @ApiResponse({ status: 404, description: 'Visi misi not found.' })
  async update(@Param('id') id: string, @Body() updateVisiMisiDto: UpdateVisiMisiDto) {
    return this.visiMisiService.update(id, updateVisiMisiDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete visi misi by ID' })
  @ApiResponse({ status: 200, description: 'Visi misi successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Visi misi not found.' })
  async remove(@Param('id') id: string) {
    return this.visiMisiService.remove(id);
  }
}
