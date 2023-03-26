import { Router } from 'express';
import swapController from '../controllers/swap.controller';

const router = Router();

router
  .route('/')
  .post(
    // validate(swapValidation.createSwap),
    swapController.createSwap
  )
  .get(
    // validate(swapValidation.getSwaps),
    swapController.getSwaps
  )
  .patch(swapController.patchSwap);

router
  .route('/:swapId')
  .get(
    // validate(swapValidation.getSwap),
    swapController.getSwap
  )
  .patch(
    // validate(swapValidation.updateSwap),
    swapController.updateSwap
  )
  .delete(
    // validate(swapValidation.deleteSwap),
    swapController.deleteSwap
  );

export default router;
