import { IOrderRepository } from "../../interfaces/IOrderRepository";
import { UpdateOrderInputDTO, OrderDTO } from "../../dtos/order.dto";
import { NotFoundError } from "../../erros/NotFoundError";

export class UpdateOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(orderId: string, data: UpdateOrderInputDTO): Promise<OrderDTO> {
    const updated = await this.orderRepository.update(orderId, data);

    if (!updated) {
      throw new NotFoundError(`Order "${orderId}" not found.`);
    }

    return updated;
  }
}
