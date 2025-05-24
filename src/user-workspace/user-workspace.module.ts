import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelperModule } from 'src/helper/helper.module';
import { NotificationModule } from 'src/notification/notification.module';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import { UserWorkspace } from './entities/user-workspace.entity';
import { UserWorkspaceQueryService } from './services/user-workspace.query.service';
import { UserWorkspaceService } from './services/user-workspace.service';
import { UserWorkspaceController } from './user-workspace.controller';

@Module({
	imports: [
		TypeOrmModule.forFeature([UserWorkspace, User, Workspace]),
		HelperModule,
		NotificationModule,
		UserModule,
	],
	providers: [UserWorkspaceService, UserWorkspaceQueryService],
	controllers: [UserWorkspaceController],
	exports: [UserWorkspaceService],
})
export class UserWorkspaceModule {}
