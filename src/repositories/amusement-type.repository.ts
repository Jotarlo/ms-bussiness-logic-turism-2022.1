import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {AmusementType, AmusementTypeRelations, Amusement} from '../models';
import {AmusementRepository} from './amusement.repository';

export class AmusementTypeRepository extends DefaultCrudRepository<
  AmusementType,
  typeof AmusementType.prototype.id,
  AmusementTypeRelations
> {

  public readonly amusements: HasManyRepositoryFactory<Amusement, typeof AmusementType.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('AmusementRepository') protected amusementRepositoryGetter: Getter<AmusementRepository>,
  ) {
    super(AmusementType, dataSource);
    this.amusements = this.createHasManyRepositoryFactoryFor('amusements', amusementRepositoryGetter,);
    this.registerInclusionResolver('amusements', this.amusements.inclusionResolver);
  }
}
