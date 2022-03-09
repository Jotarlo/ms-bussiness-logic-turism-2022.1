import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {City, CityRelations, Region, Site} from '../models';
import {RegionRepository} from './region.repository';
import {SiteRepository} from './site.repository';

export class CityRepository extends DefaultCrudRepository<
  City,
  typeof City.prototype.id,
  CityRelations
> {

  public readonly region: BelongsToAccessor<Region, typeof City.prototype.id>;

  public readonly sites: HasManyRepositoryFactory<Site, typeof City.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('RegionRepository') protected regionRepositoryGetter: Getter<RegionRepository>, @repository.getter('SiteRepository') protected siteRepositoryGetter: Getter<SiteRepository>,
  ) {
    super(City, dataSource);
    this.sites = this.createHasManyRepositoryFactoryFor('sites', siteRepositoryGetter,);
    this.registerInclusionResolver('sites', this.sites.inclusionResolver);
    this.region = this.createBelongsToAccessorFor('region', regionRepositoryGetter,);
    this.registerInclusionResolver('region', this.region.inclusionResolver);
  }
}
