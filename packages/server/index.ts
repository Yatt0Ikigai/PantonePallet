import express from "express";
import { appRouter } from "./trpc";
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import cors from "cors";


const app = express();
const port = 8080;

app.use(cors({
  origin: [true, "http://localhost:3000"],
  credentials: true,
  methods: ['POST', "GET"]
}));

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});


const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;


app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

