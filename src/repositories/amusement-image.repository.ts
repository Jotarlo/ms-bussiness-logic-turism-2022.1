import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {AmusementImage, AmusementImageRelations, Amusement} from '../models';
import {AmusementRepository} from './amusement.repository';

export class AmusementImageRepository extends DefaultCrudRepository<
  AmusementImage,
  typeof AmusementImage.prototype.id,
  AmusementImageRelations
> {

  public readonly amusement: BelongsToAccessor<Amusement, typeof AmusementImage.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('AmusementRepository') protected amusementRepositoryGetter: Getter<AmusementRepository>,
  ) {
    super(AmusementImage, dataSource);
    this.amusement = this.createBelongsToAccessorFor('amusement', amusementRepositoryGetter,);
    this.registerInclusionResolver('amusement', this.amusement.inclusionResolver);
  }
}
