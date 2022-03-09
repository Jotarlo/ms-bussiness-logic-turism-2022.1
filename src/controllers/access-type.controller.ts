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
import {AccessType} from '../models';
import {AccessTypeRepository} from '../repositories';

export class AccessTypeController {
  constructor(
    @repository(AccessTypeRepository)
    public accessTypeRepository : AccessTypeRepository,
  ) {}

  @post('/access-types')
  @response(200, {
    description: 'AccessType model instance',
    content: {'application/json': {schema: getModelSchemaRef(AccessType)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AccessType, {
            title: 'NewAccessType',
            exclude: ['id'],
          }),
        },
      },
    })
    accessType: Omit<AccessType, 'id'>,
  ): Promise<AccessType> {
    return this.accessTypeRepository.create(accessType);
  }

  @get('/access-types/count')
  @response(200, {
    description: 'AccessType model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AccessType) where?: Where<AccessType>,
  ): Promise<Count> {
    return this.accessTypeRepository.count(where);
  }

  @get('/access-types')
  @response(200, {
    description: 'Array of AccessType model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AccessType, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AccessType) filter?: Filter<AccessType>,
  ): Promise<AccessType[]> {
    return this.accessTypeRepository.find(filter);
  }

  @patch('/access-types')
  @response(200, {
    description: 'AccessType PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AccessType, {partial: true}),
        },
      },
    })
    accessType: AccessType,
    @param.where(AccessType) where?: Where<AccessType>,
  ): Promise<Count> {
    return this.accessTypeRepository.updateAll(accessType, where);
  }

  @get('/access-types/{id}')
  @response(200, {
    description: 'AccessType model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AccessType, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AccessType, {exclude: 'where'}) filter?: FilterExcludingWhere<AccessType>
  ): Promise<AccessType> {
    return this.accessTypeRepository.findById(id, filter);
  }

  @patch('/access-types/{id}')
  @response(204, {
    description: 'AccessType PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AccessType, {partial: true}),
        },
      },
    })
    accessType: AccessType,
  ): Promise<void> {
    await this.accessTypeRepository.updateById(id, accessType);
  }

  @put('/access-types/{id}')
  @response(204, {
    description: 'AccessType PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() accessType: AccessType,
  ): Promise<void> {
    await this.accessTypeRepository.replaceById(id, accessType);
  }

  @del('/access-types/{id}')
  @response(204, {
    description: 'AccessType DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.accessTypeRepository.deleteById(id);
  }
}
