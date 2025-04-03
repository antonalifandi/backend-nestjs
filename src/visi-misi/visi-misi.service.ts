import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVisiMisiDto } from 'src/dto/create-visi-misi.dto';
import { UpdateVisiMisiDto } from 'src/dto/update-visi-misi.dto';

@Injectable()
export class VisiMisiService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateVisiMisiDto) {
    const existing = await this.prisma.visi_misi.findFirst();
    if (existing) {
      throw new Error('Visi dan Misi sudah ada. Gunakan update.');
    }

    return this.prisma.visi_misi.create({
      data: {
        visi: dto.visi,
        misi: dto.misi,
      },
    });
  }

  async findOne() {
    const visiMisi = await this.prisma.visi_misi.findFirst();
    if (!visiMisi) {
      throw new NotFoundException('Visi dan Misi belum dibuat.');
    }
    return visiMisi;
  }

  async update(id: string, dto: UpdateVisiMisiDto) {
    const visiMisi = await this.prisma.visi_misi.findUnique({ where: { id } });
    if (!visiMisi) {
      throw new NotFoundException('Visi dan Misi tidak ditemukan.');
    }

    return this.prisma.visi_misi.update({
      where: { id },
      data: {
        visi: dto.visi ?? visiMisi.visi,
        misi: dto.misi ?? visiMisi.misi,
      },
    });
  }

  async remove(id: string) {
    const visiMisi = await this.prisma.visi_misi.findUnique({ where: { id } });
    if (!visiMisi) {
      throw new NotFoundException('Visi dan Misi tidak ditemukan.');
    }

    return this.prisma.visi_misi.delete({ where: { id } });
  }
}
