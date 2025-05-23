import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelperModule } from 'src/helper/helper.module';
import { UserWorkspace } from './entities/user-workspace.entity';
import { UserWorkspaceController } from './user-workspace.controller';
import { UserWorkspaceService } from './user-workspace.service';

@Module({
	imports: [TypeOrmModule.forFeature([UserWorkspace]), HelperModule],
	providers: [UserWorkspaceService],
	controllers: [UserWorkspaceController],
	exports: [UserWorkspaceService],
})
export class UserWorkspaceModule {}
