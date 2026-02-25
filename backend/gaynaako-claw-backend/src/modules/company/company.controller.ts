import { Controller, Post, Get, Put, Delete, Body, Param, Query, Req, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { AuthGuard } from '../../auth/auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';


@Controller('company')
export class CompanyController {
  constructor(private readonly service: CompanyService) {}

  @Post()
  create(@Body() dto: CreateCompanyDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  /*@UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'manager')*/
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCompanyDto,
    @Req() req, // Injecte la requête pour récupérer l'utilisateur
  ) {
    const currentUserId = req.user.id; // selon ton guard JWT
    return this.service.update(id, dto, currentUserId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Post(':id/calculate-scores')
  async calculateScores(@Param('id') id: string, @Req() req) {
    const company = await this.service.findOne(id);
    const scores = this.service['calculateScores'](company); // appelle la fonction privée du service
    const currentUserId = req.user.id; // selon ton guard JWT

    // Optionnel : sauvegarder les scores recalculés
    Object.assign(company, scores);
    await this.service.update(id, company, currentUserId);
    return scores;
  }

  @Get('filter')
  filter(@Query() filter: any) {
    return this.service.filterCompanies(filter);
  }
  
}