import { Permissions } from './../enums/permissions';
import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { validateReqBody, validateReqQuery } from '../middleware/validator';
import { authorize, authorizeCRUD } from '../middleware/authorize';
import {
  createMenuItem,
  deleteMenuItem,
  editMenuItem,
  getAllMenuItems,
  getMenuItem,
} from '../controllers/menuItem';
import {
  createMenuItemBodySchema,
  editMenuItemBodySchema,
  menuItemIDQuerySchema,
} from '../schema/menuItem';

const menuItemRouter = express();

//for everyone
menuItemRouter.get('/', getAllMenuItems);

menuItemRouter.post('/', validateReqQuery(menuItemIDQuerySchema), getMenuItem);
menuItemRouter.post(
  '/create',
  validateReqBody(createMenuItemBodySchema),
  authenticate,
  authorize(Permissions.CREATE_MENU_ITEM),
  authorizeCRUD,
  createMenuItem,
);

menuItemRouter.patch(
  '/edit/',
  validateReqBody(editMenuItemBodySchema),
  authenticate,
  authorize(Permissions.EDIT_MENU_ITEM),
  authorizeCRUD,
  editMenuItem,
);

menuItemRouter.delete(
  '/delete/',
  authenticate,
  authorize(Permissions.DELETE_MENU_ITEM),
  authorizeCRUD,
  deleteMenuItem,
);
export default menuItemRouter;