import { NotFoundError } from "../../erros/NotFoundError";
import { IOrderRepository } from "../../interfaces/IOrderRepository";

export class DeleteOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(orderId: string): Promise<void> {
    const deleted = await this.orderRepository.delete(orderId);

    if (!deleted) {
      throw new NotFoundError(`Order "${orderId}" not found.`);
    }
  }
}
