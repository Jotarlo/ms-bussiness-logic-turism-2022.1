import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {City, CityRelations, Region} from '../models';
import {RegionRepository} from './region.repository';

export class CityRepository extends DefaultCrudRepository<
  City,
  typeof City.prototype.id,
  CityRelations
> {

  public readonly region: BelongsToAccessor<Region, typeof City.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('RegionRepository') protected regionRepositoryGetter: Getter<RegionRepository>,
  ) {
    super(City, dataSource);
    this.region = this.createBelongsToAccessorFor('region', regionRepositoryGetter,);
    this.registerInclusionResolver('region', this.region.inclusionResolver);
  }
}
