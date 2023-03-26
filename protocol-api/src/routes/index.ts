import { Router } from 'express';
import userRoute from './user.route';
import protocolRoute from './protocol.route';
import liquidityRoute from './liquidity.route';
import swapRoute from './swap.route';

const router = Router();

const defaultRoutes = [
  { path: '/user', route: userRoute },
  { path: '/protocol', route: protocolRoute },
  { path: '/liquidity', route: liquidityRoute },
  { path: '/swap', route: swapRoute },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
