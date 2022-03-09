import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {VisitorSite, VisitorSiteRelations, Comment, Qualify} from '../models';
import {CommentRepository} from './comment.repository';
import {QualifyRepository} from './qualify.repository';

export class VisitorSiteRepository extends DefaultCrudRepository<
  VisitorSite,
  typeof VisitorSite.prototype.id,
  VisitorSiteRelations
> {

  public readonly comment: HasOneRepositoryFactory<Comment, typeof VisitorSite.prototype.id>;

  public readonly qualify: HasOneRepositoryFactory<Qualify, typeof VisitorSite.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CommentRepository') protected commentRepositoryGetter: Getter<CommentRepository>, @repository.getter('QualifyRepository') protected qualifyRepositoryGetter: Getter<QualifyRepository>,
  ) {
    super(VisitorSite, dataSource);
    this.qualify = this.createHasOneRepositoryFactoryFor('qualify', qualifyRepositoryGetter);
    this.registerInclusionResolver('qualify', this.qualify.inclusionResolver);
    this.comment = this.createHasOneRepositoryFactoryFor('comment', commentRepositoryGetter);
    this.registerInclusionResolver('comment', this.comment.inclusionResolver);
  }
}
