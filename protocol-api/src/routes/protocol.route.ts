import { Router } from 'express';
import protocolController from '../controllers/protocol.controller';

const router = Router();

router
  .route('/')
  .post(
    // validate(protocolValidation.createProtocol),
    protocolController.createProtocol
  )
  .get(
    // validate(protocolValidation.getProtocols),
    protocolController.getProtocols
  )
  .patch(protocolController.patchProtocol);

router
  .route('/:protocolId')
  .get(
    // validate(protocolValidation.getProtocol),
    protocolController.getProtocol
  )
  .patch(
    // validate(protocolValidation.updateProtocol),
    protocolController.updateProtocol
  )
  .delete(
    // validate(protocolValidation.deleteProtocol),
    protocolController.deleteProtocol
  );

export default router;
