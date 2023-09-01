import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PageDto } from '../models/dtos/page.dto';

interface PaginateParams<TModel> {
  type: TModel;
  description: string;
}

export const ApiPaginatedResponse = <TModel extends Type<any>>({
  type,
  description,
}: PaginateParams<TModel>) =>
  applyDecorators(
    ApiExtraModels(PageDto),
    ApiExtraModels(type),
    ApiOkResponse({
      description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(PageDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(type) },
              },
            },
          },
        ],
      },
    }),
  );
