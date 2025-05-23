import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelperModule } from 'src/helper/helper.module';
import { UserWorkspace } from 'src/user-workspace/entities/user-workspace.entity';
import { UserWorkspaceModule } from 'src/user-workspace/user-workspace.module';
import { Workspace } from './entities/workspace.entity';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Workspace, UserWorkspace]),
		UserWorkspaceModule,
		HelperModule,
	],
	providers: [WorkspaceService],
	controllers: [WorkspaceController],
	exports: [],
})
export class WorkspaceModule {}
