import { BaseEntity } from 'src/common/entity/base-entity';
import { TypeID } from 'src/common/typeorm/enum/db-type.enum';
import { User } from 'src/user/entities/user.entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { WorkspaceRole } from '../enums/user-workspace.enum';

@Entity('user_workspace')
@Unique(['userId', 'workspaceId'])
export class UserWorkspace extends BaseEntity {
	@Column()
	userId: TypeID;

	@Column()
	workspaceId: TypeID;

	@ManyToOne(() => User, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	@JoinColumn({ name: 'userId' })
	user: User;

	@ManyToOne(() => Workspace, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	@JoinColumn({ name: 'workspaceId' })
	workspace: Workspace;

	@Column({
		type: 'enum',
		enum: WorkspaceRole,
		default: WorkspaceRole.VIEWER,
	})
	role: WorkspaceRole;
}
