import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Qualify, QualifyRelations, VisitorSite} from '../models';
import {VisitorSiteRepository} from './visitor-site.repository';

export class QualifyRepository extends DefaultCrudRepository<
  Qualify,
  typeof Qualify.prototype.id,
  QualifyRelations
> {

  public readonly visitorSite: BelongsToAccessor<VisitorSite, typeof Qualify.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('VisitorSiteRepository') protected visitorSiteRepositoryGetter: Getter<VisitorSiteRepository>,
  ) {
    super(Qualify, dataSource);
    this.visitorSite = this.createBelongsToAccessorFor('visitorSite', visitorSiteRepositoryGetter,);
    this.registerInclusionResolver('visitorSite', this.visitorSite.inclusionResolver);
  }
}
