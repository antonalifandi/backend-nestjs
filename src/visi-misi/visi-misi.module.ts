import { forwardRef, Module } from '@nestjs/common';
import { VisiMisiController } from './visi-misi.controller';
import { VisiMisiService } from './visi-misi.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)], 
  controllers: [VisiMisiController],
  providers: [VisiMisiService],
  exports: [VisiMisiService], 
    
})
export class VisiMisiModule {}
