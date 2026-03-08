import { prisma } from "../config/prisma";
import { IOrderRepository } from "../interfaces/IOrderRepository";
import {
  OrderDTO,
  CreateOrderInputDTO,
  UpdateOrderInputDTO,
} from "../dtos/order.dto";
import { OrderMapper } from "../dtos/mappers/order.mapper";

export class PrismaOrderRepository implements IOrderRepository {
  async create(data: CreateOrderInputDTO): Promise<OrderDTO> {
    
    const mapped = OrderMapper.fromDTO(data);
    const order = await prisma.order.create({
      data: {
        orderId: mapped.orderId,
        value: mapped.value,
        creationDate: mapped.creationDate,
        items: {
          create: mapped.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true },
    });

    return this.toDTO(order);
  }

  async findById(orderId: string): Promise<OrderDTO | null> {
    const order = await prisma.order.findUnique({
      where: { orderId },
      include: { items: true },
    });

    return order ? this.toDTO(order) : null;
  }

  async findAll(): Promise<OrderDTO[]> {
    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { creationDate: "desc" },
    });

    return orders.map((order) => this.toDTO(order));
  }

  async update(
    orderId: string,
    data: UpdateOrderInputDTO,
  ): Promise<OrderDTO | null> {
    const existing = await prisma.order.findUnique({ where: { orderId } });
    if (!existing) return null;

    const order = await prisma.order.update({
      where: { orderId },
      data: {
        value: data.valorTotal ?? existing.value,
        creationDate: data.dataCriacao
          ? new Date(data.dataCriacao)
          : existing.creationDate,
        ...(data.items && {
          items: {
            deleteMany: {},
            create: data.items.map(OrderMapper.mapItem),
          },
        }),
      },
      include: { items: true },
    });

    return this.toDTO(order);
  }

  async delete(orderId: string): Promise<boolean> {
    const existing = await prisma.order.findUnique({ where: { orderId } });
    if (!existing) return false;

    await prisma.order.delete({ where: { orderId } });
    return true;
  }

  private toDTO(order: any): OrderDTO {
    return {
      orderId: order.orderId,
      value: order.value,
      creationDate: order.creationDate,
      items: order.items.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    };
  }
}
