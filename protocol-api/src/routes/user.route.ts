import { Router } from 'express';
import userController from '../controllers/user.controller';

const router = Router();

router
  .route('/')
  .post(
    // validate(userValidation.createUser),
    userController.createUser
  )
  .get(
    // validate(userValidation.getUsers),

    userController.getUsers
  )
  .patch(userController.patchUser);

router
  .route('/:userId')
  .get(
    // validate(userValidation.getUser),
    userController.getUser
  )
  .patch(
    // validate(userValidation.updateUser),
    userController.updateUser
  )
  .delete(
    // validate(userValidation.deleteUser),
    userController.deleteUser
  );

export default router;
