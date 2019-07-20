import { Injectable, Inject, BadRequestException } from '@nestjs/common';

@Injectable()
export class LocationService {
  constructor( @Inject('dbconnection') private readonly connection) { }



  async  getLocations(){
   try {
      const query = await  this.connection.query(
        `SELECT row_to_json(fc)
        FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
        FROM (SELECT 'Feature' As type
           , ST_AsGeoJSON(lg.point)::json As geometry
           , row_to_json((SELECT l FROM (SELECT idLocation) As l
             )) As properties
          FROM geoprogram_schema.location As lg   ) As f )  As fc;`
      );
      return await query.rows
   } catch (error) {
     return error;
   }
  }
 
  async  getCultivos(){
   try {
      const query = await  this.connection.query(
        `SELECT row_to_json(fc)
        FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
        FROM (SELECT 'Feature' As type
           , ST_AsGeoJSON(lg.geom)::json As geometry
           , row_to_json((SELECT l FROM (SELECT tipo) As l
             )) As properties
          FROM cultivo As lg   ) As f )  As fc`
      );
      return await query.rows
   } catch (error) {
     return error;
   }
  }
  async  getVias(){
   try {
      const query = await  this.connection.query(
        `SELECT row_to_json(fc)
        FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
        FROM (SELECT 'Feature' As type
           , ST_AsGeoJSON(lg.point)::json As geometry
           , row_to_json((SELECT l FROM (SELECT idLocation) As l
             )) As properties
          FROM geoprogram_schema.location As lg   ) As f )  As fc;`
      );
      return await query.rows
   } catch (error) {
     return error;
   }
  }
 

  public createLocation() {
    return new Promise((resolve, reject) => {
      this.connection.query(
        '',
        (err, result) => {
          return !err
            ? resolve({ 'message': 'Registered Location' })
            : reject(new BadRequestException(err.message))
        })
    })
  }

}
