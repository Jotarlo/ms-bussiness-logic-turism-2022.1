import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Site, SiteRelations, AccessType, City, Amusement, Visitor, VisitorSite} from '../models';
import {AccessTypeRepository} from './access-type.repository';
import {CityRepository} from './city.repository';
import {AmusementRepository} from './amusement.repository';
import {VisitorSiteRepository} from './visitor-site.repository';
import {VisitorRepository} from './visitor.repository';

export class SiteRepository extends DefaultCrudRepository<
  Site,
  typeof Site.prototype.id,
  SiteRelations
> {

  public readonly accessType: BelongsToAccessor<AccessType, typeof Site.prototype.id>;

  public readonly city: BelongsToAccessor<City, typeof Site.prototype.id>;

  public readonly amusements: HasManyRepositoryFactory<Amusement, typeof Site.prototype.id>;

  public readonly visitors: HasManyThroughRepositoryFactory<Visitor, typeof Visitor.prototype.id,
          VisitorSite,
          typeof Site.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('AccessTypeRepository') protected accessTypeRepositoryGetter: Getter<AccessTypeRepository>, @repository.getter('CityRepository') protected cityRepositoryGetter: Getter<CityRepository>, @repository.getter('AmusementRepository') protected amusementRepositoryGetter: Getter<AmusementRepository>, @repository.getter('VisitorSiteRepository') protected visitorSiteRepositoryGetter: Getter<VisitorSiteRepository>, @repository.getter('VisitorRepository') protected visitorRepositoryGetter: Getter<VisitorRepository>,
  ) {
    super(Site, dataSource);
    this.visitors = this.createHasManyThroughRepositoryFactoryFor('visitors', visitorRepositoryGetter, visitorSiteRepositoryGetter,);
    this.registerInclusionResolver('visitors', this.visitors.inclusionResolver);
    this.amusements = this.createHasManyRepositoryFactoryFor('amusements', amusementRepositoryGetter,);
    this.registerInclusionResolver('amusements', this.amusements.inclusionResolver);
    this.city = this.createBelongsToAccessorFor('city', cityRepositoryGetter,);
    this.registerInclusionResolver('city', this.city.inclusionResolver);
    this.accessType = this.createBelongsToAccessorFor('accessType', accessTypeRepositoryGetter,);
    this.registerInclusionResolver('accessType', this.accessType.inclusionResolver);
  }
}
