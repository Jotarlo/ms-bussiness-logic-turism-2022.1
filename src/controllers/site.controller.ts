import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Site} from '../models';
import {SiteRepository} from '../repositories';

export class SiteController {
  constructor(
    @repository(SiteRepository)
    public siteRepository : SiteRepository,
  ) {}

  @post('/sites')
  @response(200, {
    description: 'Site model instance',
    content: {'application/json': {schema: getModelSchemaRef(Site)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Site, {
            title: 'NewSite',
            exclude: ['id'],
          }),
        },
      },
    })
    site: Omit<Site, 'id'>,
  ): Promise<Site> {
    return this.siteRepository.create(site);
  }

  @get('/sites/count')
  @response(200, {
    description: 'Site model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Site) where?: Where<Site>,
  ): Promise<Count> {
    return this.siteRepository.count(where);
  }

  @get('/sites')
  @response(200, {
    description: 'Array of Site model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Site, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Site) filter?: Filter<Site>,
  ): Promise<Site[]> {
    return this.siteRepository.find(filter);
  }

  @patch('/sites')
  @response(200, {
    description: 'Site PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Site, {partial: true}),
        },
      },
    })
    site: Site,
    @param.where(Site) where?: Where<Site>,
  ): Promise<Count> {
    return this.siteRepository.updateAll(site, where);
  }

  @get('/sites/{id}')
  @response(200, {
    description: 'Site model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Site, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Site, {exclude: 'where'}) filter?: FilterExcludingWhere<Site>
  ): Promise<Site> {
    return this.siteRepository.findById(id, filter);
  }

  @patch('/sites/{id}')
  @response(204, {
    description: 'Site PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Site, {partial: true}),
        },
      },
    })
    site: Site,
  ): Promise<void> {
    await this.siteRepository.updateById(id, site);
  }

  @put('/sites/{id}')
  @response(204, {
    description: 'Site PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() site: Site,
  ): Promise<void> {
    await this.siteRepository.replaceById(id, site);
  }

  @del('/sites/{id}')
  @response(204, {
    description: 'Site DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.siteRepository.deleteById(id);
  }
}
