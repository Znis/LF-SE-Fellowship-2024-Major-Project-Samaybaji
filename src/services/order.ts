import OrderModel from '../models/orders';
import { ModelError } from '../error/modelError';
import loggerWithNameSpace from '../utils/logger';
import OrderItemServices from './orderItem';
import { ICreateOrder, IEditOrder, IOrder } from '../interfaces/order';

const logger = loggerWithNameSpace('Order Service');

export default class OrderServices {
  static async getAllOrders() {
    const orders = await OrderModel.getAllOrders();
    if (!orders) {
      return null;
    }
    const orderWithOrderItems = await Promise.all(
      orders.map(async (order) => {
        const orderItems = await OrderItemServices.getOrderItemsByOrderID(
          order.id,
        );
        return { orderDetails: order, orderItems: orderItems };
      }),
    );
    logger.info('All Orders Found');
    return orderWithOrderItems;
  }
  static async getOrder(orderID: string) {
    const order = await OrderModel.getOrder(orderID);
    if (!order) {
      logger.error(`Order of orderID ${orderID} not found`);
      return null;
    }
    const orderItems = await OrderItemServices.getOrderItemsByOrderID(order.id);

    logger.info(`Order of orderID ${orderID} found`);
    return orderItems;
  }
  static async getOrdersByUserID(userID: string) {
    const orders = await OrderModel.getOrdersByUserID(userID);
    if (!orders) {
      logger.error(`Order of userID ${userID} not found`);
      return null;
    }
    const orderWithOrderItems = await Promise.all(
      orders.map(async (order) => {
        const orderItems = await OrderItemServices.getOrderItemsByOrderID(
          order.id,
        );
        return { orderDetails: order, orderItems: orderItems };
      }),
    );
    logger.info(`Orders of userID ${userID} Found`);
    return orderWithOrderItems;
  }

  static async createOrder(userID: string, orderData: ICreateOrder) {
    const { orderItems, ...orderDetails } = orderData;
    const queryResult = await OrderModel.createOrder(userID, orderDetails)!;
    const createOrderItems =
      await OrderItemServices.createOrderItem(orderItems);
    if (!queryResult || !createOrderItems) {
      logger.error('Could not create new order');
      throw new ModelError('Could not create order');
    }
    logger.info(`Order with orderID ${queryResult.id} created`);

    return { ...orderData, id: queryResult.id } as IOrder;
  }

  static async editOrder(orderID: string, editOrderData: IEditOrder) {
    const { orderItems, ...orderDetails } = editOrderData;

    const queryResult = await OrderModel.editOrder(orderID, orderDetails)!;
    if (!queryResult) {
      logger.error('Could not create new order');
      throw new ModelError('Could not create order');
    }

    logger.info(`Order with orderID ${orderID} updated`);

    return {
      ...editOrderData,
      id: orderID,
    } as IOrder;
  }

  static async deleteOrder(orderID: string) {
    const queryResult = await OrderModel.deleteOrder(orderID)!;
    if (!queryResult) {
      logger.error(`Could not delete order with orderID ${orderID}`);
      throw new ModelError('Could not delete order');
    }
    logger.info(`Order with orderID ${orderID} deleted`);

    return true;
  }
}
