import { Permissions } from './../enums/permissions';
import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { validateReqBody } from '../middleware/validator';
import { authorize, authorizeCRUD } from '../middleware/authorize';
import { createMenuBodySchema, editMenuBodySchema } from '../schema/menu';
import {
  createMenu,
  deleteMenu,
  editMenu,
  getAllMenus,
  getMenu,
} from '../controllers/menu';

const menuRouter = express();

menuRouter.get(
  '/',
  authenticate,
  authorize(Permissions.VIEW_ALL_MENU),
  authorizeCRUD('menus'),
  getAllMenus,
);
menuRouter.post(
  '/',
  authenticate,
  authorize(Permissions.VIEW_MENU),
  authorizeCRUD('menus'),
  getMenu,
);

menuRouter.post(
  '/create',
  validateReqBody(createMenuBodySchema),
  authenticate,
  authorize(Permissions.CREATE_MENU),
  authorizeCRUD('menus'),
  createMenu,
);

menuRouter.patch(
  '/edit/',
  validateReqBody(editMenuBodySchema),
  authenticate,
  authorize(Permissions.EDIT_MENU),
  authorizeCRUD('menus'),
  editMenu,
);

menuRouter.delete(
  '/delete/',
  authenticate,
  authorize(Permissions.DELETE_MENU),
  authorizeCRUD('menus'),
  deleteMenu,
);
export default menuRouter;