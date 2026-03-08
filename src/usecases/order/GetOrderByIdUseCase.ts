import { IOrderRepository } from "../../interfaces/IOrderRepository";
import { OrderDTO } from "../../dtos/order.dto";
import { NotFoundError } from "../../erros/NotFoundError";

export class GetOrderByIdUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(orderId: string): Promise<OrderDTO> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new NotFoundError(`Order "${orderId}" not found.`);
    }

    return order;
  }
}
