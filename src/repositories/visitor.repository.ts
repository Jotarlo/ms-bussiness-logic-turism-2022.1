import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Visitor, VisitorRelations, Site, VisitorSite} from '../models';
import {VisitorSiteRepository} from './visitor-site.repository';
import {SiteRepository} from './site.repository';

export class VisitorRepository extends DefaultCrudRepository<
  Visitor,
  typeof Visitor.prototype.id,
  VisitorRelations
> {

  public readonly sites: HasManyThroughRepositoryFactory<Site, typeof Site.prototype.id,
          VisitorSite,
          typeof Visitor.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('VisitorSiteRepository') protected visitorSiteRepositoryGetter: Getter<VisitorSiteRepository>, @repository.getter('SiteRepository') protected siteRepositoryGetter: Getter<SiteRepository>,
  ) {
    super(Visitor, dataSource);
    this.sites = this.createHasManyThroughRepositoryFactoryFor('sites', siteRepositoryGetter, visitorSiteRepositoryGetter,);
    this.registerInclusionResolver('sites', this.sites.inclusionResolver);
  }
}
