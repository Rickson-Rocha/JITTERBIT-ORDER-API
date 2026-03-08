import { CreateOrderInputDTO, OrderDTO } from "../../dtos/order.dto";
import { ConflictError } from "../../erros/ConflictError";
import { IOrderRepository } from "../../interfaces/IOrderRepository";

export class CreateOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(data: CreateOrderInputDTO): Promise<OrderDTO> {
    const existing = await this.orderRepository.findById(data.numeroPedido);
    if (existing) {
      throw new ConflictError(`Order "${data.numeroPedido}" already exists.`);
    }
    return this.orderRepository.create(data);
  }
}
