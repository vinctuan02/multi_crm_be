import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Req,
	UnauthorizedException,
	UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import {
	DataListSuccessDto,
	ResponseSuccessDto,
} from 'src/common/dto/response.dto';
import { WorkspaceRolesGuard } from 'src/common/guards/workspace-roles.guard';
import { CustomRequest } from 'src/common/interface/custom-request.interface';
import { TypeID } from 'src/common/typeorm/enum/db-type.enum';
import { WorkspaceRole } from 'src/user-workspace/enums/user-workspace.enum';
import { CustomerService } from './customer.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { Customer } from './entities/customer.entity';

@Controller('customers')
@UseGuards(WorkspaceRolesGuard)
export class CustomerController {
	constructor(private readonly customerService: CustomerService) {}

	private getWorkspaceId(req: CustomRequest): TypeID {
		if (!req.workspaceId) {
			throw new UnauthorizedException('Workspace not found in request');
		}
		return req.workspaceId;
	}

	@Post()
	@Roles(WorkspaceRole.ADMIN, WorkspaceRole.MEMBER)
	async create(
		@Req() req: CustomRequest,
		@Body() dto: CreateCustomerDto,
	): Promise<ResponseSuccessDto<Customer>> {
		const workspaceId = this.getWorkspaceId(req);
		const data = await this.customerService.create(workspaceId, dto);
		return new ResponseSuccessDto({ data });
	}

	@Get()
	async findAll(
		@Req() req: CustomRequest,
	): Promise<ResponseSuccessDto<DataListSuccessDto<Customer>>> {
		const workspaceId = this.getWorkspaceId(req);
		const data = await this.customerService.findAll(workspaceId);

		return new ResponseSuccessDto({ data });
	}

	@Patch(':customerId')
	async update(
		@Req() req: CustomRequest,
		@Param('customerId', ParseIntPipe) customerId: TypeID,
		@Body() dto: UpdateCustomerDto,
	) {
		const workspaceId = this.getWorkspaceId(req);
		const data = await this.customerService.update(
			workspaceId,
			customerId,
			dto,
		);
		return new ResponseSuccessDto({ data });
	}

	@Delete(':customerId')
	async remove(
		@Req() req: CustomRequest,
		@Param('customerId', ParseIntPipe) customerId: TypeID,
	) {
		const workspaceId = this.getWorkspaceId(req);
		const data = await this.customerService.remove(workspaceId, customerId);
		return new ResponseSuccessDto({ message: 'Customer deleted', data });
	}
}
