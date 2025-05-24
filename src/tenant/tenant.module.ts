import { Module } from '@nestjs/common';
import { WorkspaceModule } from 'src/workspace/workspace.module';

@Module({
	imports: [WorkspaceModule],
})
export class TenantModule {}
