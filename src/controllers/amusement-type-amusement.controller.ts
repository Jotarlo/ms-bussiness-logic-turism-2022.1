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
  AmusementType,
  Amusement,
} from '../models';
import {AmusementTypeRepository} from '../repositories';

export class AmusementTypeAmusementController {
  constructor(
    @repository(AmusementTypeRepository) protected amusementTypeRepository: AmusementTypeRepository,
  ) { }

  @get('/amusement-types/{id}/amusements', {
    responses: {
      '200': {
        description: 'Array of AmusementType has many Amusement',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Amusement)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Amusement>,
  ): Promise<Amusement[]> {
    return this.amusementTypeRepository.amusements(id).find(filter);
  }

  @post('/amusement-types/{id}/amusements', {
    responses: {
      '200': {
        description: 'AmusementType model instance',
        content: {'application/json': {schema: getModelSchemaRef(Amusement)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof AmusementType.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Amusement, {
            title: 'NewAmusementInAmusementType',
            exclude: ['id'],
            optional: ['amusementTypeId']
          }),
        },
      },
    }) amusement: Omit<Amusement, 'id'>,
  ): Promise<Amusement> {
    return this.amusementTypeRepository.amusements(id).create(amusement);
  }

  @patch('/amusement-types/{id}/amusements', {
    responses: {
      '200': {
        description: 'AmusementType.Amusement PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Amusement, {partial: true}),
        },
      },
    })
    amusement: Partial<Amusement>,
    @param.query.object('where', getWhereSchemaFor(Amusement)) where?: Where<Amusement>,
  ): Promise<Count> {
    return this.amusementTypeRepository.amusements(id).patch(amusement, where);
  }

  @del('/amusement-types/{id}/amusements', {
    responses: {
      '200': {
        description: 'AmusementType.Amusement DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Amusement)) where?: Where<Amusement>,
  ): Promise<Count> {
    return this.amusementTypeRepository.amusements(id).delete(where);
  }
}
