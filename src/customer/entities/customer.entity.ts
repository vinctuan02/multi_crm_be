import { BaseEntity } from 'src/common/entity/base-entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('customer')
export class Customer extends BaseEntity {
	@Column()
	name: string;

	@Column({ nullable: true })
	email?: string;

	@Column({ nullable: true })
	phone?: string;

	@Column({ nullable: true })
	status?: string;

	@Column()
	workspaceId: number;

	@ManyToOne(() => Workspace, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'workspaceId' })
	workspace: Workspace;
}
