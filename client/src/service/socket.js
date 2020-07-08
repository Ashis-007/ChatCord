import io from "socket.io-client";
import { SOCKET_URL } from "../config/SocketConfig";

export default io(SOCKET_URL);
