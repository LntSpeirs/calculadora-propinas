import { useState } from "react";
import { OrderItem } from "../types";
import MenuItem from "../components/MenuItem";

export default function useOrder() {
  const [order, setOrder] = useState<OrderItem[]>([]);

  const addItem = (item: MenuItem) => {
    //console.log("Agregando...", item);

    const itemExists = order.find(orderItem => orderItem.id === item.id);

    if (!itemExists) {
      setOrder([...order, { ...item, cantidad: 1 }]);
    } else {
      // Si el elemento ya existe en la orden lo agrego a su cantidad actual
      const updatedOrder = order.map(orderItem =>
        orderItem.id === item.id ? { ...orderItem, cantidad: orderItem.cantidad + 1 } : orderItem
      );
      setOrder(updatedOrder);
    }
  };

  return {
    order,
    addItem,
  };
}
