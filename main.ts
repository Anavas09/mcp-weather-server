import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "My Weather Server",
  version: "1.0.0",
});

server.tool(
  "get-weather", // ID de la herramienta
  "Obtiene el clima actual para una ciudad específica", // Descripción de la herramienta
  // Esquema de entrada
  {
    city: z.string().describe("Nombre de la ciudad para obtener el clima"),
  },
  async ({ city }) => { // Implementación de la herramienta
    return {
      content: [
        {
            type: "text",
            text: `El clima actual en ${city} es nevado`,
        }
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);