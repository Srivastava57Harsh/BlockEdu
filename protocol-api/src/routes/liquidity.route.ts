import { Router } from 'express';
import liquidityController from '../controllers/liquidity.controller';

const router = Router();

router
  .route('/')
  .post(
    // validate(liquidityValidation.createLiquidity),
    liquidityController.createLiquidity
  )
  .get(
    // validate(liquidityValidation.getLiquiditys),
    liquidityController.getLiquiditys
  )
  .patch(liquidityController.patchLiquidity);

router
  .route('/:liquidityId')
  .get(
    // validate(liquidityValidation.getLiquidity),
    liquidityController.getLiquidity
  )
  .patch(
    // validate(liquidityValidation.updateLiquidity),
    liquidityController.updateLiquidity
  )
  .delete(
    // validate(liquidityValidation.deleteLiquidity),
    liquidityController.deleteLiquidity
  );

export default router;
