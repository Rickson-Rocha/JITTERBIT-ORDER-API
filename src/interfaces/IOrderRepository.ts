import {
  OrderDTO,
  CreateOrderInputDTO,
  UpdateOrderInputDTO,
} from "../dtos/order.dto";

export interface IOrderRepository {
  create(data: CreateOrderInputDTO): Promise<OrderDTO>;
  findById(orderId: string): Promise<OrderDTO | null>;
  findAll(): Promise<OrderDTO[]>;
  update(orderId: string, data: UpdateOrderInputDTO): Promise<OrderDTO | null>;
  delete(orderId: string): Promise<boolean>;
}
