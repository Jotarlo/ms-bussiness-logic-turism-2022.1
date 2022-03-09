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
import {Visitor} from '../models';
import {VisitorRepository} from '../repositories';

export class VisitorController {
  constructor(
    @repository(VisitorRepository)
    public visitorRepository : VisitorRepository,
  ) {}

  @post('/visitors')
  @response(200, {
    description: 'Visitor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Visitor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitor, {
            title: 'NewVisitor',
            exclude: ['id'],
          }),
        },
      },
    })
    visitor: Omit<Visitor, 'id'>,
  ): Promise<Visitor> {
    return this.visitorRepository.create(visitor);
  }

  @get('/visitors/count')
  @response(200, {
    description: 'Visitor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Visitor) where?: Where<Visitor>,
  ): Promise<Count> {
    return this.visitorRepository.count(where);
  }

  @get('/visitors')
  @response(200, {
    description: 'Array of Visitor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Visitor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Visitor) filter?: Filter<Visitor>,
  ): Promise<Visitor[]> {
    return this.visitorRepository.find(filter);
  }

  @patch('/visitors')
  @response(200, {
    description: 'Visitor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitor, {partial: true}),
        },
      },
    })
    visitor: Visitor,
    @param.where(Visitor) where?: Where<Visitor>,
  ): Promise<Count> {
    return this.visitorRepository.updateAll(visitor, where);
  }

  @get('/visitors/{id}')
  @response(200, {
    description: 'Visitor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Visitor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Visitor, {exclude: 'where'}) filter?: FilterExcludingWhere<Visitor>
  ): Promise<Visitor> {
    return this.visitorRepository.findById(id, filter);
  }

  @patch('/visitors/{id}')
  @response(204, {
    description: 'Visitor PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitor, {partial: true}),
        },
      },
    })
    visitor: Visitor,
  ): Promise<void> {
    await this.visitorRepository.updateById(id, visitor);
  }

  @put('/visitors/{id}')
  @response(204, {
    description: 'Visitor PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() visitor: Visitor,
  ): Promise<void> {
    await this.visitorRepository.replaceById(id, visitor);
  }

  @del('/visitors/{id}')
  @response(204, {
    description: 'Visitor DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.visitorRepository.deleteById(id);
  }
}
