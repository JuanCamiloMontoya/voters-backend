import { Error400Response, Error500Response } from "../types/error.type"

export const Error500Options = {
  type: Error500Response,
  description: 'Error interno'
}

export const Error401Options = {
  type: Error400Response,
  description: 'No está autorizado'
}

export const Error404Options = {
  type: Error400Response,
  description: 'No encontrado'
}