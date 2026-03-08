import { IOrderRepository } from "../../interfaces/IOrderRepository";
import { OrderDTO } from "../../dtos/order.dto";

export class GetAllOrdersUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(): Promise<OrderDTO[]> {
    return this.orderRepository.findAll();
  }
}
