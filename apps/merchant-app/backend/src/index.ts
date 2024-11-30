import express  from "express";
import{ userRouter} from "./router/user";

const app = express();

app.get('/api/v1/', userRouter);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});