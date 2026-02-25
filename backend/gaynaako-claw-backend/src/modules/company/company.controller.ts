import { Controller, Post, Get, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
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

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCompanyDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Post(':id/calculate-scores')
  async calculateScores(@Param('id') id: string) {
    const company = await this.service.findOne(id);
    const scores = this.service['calculateScores'](company); // appelle la fonction privée du service
    // Optionnel : sauvegarder les scores recalculés
    Object.assign(company, scores);
    await this.service.update(id, company);
    return scores;
  }

  @Get('filter')
  filter(@Query() filter: any) {
    return this.service.filterCompanies(filter);
  }
  
}