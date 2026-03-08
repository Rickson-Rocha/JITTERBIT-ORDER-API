export interface CreateOrderItemInputDTO {
  idItem: string;
  quantidadeItem: number;
  valorItem: number;
}

export interface CreateOrderInputDTO {
  numeroPedido: string;
  valorTotal: number;
  dataCriacao: string;
  items: CreateOrderItemInputDTO[];
}

export interface UpdateOrderInputDTO {
  valorTotal?: number;
  dataCriacao?: string;
  items?: CreateOrderItemInputDTO[];
}

export interface OrderItemDTO {
  productId: number;
  quantity: number;
  price: number;
}

export interface OrderDTO {
  orderId: string;
  value: number;
  creationDate: Date;
  items: OrderItemDTO[];
}
