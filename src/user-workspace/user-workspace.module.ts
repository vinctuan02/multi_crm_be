import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelperModule } from 'src/helper/helper.module';
import { User } from 'src/user/entities/user.entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import { UserWorkspace } from './entities/user-workspace.entity';
import { UserWorkspaceController } from './user-workspace.controller';
import { UserWorkspaceService } from './user-workspace.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserWorkspace, User, Workspace]),
		HelperModule,
	],
	providers: [UserWorkspaceService],
	controllers: [UserWorkspaceController],
	exports: [UserWorkspaceService],
})
export class UserWorkspaceModule {}
