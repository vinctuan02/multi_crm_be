import { BaseEntity } from 'src/common/entity/base-entity';
import { UserWorkspace } from 'src/user-workspace/entities/user-workspace.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('workspace')
export class Workspace extends BaseEntity {

	@Column({ type: 'varchar', length: '255' })
	name: string;

	@Column({ type: 'varchar', length: 255, unique: true })
	subdomain: string;

	@Column({ type: 'varchar', length: '2000', nullable: true })
	logoUrl: string;

	@OneToMany(() => UserWorkspace, (userWorkspace) => userWorkspace.workspace)
	userWorkspaces: UserWorkspace[];
}
