import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Region, RegionRelations, City} from '../models';
import {CityRepository} from './city.repository';

export class RegionRepository extends DefaultCrudRepository<
  Region,
  typeof Region.prototype.id,
  RegionRelations
> {

  public readonly has_cities: HasManyRepositoryFactory<City, typeof Region.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CityRepository') protected cityRepositoryGetter: Getter<CityRepository>,
  ) {
    super(Region, dataSource);
    this.has_cities = this.createHasManyRepositoryFactoryFor('has_cities', cityRepositoryGetter,);
    this.registerInclusionResolver('has_cities', this.has_cities.inclusionResolver);
  }
}
