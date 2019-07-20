import { Get, Controller, Request, Response, HttpStatus, Post, Body, Param, Delete } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('getAll')
  public async getLocations(
    @Request() req,
    @Response() res
  ) {
    const locations = await this.locationService.getLocations();
    res.status(HttpStatus.OK).json(locations);
  }
  @Get('getCultivos')
  public async getCultivos(
    @Request() req,
    @Response() res
  ) {
    const cultivos = await this.locationService.getCultivos();
    res.status(HttpStatus.OK).json(cultivos);
  }


  @Post('createLocation')
  public async createLocation(
    @Request() req, 
    @Response() res, 
    @Body('latitude') latitude,
    @Body('longitude') longitude,
  ){
   // const response = this.locationService.createUser(user);
  //  res.status(HttpStatus.OK).json(response);
  }

}
