import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {AccessType, AccessTypeRelations, Site} from '../models';
import {SiteRepository} from './site.repository';

export class AccessTypeRepository extends DefaultCrudRepository<
  AccessType,
  typeof AccessType.prototype.id,
  AccessTypeRelations
> {

  public readonly sites: HasManyRepositoryFactory<Site, typeof AccessType.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SiteRepository') protected siteRepositoryGetter: Getter<SiteRepository>,
  ) {
    super(AccessType, dataSource);
    this.sites = this.createHasManyRepositoryFactoryFor('sites', siteRepositoryGetter,);
    this.registerInclusionResolver('sites', this.sites.inclusionResolver);
  }
}
