import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelperModule } from 'src/helper/helper.module';
import { UserWorkspace } from 'src/user-workspace/entities/user-workspace.entity';
import { UserWorkspaceModule } from 'src/user-workspace/user-workspace.module';
import { WorkspaceMembersController } from './controllers/workspace-members.controller';
import { WorkspaceController } from './controllers/workspace.controller';
import { Workspace } from './entities/workspace.entity';
import { WorkspaceMembersService } from './services/workspace-members.service';
import { WorkspaceService } from './services/workspace.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Workspace, UserWorkspace]),
		UserWorkspaceModule,
		HelperModule,
	],
	providers: [WorkspaceService, WorkspaceMembersService],
	controllers: [WorkspaceController, WorkspaceMembersController],
	exports: [WorkspaceService],
})
export class WorkspaceModule {}
