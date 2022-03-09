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
Visitor,
VisitorSite,
Site,
} from '../models';
import {VisitorRepository} from '../repositories';

export class VisitorSiteController {
  constructor(
    @repository(VisitorRepository) protected visitorRepository: VisitorRepository,
  ) { }

  @get('/visitors/{id}/sites', {
    responses: {
      '200': {
        description: 'Array of Visitor has many Site through VisitorSite',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Site)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Site>,
  ): Promise<Site[]> {
    return this.visitorRepository.sites(id).find(filter);
  }

  @post('/visitors/{id}/sites', {
    responses: {
      '200': {
        description: 'create a Site model instance',
        content: {'application/json': {schema: getModelSchemaRef(Site)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Visitor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Site, {
            title: 'NewSiteInVisitor',
            exclude: ['id'],
          }),
        },
      },
    }) site: Omit<Site, 'id'>,
  ): Promise<Site> {
    return this.visitorRepository.sites(id).create(site);
  }

  @patch('/visitors/{id}/sites', {
    responses: {
      '200': {
        description: 'Visitor.Site PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Site, {partial: true}),
        },
      },
    })
    site: Partial<Site>,
    @param.query.object('where', getWhereSchemaFor(Site)) where?: Where<Site>,
  ): Promise<Count> {
    return this.visitorRepository.sites(id).patch(site, where);
  }

  @del('/visitors/{id}/sites', {
    responses: {
      '200': {
        description: 'Visitor.Site DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Site)) where?: Where<Site>,
  ): Promise<Count> {
    return this.visitorRepository.sites(id).delete(where);
  }
}
