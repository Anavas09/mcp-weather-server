import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getWeatherData } from "./api/fetchMeteoApi";

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
  async ({ city }) => {
    // Implementación de la herramienta

    const data = await getWeatherData(city);

    if (!data) {
      return {
        content: [
          {
            type: "text",
            text: `No se encontraron resultados para la ciudad ${city}`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2),
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
