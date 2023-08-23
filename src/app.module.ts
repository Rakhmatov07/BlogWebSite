import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [BlogModule, AuthModule, SharedModule, FileModule],
})
export class AppModule {}
