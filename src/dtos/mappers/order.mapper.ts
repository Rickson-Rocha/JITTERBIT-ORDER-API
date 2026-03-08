import {
  CreateOrderInputDTO,
  OrderDTO,
  CreateOrderItemInputDTO,
  OrderItemDTO,
} from "../order.dto";

export class OrderMapper {
  static fromDTO(input: CreateOrderInputDTO): OrderDTO {
    return {
      orderId: input.numeroPedido,
      value: input.valorTotal,
      creationDate: new Date(input.dataCriacao),
      items: input.items.map(OrderMapper.mapItem),
    };
  }

  static mapItem(item: CreateOrderItemInputDTO): OrderItemDTO {
    return {
      productId: parseInt(item.idItem, 10),
      quantity: item.quantidadeItem,
      price: item.valorItem,
    };
  }
}
