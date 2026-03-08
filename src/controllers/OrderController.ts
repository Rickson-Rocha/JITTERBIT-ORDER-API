import { Request, Response } from "express";
import { CreateOrderUseCase } from "../usecases/order/CreateOrderUseCase";
import { GetOrderByIdUseCase } from "../usecases/order/GetOrderByIdUseCase";
import { GetAllOrdersUseCase } from "../usecases/order/GetAllOrdersUseCase";
import { UpdateOrderUseCase } from "../usecases/order/UpdateOrderUseCase";
import { DeleteOrderUseCase } from "../usecases/order/DeleteOrderUseCase";

export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getOrderByIdUseCase: GetOrderByIdUseCase,
    private readonly getAllOrdersUseCase: GetAllOrdersUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly deleteOrderUseCase: DeleteOrderUseCase,
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    const order = await this.createOrderUseCase.execute(req.body);
    res.status(201).json(order);
  }

  async findById(req: Request, res: Response): Promise<void> {
    const orderId = req.params.orderId as string;
    const order = await this.getOrderByIdUseCase.execute(orderId);
    res.status(200).json(order);
  }

  async findAll(req: Request, res: Response): Promise<void> {
    const orders = await this.getAllOrdersUseCase.execute();
    res.status(200).json(orders);
  }

  async update(req: Request, res: Response): Promise<void> {
    const orderId = req.params.orderId as string;
    const order = await this.updateOrderUseCase.execute(orderId, req.body);
    res.status(200).json(order);
  }

  async remove(req: Request, res: Response): Promise<void> {
    const orderId = req.params.orderId as string;
    await this.deleteOrderUseCase.execute(orderId);
    res.status(204).send();
  }
}
