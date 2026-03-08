import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Jitterbit Orders API",
      version: "1.0.0",
      description:
        "API para gerenciamento de pedidos - Jitterbit Technical Challenge",
    },
    servers: [
      {
        url: "http://127.0.0.1:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        OrderItemInput: {
          type: "object",
          required: ["idItem", "quantidadeItem", "valorItem"],
          properties: {
            idItem: { type: "string", example: "2434" },
            quantidadeItem: { type: "number", example: 1 },
            valorItem: { type: "number", example: 1000 },
          },
        },
        CreateOrderRequest: {
          type: "object",
          required: ["numeroPedido", "valorTotal", "dataCriacao", "items"],
          properties: {
            numeroPedido: { type: "string", example: "v10089015vdb-01" },
            valorTotal: { type: "number", example: 10000 },
            dataCriacao: {
              type: "string",
              format: "date-time",
              example: "2023-07-19T12:24:11.529Z",
            },
            items: {
              type: "array",
              items: { $ref: "#/components/schemas/OrderItemInput" },
            },
          },
        },
        OrderItemResponse: {
          type: "object",
          properties: {
            productId: { type: "number", example: 2434 },
            quantity: { type: "number", example: 1 },
            price: { type: "number", example: 1000 },
          },
        },
        OrderResponse: {
          type: "object",
          properties: {
            orderId: { type: "string", example: "v10089015vdb-01" },
            value: { type: "number", example: 10000 },
            creationDate: { type: "string", format: "date-time" },
            items: {
              type: "array",
              items: { $ref: "#/components/schemas/OrderItemResponse" },
            },
          },
        },
        AuthRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "teste@email.com",
            },
            password: { type: "string", example: "123456" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: { type: "string", example: "NotFoundError" },
            message: { type: "string", example: "Order not found." },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
