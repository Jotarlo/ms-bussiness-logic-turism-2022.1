import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {AmusementType, AmusementTypeRelations} from '../models';

export class AmusementTypeRepository extends DefaultCrudRepository<
  AmusementType,
  typeof AmusementType.prototype.id,
  AmusementTypeRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(AmusementType, dataSource);
  }
}
