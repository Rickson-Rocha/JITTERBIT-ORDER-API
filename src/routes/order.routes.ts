import { Router } from "express";
import { OrderController } from "../controllers/OrderController";
import { CreateOrderUseCase } from "../usecases/order/CreateOrderUseCase";
import { GetOrderByIdUseCase } from "../usecases/order/GetOrderByIdUseCase";
import { GetAllOrdersUseCase } from "../usecases/order/GetAllOrdersUseCase";
import { UpdateOrderUseCase } from "../usecases/order/UpdateOrderUseCase";
import { DeleteOrderUseCase } from "../usecases/order/DeleteOrderUseCase";
import { PrismaOrderRepository } from "../repositories/PrismaOrderRepository";
import { authMiddleware } from "../middlewares/authMiddleware";
import { asyncHandler } from "../utils/asyncHandler";

const orderRepository = new PrismaOrderRepository();
const createOrderUseCase = new CreateOrderUseCase(orderRepository);
const getOrderByIdUseCase = new GetOrderByIdUseCase(orderRepository);
const getAllOrdersUseCase = new GetAllOrdersUseCase(orderRepository);
const updateOrderUseCase = new UpdateOrderUseCase(orderRepository);
const deleteOrderUseCase = new DeleteOrderUseCase(orderRepository);

const orderController = new OrderController(
  createOrderUseCase,
  getOrderByIdUseCase,
  getAllOrdersUseCase,
  updateOrderUseCase,
  deleteOrderUseCase,
);

const router = Router();

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Criar um novo pedido
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderRequest'
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       409:
 *         description: Pedido já existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Não autorizado
 */
router.post(
  "/",
  authMiddleware,
  asyncHandler((req, res) => orderController.create(req, res)),
);

/**
 * @swagger
 * /order/list:
 *   get:
 *     summary: Listar todos os pedidos
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderResponse'
 *       401:
 *         description: Não autorizado
 */
router.get(
  "/list",
  authMiddleware,
  asyncHandler((req, res) => orderController.findAll(req, res)),
);

/**
 * @swagger
 * /order/{orderId}:
 *   get:
 *     summary: Buscar pedido por ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         example: v10089015vdb-01
 *     responses:
 *       200:
 *         description: Dados do pedido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       404:
 *         description: Pedido não encontrado
 *       401:
 *         description: Não autorizado
 */
router.get(
  "/:orderId",
  authMiddleware,
  asyncHandler((req, res) => orderController.findById(req, res)),
);

/**
 * @swagger
 * /order/{orderId}:
 *   put:
 *     summary: Atualizar um pedido
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderRequest'
 *     responses:
 *       200:
 *         description: Pedido atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       404:
 *         description: Pedido não encontrado
 *       401:
 *         description: Não autorizado
 */
router.put(
  "/:orderId",
  authMiddleware,
  asyncHandler((req, res) => orderController.update(req, res)),
);

/**
 * @swagger
 * /order/{orderId}:
 *   delete:
 *     summary: Deletar um pedido
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Pedido deletado com sucesso
 *       404:
 *         description: Pedido não encontrado
 *       401:
 *         description: Não autorizado
 */
router.delete(
  "/:orderId",
  authMiddleware,
  asyncHandler((req, res) => orderController.remove(req, res)),
);

export default router;
