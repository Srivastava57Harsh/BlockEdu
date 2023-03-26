import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../utils/CatchAsync';
import pick from '../utils/pick';
import ApiError from '../utils/ApiError';
import { protocolService } from '../services';

const createProtocol = catchAsync(async (req: Request, res: Response) => {
  const protocol = await protocolService.createProtocol(req.body);
  res.status(httpStatus.CREATED).send(protocol);
});

const patchProtocol = catchAsync(async (req: Request, res: Response) => {
  const protocol = await protocolService.patchProtocol(req.body);
  res.status(httpStatus.CREATED).send(protocol);
});

const getProtocols = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await protocolService.queryProtocols(filter, options);
  res.send(result);
});

const getProtocol = catchAsync(async (req: Request, res: Response) => {
  const protocol = await protocolService.getProtocolById(req.params.protocolId);
  if (!protocol) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Protocol not found');
  }
  res.send(protocol);
});

const updateProtocol = catchAsync(async (req: Request, res: Response) => {
  const protocol = await protocolService.updateProtocolById(
    req.params.protocolId,
    req.body
  );
  res.send(protocol);
});

const deleteProtocol = catchAsync(async (req: Request, res: Response) => {
  await protocolService.deleteProtocolById(req.params.protocolId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createProtocol,
  patchProtocol,
  getProtocols,
  getProtocol,
  updateProtocol,
  deleteProtocol,
};
