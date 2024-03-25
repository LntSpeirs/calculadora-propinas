import { useState } from "react";
import { MenuItem, OrderItem } from "../types";

export default function useOrder() {
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [tip, setTip] = useState(0);

  const addItem = (item: MenuItem) => {
    //console.log("Agregando...", item);

    const itemExists = order.find((orderItem) => orderItem.id === item.id);

    if (!itemExists) {
      setOrder([...order, { ...item, cantidad: 1 }]);
    } else {
      // Si el elemento ya existe en la orden lo agrego a su cantidad actual
      const updatedOrder = order.map((orderItem) =>
        orderItem.id === item.id
          ? { ...orderItem, cantidad: orderItem.cantidad + 1 }
          : orderItem
      );
      setOrder(updatedOrder);
    }
  };

  const removeItem = (id: MenuItem["id"]) => {
    setOrder(order.filter((item) => item.id !== id));
  };

  const placeOrder = () => {
    console.log("Guardando...");
    setOrder([]);
    setTip(0);
  };

  return {
    order,
    tip,
    setTip,
    addItem,
    removeItem,
    placeOrder,
  };
}
