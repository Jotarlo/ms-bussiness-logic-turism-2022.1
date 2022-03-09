import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  VisitorSite,
  Comment,
} from '../models';
import {VisitorSiteRepository} from '../repositories';

export class VisitorSiteCommentController {
  constructor(
    @repository(VisitorSiteRepository) protected visitorSiteRepository: VisitorSiteRepository,
  ) { }

  @get('/visitor-sites/{id}/comment', {
    responses: {
      '200': {
        description: 'VisitorSite has one Comment',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Comment),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Comment>,
  ): Promise<Comment> {
    return this.visitorSiteRepository.comment(id).get(filter);
  }

  @post('/visitor-sites/{id}/comment', {
    responses: {
      '200': {
        description: 'VisitorSite model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comment)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof VisitorSite.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comment, {
            title: 'NewCommentInVisitorSite',
            exclude: ['id'],
            optional: ['visitorSiteId']
          }),
        },
      },
    }) comment: Omit<Comment, 'id'>,
  ): Promise<Comment> {
    return this.visitorSiteRepository.comment(id).create(comment);
  }

  @patch('/visitor-sites/{id}/comment', {
    responses: {
      '200': {
        description: 'VisitorSite.Comment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comment, {partial: true}),
        },
      },
    })
    comment: Partial<Comment>,
    @param.query.object('where', getWhereSchemaFor(Comment)) where?: Where<Comment>,
  ): Promise<Count> {
    return this.visitorSiteRepository.comment(id).patch(comment, where);
  }

  @del('/visitor-sites/{id}/comment', {
    responses: {
      '200': {
        description: 'VisitorSite.Comment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Comment)) where?: Where<Comment>,
  ): Promise<Count> {
    return this.visitorSiteRepository.comment(id).delete(where);
  }
}
